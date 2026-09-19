import { MapPin, Ruler, Users } from "lucide-react";
import { COLORS } from "../lib/constants";
import { fmtVND } from "../lib/utils";
import StatusBadge from "./StatusBadge";
import RoomThumb from "./RoomThumb";

export default function RoomCard({ room, onOpen }) {
  return (
    <button
      onClick={() => onOpen(room._id || room.id)}
      className="group flex flex-col overflow-hidden rounded-2xl border text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      style={{ borderColor: COLORS.line, background: COLORS.surface }}
    >
      <div className="relative h-40 w-full overflow-hidden">
        <RoomThumb room={room} className="h-full w-full" />
        <div className="absolute left-3 top-3">
          <StatusBadge status={room.status} />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="text-[19px] font-semibold leading-none" style={{ color: COLORS.accent }}>
          {fmtVND(room.price)}
          <span className="text-[13px] font-normal" style={{ color: COLORS.inkSoft }}>
            {" "}
            /tháng
          </span>
        </div>
        <div className="line-clamp-1 text-[14.5px] font-medium" style={{ color: COLORS.ink }}>
          {room.name}
        </div>
        <div className="flex items-start gap-1.5 text-[13px]" style={{ color: COLORS.inkSoft }}>
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span className="line-clamp-1">{room.address}</span>
        </div>
        <div
          className="mt-1 flex items-center gap-3 border-t pt-2 text-[12.5px]"
          style={{ borderColor: COLORS.line, color: COLORS.inkSoft }}
        >
          <span className="flex items-center gap-1">
            <Ruler className="h-3.5 w-3.5" /> {room.acreage}m²
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" /> {room.maxPeople} người
          </span>
        </div>
      </div>
    </button>
  );
}
