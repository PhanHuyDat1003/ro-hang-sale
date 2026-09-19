import { Building2 } from "lucide-react";
import { COLORS } from "../lib/constants";

const TABS = [
  { id: "home", label: "Trang chủ" },
  { id: "list", label: "Danh sách phòng" },
  { id: "add", label: "Thêm phòng" },
  { id: "manage", label: "Quản lý phòng" },
];

export default function Header({ view, setView }) {
  return (
    <header
      className="sticky top-0 z-20 border-b backdrop-blur"
      style={{ borderColor: COLORS.line, background: "rgba(250,249,246,0.92)" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <button onClick={() => setView({ name: "home" })} className="flex items-center gap-2">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg text-white"
            style={{ background: COLORS.primary }}
          >
            <Building2 className="h-4.5 w-4.5" strokeWidth={2} />
          </span>
          <span className="text-[17px] font-semibold tracking-tight" style={{ color: COLORS.ink }}>
            Rổ hàng sale
          </span>
        </button>
        <nav className="flex items-center gap-1">
          {TABS.map((t) => {
            const active = view.name === t.id || (view.name === "detail" && t.id === "list");
            return (
              <button
                key={t.id}
                onClick={() => setView({ name: t.id })}
                className="relative px-3 py-2 text-[14px] font-medium transition-colors"
                style={{ color: active ? COLORS.ink : COLORS.inkSoft }}
              >
                {t.label}
                {active && (
                  <span
                    className="absolute inset-x-2 -bottom-[13px] h-[2px] rounded-full"
                    style={{ background: COLORS.primary }}
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
