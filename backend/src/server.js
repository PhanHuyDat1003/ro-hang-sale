import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./db.js";
import roomsRouter from "./routes/rooms.routes.js";

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
// Giới hạn nâng lên vì ảnh phòng có thể gửi dạng base64
app.use(express.json({ limit: "15mb" }));
app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "ro-hang-sale-backend" });
});

app.use("/api/rooms", roomsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Không tìm thấy endpoint" });
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`[server] Rổ hàng sale API đang chạy tại http://localhost:${PORT}`);
  });
});
