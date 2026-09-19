import { Pencil, Trash2 } from "lucide-react";
import { COLORS, STATUS_LIST } from "../lib/constants";
import { fmtVND } from "../lib/utils";
import RoomThumb from "./RoomThumb";

export default function ManageList({ rooms, onEdit, onDelete, onStatusChange, loading }) {
  return (
    <div className="overflow-hidden rounded-2xl border" style={{ borderColor: COLORS.line }}>
      <table className="w-full text-left text-[13.5px]">
        <thead>
          <tr className="border-b text-[12.5px]" style={{ borderColor: COLORS.line, color: COLORS.inkSoft, background: "#F5F4F0" }}>
            <th className="px-4 py-3 font-medium">Phòng</th>
            <th className="px-4 py-3 font-medium">Khu vực</th>
            <th className="px-4 py-3 font-medium">Giá</th>
            <th className="px-4 py-3 font-medium">Trạng thái</th>
            <th className="px-4 py-3 font-medium">Chủ nhà</th>
            <th className="px-4 py-3 font-medium text-right">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={6} className="px-4 py-8 text-center" style={{ color: COLORS.inkSoft }}>
                Đang tải...
              </td>
            </tr>
          )}
          {!loading &&
            rooms.map((r) => (
              <tr key={r._id} className="border-b last:border-0" style={{ borderColor: COLORS.line }}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <RoomThumb room={r} className="h-9 w-9 shrink-0 rounded-md" />
                    <span className="font-medium" style={{ color: COLORS.ink }}>{r.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3" style={{ color: COLORS.inkSoft }}>{r.area}</td>
                <td className="px-4 py-3 font-medium" style={{ color: COLORS.accent }}>{fmtVND(r.price)}</td>
                <td className="px-4 py-3">
                  <select
                    value={r.status}
                    onChange={(e) => onStatusChange(r._id, e.target.value)}
                    className="rounded-lg border px-2 py-1 text-[12.5px]"
                    style={{ borderColor: COLORS.line }}
                  >
                    {STATUS_LIST.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3" style={{ color: COLORS.inkSoft }}>
                  {r.ownerName}
                  <div className="text-[12px]">{r.ownerPhone}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(r._id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border transition hover:bg-black/5"
                      style={{ borderColor: COLORS.line, color: COLORS.ink }}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => onDelete(r._id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border transition hover:bg-black/5"
                      style={{ borderColor: COLORS.line, color: COLORS.stopped }}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          {!loading && rooms.length === 0 && (
            <tr>
              <td colSpan={6} className="px-4 py-8 text-center" style={{ color: COLORS.inkSoft }}>
                Chưa có phòng nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
