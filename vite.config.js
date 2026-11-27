import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const repositoryRoot = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: resolve(repositoryRoot, "app"),
  base: "/",
  plugins: [react()],
  build: {
    assetsDir: "app-assets",
    outDir: resolve(repositoryRoot, "dist"),
    emptyOutDir: true
  }
});
