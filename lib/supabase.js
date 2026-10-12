import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wamrrpwykkcuowdyewxd.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhbXJycHd5a2tjdW93ZHlld3hkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEyODg1MzEsImV4cCI6MjEwNjg2NDUzMX0.6Rx_tyggiC5guLl-rVCPrXJjhfiRcWF4yGoVc4tDG-Q";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
