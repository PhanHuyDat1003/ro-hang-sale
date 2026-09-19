import { Building2 } from "lucide-react";
import { COLORS } from "../lib/constants";

export default function RoomThumb({ room, className }) {
  if (room.images && room.images.length > 0) {
    return <img src={room.images[0]} alt={room.name} className={`object-cover ${className}`} />;
  }
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})` }}
    >
      <Building2 className="h-8 w-8 text-white/70" strokeWidth={1.5} />
    </div>
  );
}
