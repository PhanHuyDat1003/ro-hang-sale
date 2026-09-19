import { CheckCircle2, XCircle } from "lucide-react";
import { COLORS } from "../lib/constants";

export default function Amenity({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2 text-[13.5px]" style={{ color: COLORS.ink }}>
      <Icon className="h-4 w-4" style={{ color: COLORS.inkSoft }} />
      <span style={{ color: COLORS.inkSoft }}>{label}:</span>
      {typeof value === "boolean" ? (
        value ? (
          <CheckCircle2 className="h-4 w-4" style={{ color: COLORS.available }} />
        ) : (
          <XCircle className="h-4 w-4" style={{ color: COLORS.stopped }} />
        )
      ) : (
        <span className="font-medium">{value}</span>
      )}
    </div>
  );
}
