# Rổ hàng sale — Website nội bộ tìm phòng trọ / căn hộ

Công cụ nội bộ cho đội sale: tìm phòng theo địa chỉ / khu vực / giá, xem chi tiết,
gọi ngay cho chủ nhà, và quản lý (thêm/sửa/xóa) danh sách phòng.

Dự án gồm 2 phần chạy độc lập:

- `backend/`  — Node.js + Express + MongoDB (REST API)
- `frontend/` — React + Vite + Tailwind CSS (giao diện, gọi API ở trên)

## 1. Yêu cầu

- Node.js 18 trở lên
- MongoDB — chọn 1 trong 2 cách:
  - Cài MongoDB chạy ở máy local (`mongodb://127.0.0.1:27017`), hoặc
  - Dùng MongoDB Atlas (free tier) và lấy connection string

## 2. Chạy Backend

```bash
cd backend
cp .env.example .env
# Mở .env, chỉnh MONGODB_URI nếu cần (mặc định trỏ tới Mongo local)

npm install
npm run seed     # tạo 12 phòng mẫu trong database
npm run dev       # chạy server tại http://localhost:5000
```

Kiểm tra nhanh: mở `http://localhost:5000/api/health` phải thấy `{"ok": true, ...}`.

### Các API chính

| Method | Endpoint                  | Mô tả                                  |
|--------|----------------------------|------------------------------------------|
| GET    | `/api/rooms`               | Danh sách phòng, hỗ trợ `?q=&district=&priceFrom=&priceTo=&status=` |
| GET    | `/api/rooms/:id`           | Chi tiết 1 phòng                        |
| POST   | `/api/rooms`                | Thêm phòng mới                          |
| PUT    | `/api/rooms/:id`            | Cập nhật toàn bộ thông tin phòng        |
| PATCH  | `/api/rooms/:id/status`     | Cập nhật nhanh trạng thái phòng         |
| DELETE | `/api/rooms/:id`            | Xóa phòng                               |

Ví dụ: `GET /api/rooms?district=Quận 2&priceFrom=4000000&priceTo=6000000`
hoặc chỉ cần `GET /api/rooms?q=3 - 5 triệu Thảo Điền` — hệ thống tự nhận diện
khoảng giá trong câu tìm kiếm.

## 3. Chạy Frontend

Mở terminal khác (giữ backend đang chạy):

```bash
cd frontend
npm install
npm run dev       # mở http://localhost:5173
```

Vite đã cấu hình sẵn proxy `/api` → `http://localhost:5000`, nên frontend
gọi thẳng `/api/rooms` mà không bị lỗi CORS, không cần cấu hình gì thêm khi
chạy ở local.

## 4. Cấu trúc thư mục

```
backend/
  src/
    server.js              # khởi động Express, kết nối DB
    db.js                   # kết nối MongoDB
    models/Room.js          # schema phòng
    controllers/roomsController.js
    routes/rooms.routes.js
    utils/parsePrice.js     # nhận diện "3 - 5 triệu" trong câu tìm kiếm
    seed/seedData.js        # 12 phòng mẫu
    seed/seed.js            # script chạy seed

frontend/
  src/
    App.jsx                 # điều hướng giữa các trang + gọi API
    lib/api.js               # hàm gọi REST API
    lib/constants.js          # màu sắc, danh sách quận, trạng thái
    lib/utils.js               # format tiền, nhận diện giá trong câu tìm kiếm
    components/
      Header.jsx
      FilterBar.jsx           # thanh tìm kiếm + bộ lọc
      RoomCard.jsx / RoomGrid.jsx
      RoomDetail.jsx           # trang chi tiết + nút Gọi ngay
      RoomForm.jsx              # form thêm / sửa phòng
      ManageList.jsx             # bảng quản lý phòng
```

## 5. Ghi chú quan trọng

- **Ảnh phòng**: bản MVP lưu ảnh dạng base64 thẳng trong MongoDB để đơn giản
  hoá triển khai. Khi lên phiên bản chính thức, nên chuyển sang lưu ảnh ở
  dịch vụ lưu trữ file (Cloudinary, AWS S3, Supabase Storage...) và chỉ lưu
  URL trong database — sẽ nhẹ và nhanh hơn nhiều.
- **Đăng nhập / phân quyền**: bản MVP chưa có tài khoản đăng nhập — ai mở
  link cũng thấy được toàn bộ dữ liệu và có thể thêm/sửa/xóa. Nếu cần giới
  hạn (VD: chỉ admin được xóa phòng), nên thêm xác thực (JWT/Supabase Auth)
  ở bước tiếp theo.
- **Triển khai thật (deploy)**: có thể đưa `backend` lên Render/Railway/VPS,
  `frontend` lên Vercel/Netlify. Khi đó cần đặt `VITE_API_URL` (frontend)
  trỏ tới domain backend thật, và `CORS_ORIGIN` (backend) trỏ tới domain
  frontend thật.
