import { Search } from "lucide-react";
import { COLORS } from "../lib/constants";
import RoomCard from "./RoomCard";

export default function RoomGrid({ rooms, onOpen, loading }) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-dashed p-12 text-center" style={{ borderColor: COLORS.line, color: COLORS.inkSoft }}>
        Đang tải danh sách phòng...
      </div>
    );
  }

  if (rooms.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed p-12 text-center" style={{ borderColor: COLORS.line, color: COLORS.inkSoft }}>
        <Search className="mx-auto mb-3 h-6 w-6" />
        <p className="text-[15px] font-medium" style={{ color: COLORS.ink }}>
          Không tìm thấy phòng phù hợp
        </p>
        <p className="mt-1 text-[13.5px]">Thử đổi khu vực, khoảng giá hoặc xóa bớt bộ lọc.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {rooms.map((r) => (
        <RoomCard key={r._id || r.id} room={r} onOpen={onOpen} />
      ))}
    </div>
  );
}
