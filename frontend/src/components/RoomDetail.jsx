import { ArrowLeft, MapPin, Phone, Ruler, Users, Clock, Zap, Droplet, Wallet, PawPrint, CheckCircle2, Sofa } from "lucide-react";
import { COLORS } from "../lib/constants";
import { fmtVND } from "../lib/utils";
import StatusBadge from "./StatusBadge";
import RoomThumb from "./RoomThumb";
import Amenity from "./Amenity";

export default function RoomDetail({ room, loading, onBack }) {
  if (loading) {
    return <div style={{ color: COLORS.inkSoft }}>Đang tải thông tin phòng...</div>;
  }
  if (!room) {
    return (
      <div>
        <button onClick={onBack} className="mb-4 flex items-center gap-1.5 text-[14px] font-medium" style={{ color: COLORS.inkSoft }}>
          <ArrowLeft className="h-4 w-4" /> Quay lại danh sách
        </button>
        <p style={{ color: COLORS.inkSoft }}>Không tìm thấy phòng này (có thể đã bị xóa).</p>
      </div>
    );
  }

  const hasImages = room.images && room.images.length > 0;

  return (
    <div>
      <button onClick={onBack} className="mb-4 flex items-center gap-1.5 text-[14px] font-medium" style={{ color: COLORS.inkSoft }}>
        <ArrowLeft className="h-4 w-4" /> Quay lại danh sách
      </button>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="overflow-hidden rounded-2xl">
            <RoomThumb room={room} className="h-72 w-full" />
          </div>
          {hasImages && room.images.length > 1 && (
            <div className="mt-2 grid grid-cols-4 gap-2">
              {room.images.slice(1, 5).map((src, i) => (
                <img key={i} src={src} alt="" className="h-16 w-full rounded-lg object-cover" />
              ))}
            </div>
          )}

          <div className="mt-6">
            <StatusBadge status={room.status} />
            <h1 className="mt-3 text-[22px] font-semibold leading-tight" style={{ color: COLORS.ink }}>
              {room.name}
            </h1>
            <div className="mt-1 flex items-center gap-1.5 text-[14px]" style={{ color: COLORS.inkSoft }}>
              <MapPin className="h-4 w-4" /> {room.address}
            </div>
            <div className="mt-4 text-[26px] font-semibold" style={{ color: COLORS.accent }}>
              {fmtVND(room.price)}
              <span className="text-[14px] font-normal" style={{ color: COLORS.inkSoft }}>
                {" "}
                /tháng
              </span>
            </div>
            <p className="mt-4 text-[14.5px] leading-relaxed" style={{ color: COLORS.ink }}>
              {room.description}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 rounded-2xl border p-5 sm:grid-cols-3" style={{ borderColor: COLORS.line }}>
            <Amenity icon={Ruler} label="Diện tích" value={room.acreage + "m²"} />
            <Amenity icon={Users} label="Tối đa" value={room.maxPeople + " người"} />
            <Amenity icon={Clock} label="Giờ giấc" value={room.hours} />
            <Amenity icon={Zap} label="Tiền điện" value={room.electricity} />
            <Amenity icon={Droplet} label="Tiền nước" value={room.water} />
            <Amenity icon={Wallet} label="Phí dịch vụ" value={room.serviceFee} />
            <Amenity icon={PawPrint} label="Thú cưng" value={room.pet} />
            <Amenity icon={CheckCircle2} label="Máy giặt" value={room.washer} />
            <Amenity icon={CheckCircle2} label="Thang máy" value={room.elevator} />
          </div>

          <div className="mt-6 rounded-2xl border p-5" style={{ borderColor: COLORS.line }}>
            <div className="mb-2 flex items-center gap-2 text-[14px] font-medium" style={{ color: COLORS.ink }}>
              <Sofa className="h-4 w-4" style={{ color: COLORS.inkSoft }} /> Nội thất
            </div>
            <p className="text-[14px]" style={{ color: COLORS.inkSoft }}>
              {room.furniture}
            </p>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="sticky top-20 rounded-2xl border p-5" style={{ borderColor: COLORS.line, background: COLORS.surface }}>
            <div className="text-[13px] font-medium" style={{ color: COLORS.inkSoft }}>
              Thông tin chủ nhà / người quản lý
            </div>
            <div className="mt-3 flex items-center gap-3">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-full text-[15px] font-semibold text-white"
                style={{ background: COLORS.primary }}
              >
                {room.ownerName?.charAt(0) || "?"}
              </div>
              <div>
                <div className="text-[15px] font-semibold" style={{ color: COLORS.ink }}>
                  {room.ownerName}
                </div>
                <div className="text-[13.5px]" style={{ color: COLORS.inkSoft }}>
                  {room.ownerPhone}
                </div>
              </div>
            </div>
            <a
              href={`tel:${room.ownerPhone}`}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-[15px] font-semibold text-white shadow-sm transition hover:brightness-110"
              style={{ background: COLORS.accent }}
            >
              <Phone className="h-4.5 w-4.5" /> Gọi ngay
            </a>
            <p className="mt-3 text-center text-[12.5px]" style={{ color: COLORS.inkSoft }}>
              Nhấn để gọi trực tiếp trên điện thoại
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
