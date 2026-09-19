import { Search } from "lucide-react";
import { COLORS, DISTRICTS, STATUS_LIST } from "../lib/constants";

export default function FilterBar({ filters, setFilters, onSearch, resultCount, showCount, loading }) {
  const inputCls =
    "w-full rounded-lg border bg-white px-3 py-2.5 text-[14px] outline-none transition focus:ring-2";

  return (
    <div className="rounded-2xl border p-5 shadow-sm" style={{ borderColor: COLORS.line, background: COLORS.surface }}>
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2"
          style={{ color: COLORS.inkSoft }}
        />
        <input
          value={filters.text}
          onChange={(e) => setFilters((f) => ({ ...f, text: e.target.value }))}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
          placeholder="Tìm theo địa chỉ, khu vực hoặc giá phòng…"
          className={inputCls + " pl-10"}
          style={{ borderColor: COLORS.line }}
        />
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <select
          value={filters.district}
          onChange={(e) => setFilters((f) => ({ ...f, district: e.target.value }))}
          className={inputCls}
          style={{ borderColor: COLORS.line, color: COLORS.ink }}
        >
          <option value="">Quận / khu vực</option>
          {DISTRICTS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={filters.priceFrom}
          onChange={(e) => setFilters((f) => ({ ...f, priceFrom: e.target.value }))}
          placeholder="Giá từ (đ)"
          className={inputCls}
          style={{ borderColor: COLORS.line }}
        />
        <input
          type="number"
          value={filters.priceTo}
          onChange={(e) => setFilters((f) => ({ ...f, priceTo: e.target.value }))}
          placeholder="Giá đến (đ)"
          className={inputCls}
          style={{ borderColor: COLORS.line }}
        />
        <select
          value={filters.status}
          onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
          className={inputCls}
          style={{ borderColor: COLORS.line, color: COLORS.ink }}
        >
          <option value="">Trạng thái phòng</option>
          {STATUS_LIST.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={onSearch}
          className="rounded-lg px-5 py-2.5 text-[14px] font-semibold text-white shadow-sm transition hover:brightness-110 disabled:opacity-60"
          style={{ background: COLORS.primary }}
          disabled={loading}
        >
          {loading ? "Đang tìm..." : "Tìm kiếm"}
        </button>
        {showCount && (
          <span className="text-[13px]" style={{ color: COLORS.inkSoft }}>
            {resultCount} phòng phù hợp
          </span>
        )}
      </div>
    </div>
  );
}
