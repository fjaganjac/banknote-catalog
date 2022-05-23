import { defineConfig, createLogger } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import svgr from "vite-plugin-svgr";

const PROXY_URL = "http://localhost:8000";
// https://vitejs.dev/config/
export default defineConfig({
  // This changes the out put dir from dist to build
  // comment this out if that isn't relevant for your project
  build: {
    outDir: "build"
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  plugins: [reactRefresh(), svgr()],
  resolve: {
    mainFields: ["browser", "module", "jsnext:main", "jsnext"]
  },
  server: {
    proxy: {
      "/api": PROXY_URL
    }
  }
});
