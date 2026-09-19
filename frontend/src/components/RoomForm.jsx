import { useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { COLORS, DISTRICTS, STATUS_LIST, EMPTY_ROOM } from "../lib/constants";

export default function RoomForm({ initial, onCancel, onSubmit, mode, saving }) {
  const [form, setForm] = useState(initial || EMPTY_ROOM);
  const fileRef = useRef(null);

  const set = (key) => (e) =>
    setForm((f) => ({
      ...f,
      [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  // Đọc ảnh thành base64 (data URL) thay vì blob URL, để hiển thị ổn định
  // ở mọi môi trường và có thể lưu thẳng vào MongoDB cho bản MVP.
  const handleFiles = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setForm((f) => ({ ...f, images: [...f.images, ev.target.result] }));
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const submit = () => {
    if (!form.name || !form.price || !form.address) return;
    onSubmit({
      ...form,
      price: Number(form.price),
      acreage: Number(form.acreage) || 0,
      maxPeople: Number(form.maxPeople) || 1,
    });
  };

  const inputCls = "w-full rounded-lg border bg-white px-3 py-2.5 text-[14px] outline-none transition focus:ring-2";
  const label = "mb-1.5 block text-[13px] font-medium";

  return (
    <div className="mx-auto max-w-3xl rounded-2xl border p-6" style={{ borderColor: COLORS.line, background: COLORS.surface }}>
      <h2 className="text-[19px] font-semibold" style={{ color: COLORS.ink }}>
        {mode === "edit" ? "Chỉnh sửa phòng" : "Thêm phòng mới"}
      </h2>
      <p className="mt-1 text-[13.5px]" style={{ color: COLORS.inkSoft }}>
        Điền đầy đủ thông tin để nhân viên sale dễ tra cứu và tư vấn.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={label} style={{ color: COLORS.ink }}>Tên phòng</label>
          <input value={form.name} onChange={set("name")} className={inputCls} style={{ borderColor: COLORS.line }} placeholder="VD: Phòng studio ban công Thảo Điền" />
        </div>
        <div>
          <label className={label} style={{ color: COLORS.ink }}>Giá thuê (đ/tháng)</label>
          <input type="number" value={form.price} onChange={set("price")} className={inputCls} style={{ borderColor: COLORS.line }} placeholder="5500000" />
        </div>
        <div>
          <label className={label} style={{ color: COLORS.ink }}>Quận / khu vực</label>
          <select value={form.area} onChange={set("area")} className={inputCls} style={{ borderColor: COLORS.line }}>
            {DISTRICTS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={label} style={{ color: COLORS.ink }}>Địa chỉ đầy đủ</label>
          <input value={form.address} onChange={set("address")} className={inputCls} style={{ borderColor: COLORS.line }} placeholder="123 Nguyễn Thị Định, Quận 2, TP.HCM" />
        </div>
        <div>
          <label className={label} style={{ color: COLORS.ink }}>Diện tích (m²)</label>
          <input type="number" value={form.acreage} onChange={set("acreage")} className={inputCls} style={{ borderColor: COLORS.line }} />
        </div>
        <div>
          <label className={label} style={{ color: COLORS.ink }}>Số người tối đa</label>
          <input type="number" value={form.maxPeople} onChange={set("maxPeople")} className={inputCls} style={{ borderColor: COLORS.line }} />
        </div>
        <div className="sm:col-span-2">
          <label className={label} style={{ color: COLORS.ink }}>Nội thất</label>
          <input value={form.furniture} onChange={set("furniture")} className={inputCls} style={{ borderColor: COLORS.line }} placeholder="Máy lạnh, giường, tủ lạnh, máy giặt" />
        </div>
        <div>
          <label className={label} style={{ color: COLORS.ink }}>Tiền điện</label>
          <input value={form.electricity} onChange={set("electricity")} className={inputCls} style={{ borderColor: COLORS.line }} placeholder="3.800đ/kWh" />
        </div>
        <div>
          <label className={label} style={{ color: COLORS.ink }}>Tiền nước</label>
          <input value={form.water} onChange={set("water")} className={inputCls} style={{ borderColor: COLORS.line }} placeholder="100.000đ/người" />
        </div>
        <div>
          <label className={label} style={{ color: COLORS.ink }}>Phí dịch vụ</label>
          <input value={form.serviceFee} onChange={set("serviceFee")} className={inputCls} style={{ borderColor: COLORS.line }} placeholder="150.000đ/tháng" />
        </div>
        <div>
          <label className={label} style={{ color: COLORS.ink }}>Giờ giấc</label>
          <input value={form.hours} onChange={set("hours")} className={inputCls} style={{ borderColor: COLORS.line }} placeholder="Tự do giờ giấc" />
        </div>
        <div className="sm:col-span-2">
          <label className={label} style={{ color: COLORS.ink }}>Mô tả chi tiết</label>
          <textarea value={form.description} onChange={set("description")} rows={3} className={inputCls} style={{ borderColor: COLORS.line }} />
        </div>

        <div className="flex items-center gap-5 sm:col-span-2">
          <label className="flex items-center gap-2 text-[13.5px]" style={{ color: COLORS.ink }}>
            <input type="checkbox" checked={form.pet} onChange={set("pet")} /> Cho thú cưng
          </label>
          <label className="flex items-center gap-2 text-[13.5px]" style={{ color: COLORS.ink }}>
            <input type="checkbox" checked={form.washer} onChange={set("washer")} /> Có máy giặt
          </label>
          <label className="flex items-center gap-2 text-[13.5px]" style={{ color: COLORS.ink }}>
            <input type="checkbox" checked={form.elevator} onChange={set("elevator")} /> Có thang máy
          </label>
        </div>

        <div>
          <label className={label} style={{ color: COLORS.ink }}>Tên chủ nhà</label>
          <input value={form.ownerName} onChange={set("ownerName")} className={inputCls} style={{ borderColor: COLORS.line }} />
        </div>
        <div>
          <label className={label} style={{ color: COLORS.ink }}>Số điện thoại chủ</label>
          <input value={form.ownerPhone} onChange={set("ownerPhone")} className={inputCls} style={{ borderColor: COLORS.line }} placeholder="0901234567" />
        </div>

        <div className="sm:col-span-2">
          <label className={label} style={{ color: COLORS.ink }}>Trạng thái phòng</label>
          <div className="flex flex-wrap gap-2">
            {STATUS_LIST.map((s) => (
              <button
                type="button"
                key={s}
                onClick={() => setForm((f) => ({ ...f, status: s }))}
                className="rounded-full border px-3 py-1.5 text-[13px] font-medium transition"
                style={{
                  borderColor: form.status === s ? COLORS.primary : COLORS.line,
                  background: form.status === s ? COLORS.primary : "transparent",
                  color: form.status === s ? "white" : COLORS.inkSoft,
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className={label} style={{ color: COLORS.ink }}>Ảnh phòng</label>
          <div className="flex flex-wrap items-center gap-2">
            {form.images.map((src, i) => (
              <div key={i} className="relative">
                <img src={src} alt="" className="h-16 w-16 rounded-lg object-cover" />
                <button
                  onClick={() => setForm((f) => ({ ...f, images: f.images.filter((_, idx) => idx !== i) }))}
                  className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow"
                  style={{ color: COLORS.stopped }}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-lg border border-dashed text-[11px]"
              style={{ borderColor: COLORS.line, color: COLORS.inkSoft }}
            >
              <ImagePlus className="h-4 w-4" />
              Tải ảnh
            </button>
            <input ref={fileRef} type="file" multiple accept="image/*" onChange={handleFiles} className="hidden" />
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-3">
        <button onClick={onCancel} className="rounded-lg px-4 py-2.5 text-[14px] font-medium" style={{ color: COLORS.inkSoft }}>
          Hủy
        </button>
        <button
          onClick={submit}
          disabled={saving}
          className="rounded-lg px-5 py-2.5 text-[14px] font-semibold text-white shadow-sm hover:brightness-110 disabled:opacity-60"
          style={{ background: COLORS.primary }}
        >
          {saving ? "Đang lưu..." : mode === "edit" ? "Lưu thay đổi" : "Thêm phòng"}
        </button>
      </div>
    </div>
  );
}
