import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  plugins: [react()],
  build: {
    assetsDir: "app-assets",
    rolldownOptions: {
      input: {
        site: fileURLToPath(new URL("./index.html", import.meta.url)),
        cmsPreview: fileURLToPath(new URL("./cms-preview/index.html", import.meta.url)),
      },
    },
  },
});
