import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://ivan-esau.github.io",
  output: "static",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap(), react()],
});
