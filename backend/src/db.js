import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/rohangsale";

  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(uri);
    console.log("[db] Đã kết nối MongoDB:", uri);
  } catch (err) {
    console.error("[db] Kết nối MongoDB thất bại:", err.message);
    console.error(
      "[db] Kiểm tra lại MONGODB_URI trong file .env, hoặc chắc chắn MongoDB đang chạy ở máy local."
    );
    process.exit(1);
  }
}
