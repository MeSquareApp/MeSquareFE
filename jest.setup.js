// Jest setup: src/services/api.ts reads these variables at module load and
// throws if they are missing. Tests get safe defaults; CI needs no secrets.
process.env.EXPO_PUBLIC_API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ?? "http://localhost:8000";
process.env.EXPO_PUBLIC_AUTH0_AUDIENCE =
  process.env.EXPO_PUBLIC_AUTH0_AUDIENCE ?? "https://mesquared-api-endpoint";
