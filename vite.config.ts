import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function templateFolderPlugin(): Plugin {
  return {
    name: "template-folder-middleware",
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (req.url && req.url.startsWith("/templates")) {
          const cleanUrl = req.url.split("?")[0];
          const query = req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : "";
          if (cleanUrl.endsWith("/")) {
            req.url = cleanUrl + "index.html" + query;
          } else if (!path.extname(cleanUrl)) {
            req.url = cleanUrl + "/index.html" + query;
          }
        }
        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    templateFolderPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

