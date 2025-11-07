

// --- 1. IMPORT CÁC THƯ VIỆN CẦN THIẾT ---
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // <-- MỚI: Import Mongoose
require('dotenv').config(); // Để đọc file .env (cho MONGO_URI local)
const authRoutes = require('./routes/auth.js');
// --- 2. KHỞI TẠO ỨNG DỤNG ---
const app = express();
const port = process.env.PORT || 3001;

// --- 3. KẾT NỐI DATABASE (MongoDB Atlas) ---
// (Phải đặt TRƯỚC khi định nghĩa API)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// --- 4. CẤU HÌNH MIDDLEWARE (Các "trạm gác") ---

// 4a. Cấu hình CORS (Ai được phép gõ cửa)
const allowedOrigins = [
  'https://skillmatchs.vercel.app', // Khách Production (Vercel)
  'http://localhost:5173'         // Khách Development (máy bạn)
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); // Cho phép vào
    } else {
      callback(new Error('Not allowed by CORS')); // Chặn lại
    }
  }
}));

// 4b. Dạy Back-end hiểu được dữ liệu JSON (khi React gửi lên)
app.use(express.json()); 

// --- 5. ĐỊNH NGHĨA CÁC API "ROUTES" (Các "cửa") ---

// API "Hello World" (Để kiểm tra)
app.get('/api', (req, res) => {
  res.json({ message: "Hello, World! This is the SkillMatch API." });
});
app.use('/api/auth', authRoutes);
// TODO: Thêm API cho Đăng ký (Register) và Đăng nhập (Login) ở đây
// app.post('/api/auth/register', ...);
// app.post('/api/auth/login', ...);

// --- 6. KHỞI ĐỘNG SERVER ---
app.listen(port, '0.0.0.0', () => {
  console.log(`Backend server is running on port ${port}`);
});

// Dùng cho việc test (sẽ cần sau)
module.exports = app;