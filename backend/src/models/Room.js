import mongoose from "mongoose";

export const STATUS_LIST = [
  "Còn phòng",
  "Đang giữ chỗ",
  "Đã thuê",
  "Ngưng khai thác",
];

const roomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    address: { type: String, required: true, trim: true },
    area: { type: String, required: true, trim: true }, // Quận / khu vực
    acreage: { type: Number, default: 0 }, // m2
    maxPeople: { type: Number, default: 1 },
    furniture: { type: String, default: "" },
    description: { type: String, default: "" },
    status: {
      type: String,
      enum: STATUS_LIST,
      default: "Còn phòng",
    },
    ownerName: { type: String, default: "" },
    ownerPhone: { type: String, default: "" },
    electricity: { type: String, default: "" },
    water: { type: String, default: "" },
    serviceFee: { type: String, default: "" },
    hours: { type: String, default: "" },
    pet: { type: Boolean, default: false },
    washer: { type: Boolean, default: false },
    elevator: { type: Boolean, default: false },
    // Ảnh lưu dạng data URL (base64) hoặc URL thường.
    // Lưu ý: với sản phẩm thật nên dùng dịch vụ lưu trữ file (S3, Cloudinary...)
    // thay vì nhúng base64 trực tiếp vào MongoDB.
    images: { type: [String], default: [] },
  },
  { timestamps: true }
);

roomSchema.index({ name: "text", address: "text", area: "text" });

export default mongoose.model("Room", roomSchema);
