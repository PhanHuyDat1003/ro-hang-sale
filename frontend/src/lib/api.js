const API_BASE = import.meta.env.VITE_API_URL || "/api";

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    let message = `Lỗi ${res.status}`;
    try {
      const body = await res.json();
      message = body.message || message;
    } catch {
      // ignore parse error
    }
    throw new Error(message);
  }
  if (res.status === 204) return null;
  return res.json();
}

export function listRooms(filters = {}) {
  const params = new URLSearchParams();
  if (filters.text) params.set("q", filters.text);
  if (filters.district) params.set("district", filters.district);
  if (filters.priceFrom) params.set("priceFrom", filters.priceFrom);
  if (filters.priceTo) params.set("priceTo", filters.priceTo);
  if (filters.status) params.set("status", filters.status);
  const qs = params.toString();
  return request(`/rooms${qs ? `?${qs}` : ""}`);
}

export function getRoom(id) {
  return request(`/rooms/${id}`);
}

export function createRoom(data) {
  return request(`/rooms`, { method: "POST", body: JSON.stringify(data) });
}

export function updateRoom(id, data) {
  return request(`/rooms/${id}`, { method: "PUT", body: JSON.stringify(data) });
}

export function updateRoomStatus(id, status) {
  return request(`/rooms/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export function deleteRoom(id) {
  return request(`/rooms/${id}`, { method: "DELETE" });
}
