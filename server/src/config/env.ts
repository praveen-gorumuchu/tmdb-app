import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export interface EnvConfig {
  PORT: number;
  TMDB_BASE_URL: string;
  TMDB_API_KEY: string;
  TMDB_ACCESS_TOKEN?: string | undefined;
}

// Validate and export typed environment variables
export const env: EnvConfig = {
  PORT: parseInt(process.env.PORT || "5000", 10),
  TMDB_BASE_URL: process.env.TMDB_BASE_URL || "",
  TMDB_API_KEY: process.env.TMDB_API_KEY || "",
  TMDB_ACCESS_TOKEN: process.env.TMDB_ACCESS_TOKEN,
};

// Simple runtime validation
for (const [key, value] of Object.entries(env)) {
  if (!value && key !== "ACCESS_TOKEN") {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}
