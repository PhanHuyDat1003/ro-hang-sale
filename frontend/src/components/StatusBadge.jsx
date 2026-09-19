import { STATUS_META } from "../lib/constants";

export default function StatusBadge({ status }) {
  const meta = STATUS_META[status] || STATUS_META["Còn phòng"];
  return (
    <span
      style={{ color: meta.fg, background: meta.bg }}
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[13px] font-medium"
    >
      <span style={{ background: meta.fg }} className="h-1.5 w-1.5 rounded-full" />
      {status}
    </span>
  );
}
