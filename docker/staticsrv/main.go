// staticsrv is a tiny static file server for the MeSquareFE web export
// (Expo Router). It replicates the try_files {path} {path}.html {path}/
// /index.html behaviour needed for client-side routing, sets cache headers,
// and transparently gzip-compresses responses.
//
// It exists so the production Docker image can run on a distroless,
// zero-known-CVE base image (cgr.dev/chainguard/static) instead of
// nginx/caddy, whose current Alpine/Debian images all ship unpatched
// critical vulnerabilities.
package main

import (
	"compress/gzip"
	"flag"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
)

func main() {
	root := flag.String("root", "/srv", "directory containing the static web export")
	addr := flag.String("addr", ":8080", "listen address")
	health := flag.Bool("healthcheck", false, "probe the server and exit 0/1 (for Docker HEALTHCHECK)")
	flag.Parse()

	if *health {
		target := "http://127.0.0.1:8080/"
		if !strings.HasPrefix(*addr, ":") {
			target = "http://" + *addr + "/"
		}
		resp, err := http.Get(target)
		if err != nil {
			os.Exit(1)
		}
		defer resp.Body.Close()
		if resp.StatusCode >= 200 && resp.StatusCode < 400 {
			os.Exit(0)
		}
		os.Exit(1)
	}

	mux := http.NewServeMux()
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		serveSPA(*root, w, r)
	})

	log.Printf("staticsrv: serving %s on %s", *root, *addr)
	log.Fatal(http.ListenAndServe(*addr, withGzip(mux)))
}

// serveSPA implements try_files {path} {path}.html {path}/ /index.html:
// exported routes like /user/dashboard resolve to /user/dashboard.html,
// everything else falls back to index.html so Expo Router can handle it.
func serveSPA(root string, w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet && r.Method != http.MethodHead {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	clean := filepath.Clean("/" + r.URL.Path) // defeats path traversal
	for _, candidate := range []string{clean, strings.TrimSuffix(clean, "/") + ".html"} {
		p := filepath.Join(root, candidate)
		if fi, err := os.Stat(p); err == nil && fi.Mode().IsRegular() {
			setCacheHeaders(w, clean)
			http.ServeFile(w, r, p) // handles Content-Type, ETag, 304s
			return
		}
	}

	setCacheHeaders(w, clean)
	http.ServeFile(w, r, filepath.Join(root, "index.html"))
}

// setCacheHeaders: HTML is never cached so deployments are picked up
// immediately; content-hashed build output is immutable.
func setCacheHeaders(w http.ResponseWriter, path string) {
	switch {
	case strings.HasSuffix(path, ".html") || path == "/":
		w.Header().Set("Cache-Control", "no-cache")
	case strings.HasPrefix(path, "/_expo/static/") || strings.HasPrefix(path, "/assets/"):
		w.Header().Set("Cache-Control", "public, max-age=31536000, immutable")
	}
}

// withGzip gzip-compresses responses when the client accepts it. Range
// requests are passed through untouched so byte-range downloads keep
// working. (net/http discards bodies for 304 responses automatically.)
func withGzip(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if !strings.Contains(r.Header.Get("Accept-Encoding"), "gzip") ||
			strings.Contains(r.Header.Get("Range"), "=") {
			next.ServeHTTP(w, r)
			return
		}
		w.Header().Add("Vary", "Accept-Encoding")
		w.Header().Set("Content-Encoding", "gzip")
		w.Header().Del("Content-Length")
		gz := gzip.NewWriter(w)
		defer gz.Close()
		next.ServeHTTP(&gzipWriter{ResponseWriter: w, gz: gz}, r)
	})
}

type gzipWriter struct {
	http.ResponseWriter
	gz *gzip.Writer
}

func (g *gzipWriter) Write(b []byte) (int, error) { return g.gz.Write(b) }
