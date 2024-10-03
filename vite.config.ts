import * as path from "path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["@mui_x-date-pickers.js", "@mui_x-date-pickers_AdapterDateFns.js"],
  },
  resolve: {
    alias: {
      // "@myCash": fileURLToPath(import.meta.url + "/../src/"),
      "@myCash": path.resolve(__dirname, "./src/"),
      "@components": path.resolve(__dirname, "./src/components/index"),
      "@hooks": path.resolve(__dirname, "./src/hooks/"),
      "@hoc": path.resolve(__dirname, "./src/hoc/"),
      "@lib": path.resolve(__dirname, "./src/lib/"),
      "@apis": path.resolve(__dirname, "./src/apis/"),
    },
  },
});
