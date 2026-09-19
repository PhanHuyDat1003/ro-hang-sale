import Room from "../models/Room.js";
import { parsePriceHints } from "../utils/parsePrice.js";

// GET /api/rooms?q=&district=&priceFrom=&priceTo=&status=
export async function listRooms(req, res) {
  try {
    const { q = "", district = "", priceFrom, priceTo, status = "" } = req.query;

    let min = priceFrom ? Number(priceFrom) : null;
    let max = priceTo ? Number(priceTo) : null;
    let searchText = q;

    const hint = parsePriceHints(q);
    if (hint) {
      if (min == null) min = hint.min;
      if (max == null) max = hint.max;
      searchText = q.replace(hint.strip, "").trim();
    }

    const filter = {};

    if (district) filter.area = district;
    if (status) filter.status = status;
    if (min != null || max != null) {
      filter.price = {};
      if (min != null) filter.price.$gte = min;
      if (max != null) filter.price.$lte = max;
    }
    if (searchText) {
      const regex = new RegExp(searchText, "i");
      filter.$or = [{ name: regex }, { address: regex }, { area: regex }];
    }

    const rooms = await Room.find(filter).sort({ createdAt: -1 });
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi tải danh sách phòng", error: err.message });
  }
}

// GET /api/rooms/:id
export async function getRoomById(req, res) {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Không tìm thấy phòng" });
    res.json(room);
  } catch (err) {
    res.status(400).json({ message: "ID phòng không hợp lệ", error: err.message });
  }
}

// POST /api/rooms
export async function createRoom(req, res) {
  try {
    const room = await Room.create(req.body);
    res.status(201).json(room);
  } catch (err) {
    res.status(400).json({ message: "Không thể thêm phòng", error: err.message });
  }
}

// PUT /api/rooms/:id
export async function updateRoom(req, res) {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!room) return res.status(404).json({ message: "Không tìm thấy phòng" });
    res.json(room);
  } catch (err) {
    res.status(400).json({ message: "Không thể cập nhật phòng", error: err.message });
  }
}

// PATCH /api/rooms/:id/status
export async function updateRoomStatus(req, res) {
  try {
    const { status } = req.body;
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!room) return res.status(404).json({ message: "Không tìm thấy phòng" });
    res.json(room);
  } catch (err) {
    res.status(400).json({ message: "Không thể cập nhật trạng thái", error: err.message });
  }
}

// DELETE /api/rooms/:id
export async function deleteRoom(req, res) {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) return res.status(404).json({ message: "Không tìm thấy phòng" });
    res.json({ message: "Đã xóa phòng", id: req.params.id });
  } catch (err) {
    res.status(400).json({ message: "Không thể xóa phòng", error: err.message });
  }
}
