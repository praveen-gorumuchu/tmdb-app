// src/config/env.ts
export const env = {
  mode: import.meta.env.MODE,
  env: import.meta.env.VITE_ENV,
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  featureDebug: import.meta.env.VITE_FEATURE_DEBUG === "true",
  tmdbApiUrl: import.meta.env.VITE_TMDB_BASE_URL,
  tmdbImgUrl: import.meta.env.VITE_TMDB_BASE_IMAGE_URL,
  tmdbApikey: import.meta.env.VITE_TMDB_API_KEY,
  tmdbAccessToken: import.meta.env.VITE_TMDB_TOKEN,
  baseName: import.meta.env.VITE_BASENAME,
  accessToken: import.meta.env.VITE_ACCESS_TOKEN
};
