import { defineConfig, loadEnv } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const isProd = mode === "production";

  return {
    base: env.VITE_BASENAME,
    plugins: [react(), tailwindcss()],
    resolve: { 
      alias: { "@": path.resolve(__dirname, "./src") },
  },

    server: {
      port: Number(env.VITE_PORT) || 5173,
      open: true,
      proxy: {},
    },

    define: {
      __APP_ENV__: JSON.stringify(env.VITE_ENV),
    },

    build: {
      sourcemap: !isProd, 
      minify: isProd ? "esbuild" : false,
      emptyOutDir: true, 
    },

    esbuild: {
      sourcemap: !isProd, 
    },

    optimizeDeps: {
      include: [], 
    },
  };
});
