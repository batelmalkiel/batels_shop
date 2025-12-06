import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
//import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@mui/styled-engine': '@mui/styled-engine-sc'
    }
  }
});
