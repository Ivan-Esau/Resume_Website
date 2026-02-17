import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://ivan-esau.github.io",
  base: "/Resume_Website",
  output: "static",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap(), react()],
});
