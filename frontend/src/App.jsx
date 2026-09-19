import { useEffect, useState, useCallback } from "react";
import { Plus, Settings2 } from "lucide-react";
import { COLORS } from "./lib/constants";
import * as api from "./lib/api";

import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import RoomGrid from "./components/RoomGrid";
import RoomDetail from "./components/RoomDetail";
import RoomForm from "./components/RoomForm";
import ManageList from "./components/ManageList";

export default function App() {
  const [view, setView] = useState({ name: "home" });

  const [filters, setFilters] = useState({
    text: "",
    district: "",
    priceFrom: "",
    priceTo: "",
    status: "",
  });
  const [appliedFilters, setAppliedFilters] = useState(filters);

  const [rooms, setRooms] = useState([]); // full/filtered list depending on view
  const [recentRooms, setRecentRooms] = useState([]); // for home page preview
  const [listLoading, setListLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editingRoom, setEditingRoom] = useState(null);
  const [saving, setSaving] = useState(false);

  // --- data loading -------------------------------------------------------

  const loadList = useCallback(async (f) => {
    setListLoading(true);
    setError("");
    try {
      const data = await api.listRooms(f);
      setRooms(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setListLoading(false);
    }
  }, []);

  const loadRecent = useCallback(async () => {
    try {
      const data = await api.listRooms({});
      setRecentRooms(data.slice(0, 6));
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const loadManageList = useCallback(async () => {
    await loadList({});
  }, [loadList]);

  useEffect(() => {
    if (view.name === "home") loadRecent();
    if (view.name === "list") loadList(appliedFilters);
    if (view.name === "manage" && !editingId) loadManageList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view.name, appliedFilters, editingId]);

  useEffect(() => {
    if (view.name === "detail" && view.id) {
      setDetailLoading(true);
      api
        .getRoom(view.id)
        .then(setSelectedRoom)
        .catch((err) => {
          setError(err.message);
          setSelectedRoom(null);
        })
        .finally(() => setDetailLoading(false));
    }
  }, [view]);

  // --- actions --------------------------------------------------------------

  const doSearch = () => {
    setAppliedFilters(filters);
    setView({ name: "list" });
  };

  const openRoom = (id) => setView({ name: "detail", id });

  const handleAdd = async (data) => {
    setSaving(true);
    try {
      await api.createRoom(data);
      setView({ name: "manage" });
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const startEdit = async (id) => {
    setEditingId(id);
    try {
      const room = await api.getRoom(id);
      setEditingRoom(room);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async (data) => {
    setSaving(true);
    try {
      await api.updateRoom(editingId, data);
      setEditingId(null);
      setEditingRoom(null);
      await loadManageList();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Xóa phòng này khỏi hệ thống?")) return;
    try {
      await api.deleteRoom(id);
      setRooms((rs) => rs.filter((r) => r._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleStatusChange = async (id, status) => {
    setRooms((rs) => rs.map((r) => (r._id === id ? { ...r, status } : r)));
    try {
      await api.updateRoomStatus(id, status);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-full w-full" style={{ background: COLORS.bg, color: COLORS.ink }}>
      <Header view={view} setView={setView} />

      <main className="mx-auto max-w-6xl px-5 py-8">
        {error && (
          <div
            className="mb-4 rounded-xl border px-4 py-3 text-[13.5px]"
            style={{ borderColor: COLORS.stopped, color: COLORS.stopped, background: COLORS.stoppedBg }}
          >
            {error} — kiểm tra backend đã chạy ở http://localhost:5000 chưa.
          </div>
        )}

        {view.name === "home" && (
          <div>
            <div className="mb-6">
              <h1 className="text-[26px] font-semibold tracking-tight" style={{ color: COLORS.ink }}>
                Tìm phòng nhanh cho khách
              </h1>
              <p className="mt-1 text-[14.5px]" style={{ color: COLORS.inkSoft }}>
                Nhập địa chỉ, khu vực hoặc mức giá — hệ thống lọc ra phòng phù hợp ngay lập tức.
              </p>
            </div>
            <FilterBar filters={filters} setFilters={setFilters} onSearch={doSearch} showCount={false} />
            <div className="mt-8 flex items-center justify-between">
              <h2 className="text-[16px] font-semibold" style={{ color: COLORS.ink }}>
                Phòng mới cập nhật
              </h2>
              <button onClick={() => setView({ name: "list" })} className="text-[13.5px] font-medium" style={{ color: COLORS.primary }}>
                Xem tất cả
              </button>
            </div>
            <div className="mt-4">
              <RoomGrid rooms={recentRooms} onOpen={openRoom} loading={false} />
            </div>
          </div>
        )}

        {view.name === "list" && (
          <div>
            <FilterBar
              filters={filters}
              setFilters={setFilters}
              onSearch={doSearch}
              resultCount={rooms.length}
              showCount={true}
              loading={listLoading}
            />
            <div className="mt-6">
              <RoomGrid rooms={rooms} onOpen={openRoom} loading={listLoading} />
            </div>
          </div>
        )}

        {view.name === "detail" && (
          <RoomDetail room={selectedRoom} loading={detailLoading} onBack={() => setView({ name: "list" })} />
        )}

        {view.name === "add" && (
          <RoomForm mode="add" onCancel={() => setView({ name: "home" })} onSubmit={handleAdd} saving={saving} />
        )}

        {view.name === "manage" && !editingId && (
          <div>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h1 className="text-[20px] font-semibold" style={{ color: COLORS.ink }}>
                  Quản lý phòng
                </h1>
                <p className="text-[13.5px]" style={{ color: COLORS.inkSoft }}>
                  {rooms.length} phòng trong hệ thống
                </p>
              </div>
              <button
                onClick={() => setView({ name: "add" })}
                className="flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-[14px] font-semibold text-white shadow-sm hover:brightness-110"
                style={{ background: COLORS.primary }}
              >
                <Plus className="h-4 w-4" /> Thêm phòng
              </button>
            </div>
            <ManageList
              rooms={rooms}
              onEdit={startEdit}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
              loading={listLoading}
            />
          </div>
        )}

        {view.name === "manage" && editingId && !editingRoom && (
          <div style={{ color: COLORS.inkSoft }}>Đang tải thông tin phòng...</div>
        )}

        {view.name === "manage" && editingId && editingRoom && (
          <RoomForm
            mode="edit"
            initial={editingRoom}
            onCancel={() => {
              setEditingId(null);
              setEditingRoom(null);
            }}
            onSubmit={handleUpdate}
            saving={saving}
          />
        )}
      </main>

      <footer className="mx-auto max-w-6xl px-5 py-8 text-[12.5px]" style={{ color: COLORS.inkSoft }}>
        <div className="flex items-center gap-1.5">
          <Settings2 className="h-3.5 w-3.5" /> Rổ hàng sale — công cụ nội bộ cho đội sale phòng trọ / căn hộ.
        </div>
      </footer>
    </div>
  );
}
