/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENV: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_FEATURE_DEBUG: string;
  readonly VITE_TMDB_BASE_URL: string;
  readonly VITE_TMDB_BASE_IMAGE_URL: string;
  readonly VITE_PORT?: string;
  readonly VITE_TMDB_TOKEN?: string;
  readonly VITE_TMDB_API_KEY?: string;
  readonly VITE_BASENAME?: string;
  readonly VITE_ACCESS_TOKEN?: string;

}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
