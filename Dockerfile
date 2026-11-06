# syntax=docker/dockerfile:1

# MeSquareFE — Expo SDK 57 app (React Native + Expo Router + react-native-web)
#
# Targets:
#   prod (default) — multi-stage build: static web export served by a tiny
#                    Go static server on a distroless runtime
#   dev            — Expo dev server (used by docker compose --profile dev
#                    and the VS Code dev container)
#
# Base images are all Chainguard (Wolfi-based) and scan with ZERO known
# vulnerabilities (docker scout, 2026-11-05). For comparison, every nginx
# and caddy image available today ships unpatched critical CVEs:
#   nginx:1.27-alpine  16C / 66H   nginx:alpine 1C / 2H (zlib fix unreleased)
#   caddy:2-alpine      1C / 4H    (zlib + go-jose/x/net compiled in)
#   node:22-trixie-slim 0C / 12H   (npm brace-expansion + unfixed Debian zlib)
# The digests below keep builds reproducible; re-run `docker scout cves`
# when bumping them.
#
# Expo SDK 57 requires Node >= 22.13; Chainguard's node image tracks the
# current release (Node 26).
#
# Build the production image:
#   docker build \
#     --build-arg EXPO_PUBLIC_AUTH0_DOMAIN=... \
#     --build-arg EXPO_PUBLIC_AUTH0_CLIENT_ID=... \
#     --build-arg EXPO_PUBLIC_AUTH0_AUDIENCE=... \
#     --build-arg EXPO_PUBLIC_API_BASE_URL=... \
#     -t mesquarefe-web .
# (Or simply: docker compose up --build, which reads overrides from a .env file.)

# Chainguard node:latest-dev = current Node + npm + shell (needed for
# npm lifecycle scripts). Runs as root here so stages can write to /app.
FROM cgr.dev/chainguard/node@sha256:bfbc9be493e9df627998b62048cbf2e349f6b7c76af5ad3f72d064f1dbcb986c AS base
USER root
ENV EXPO_NO_TELEMETRY=1
WORKDIR /app

# ---------------------------------------------------------------------------
# deps — install node_modules from the lockfile only (cacheable layer)
# ---------------------------------------------------------------------------
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# ---------------------------------------------------------------------------
# build — static web export (npx expo export --platform web -> dist/)
# ---------------------------------------------------------------------------
FROM deps AS build

# EXPO_PUBLIC_* variables are inlined into the JavaScript bundle at build
# time by Metro, so they MUST be passed as build args — setting them at
# container runtime has no effect. app.config.js also throws if
# EXPO_PUBLIC_AUTH0_DOMAIN is missing, so the build fails fast.
ARG EXPO_PUBLIC_AUTH0_DOMAIN
ARG EXPO_PUBLIC_AUTH0_CLIENT_ID
ARG EXPO_PUBLIC_AUTH0_AUDIENCE
ARG EXPO_PUBLIC_API_BASE_URL
ENV EXPO_PUBLIC_AUTH0_DOMAIN=${EXPO_PUBLIC_AUTH0_DOMAIN} \
    EXPO_PUBLIC_AUTH0_CLIENT_ID=${EXPO_PUBLIC_AUTH0_CLIENT_ID} \
    EXPO_PUBLIC_AUTH0_AUDIENCE=${EXPO_PUBLIC_AUTH0_AUDIENCE} \
    EXPO_PUBLIC_API_BASE_URL=${EXPO_PUBLIC_API_BASE_URL}

COPY . .
RUN npx expo export --platform web

# ---------------------------------------------------------------------------
# server — compile the tiny Go static file server (see docker/staticsrv/)
# ---------------------------------------------------------------------------
FROM cgr.dev/chainguard/go@sha256:8a2cd2de619e9c3beeadc26fb799a7ddb5738c57e1783d8b76cc3471910243e7 AS server
WORKDIR /src
COPY docker/staticsrv/ ./
RUN CGO_ENABLED=0 go build -trimpath -ldflags="-s -w" -o /staticsrv .

# ---------------------------------------------------------------------------
# dev — Expo dev server on port 8081
# ---------------------------------------------------------------------------
FROM deps AS dev
# The Chainguard node image sets ENTRYPOINT ["node"]; reset it so the CMD
# below (npx) runs directly.
# Source code is bind-mounted at /app by docker compose / the dev container;
# the named volume over /app/node_modules preserves the installed deps.
ENTRYPOINT []
EXPOSE 8081
CMD ["npx", "expo", "start", "--web"]

# ---------------------------------------------------------------------------
# prod — distroless runtime with only the server binary and the web export
# ---------------------------------------------------------------------------
FROM cgr.dev/chainguard/static@sha256:fc42af33e643f20d08baf03cddcc1c02ba57052dfb02edb0d79f3fc47bcea8d9 AS prod
COPY --from=server /staticsrv /staticsrv
COPY --from=build /app/dist /srv
# cgr.dev/chainguard/static defaults to an unprivileged user (65532).
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD ["/staticsrv", "-healthcheck"]
ENTRYPOINT ["/staticsrv"]

