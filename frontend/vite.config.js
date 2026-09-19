import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Proxy /api sang backend Express khi chạy dev, để tránh lỗi CORS
// và giữ code frontend gọi API bằng đường dẫn tương đối "/api/...".
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
