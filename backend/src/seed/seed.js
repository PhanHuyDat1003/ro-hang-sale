import "dotenv/config";
import { connectDB } from "../db.js";
import Room from "../models/Room.js";
import { seedRooms } from "./seedData.js";
import mongoose from "mongoose";

async function run() {
  await connectDB();
  console.log("[seed] Đang xóa dữ liệu phòng cũ...");
  await Room.deleteMany({});
  console.log("[seed] Đang thêm", seedRooms.length, "phòng mẫu...");
  await Room.insertMany(seedRooms);
  console.log("[seed] Hoàn tất!");
  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error("[seed] Lỗi:", err);
  process.exit(1);
});
