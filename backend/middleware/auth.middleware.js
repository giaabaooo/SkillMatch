// File: backend/middleware/auth.middleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Để lấy JWT_SECRET

// Middleware 1: (Giữ nguyên, không dùng)
const auth = (req, res, next) => {
  // Lấy token từ header
  const token = req.header('x-auth-token'); 

  // Kiểm tra nếu không có token
  if (!token) {
    return res.status(401).json({ message: 'Không có token, truy cập bị từ chối' });
  }

  // Xác thực token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; 
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token không hợp lệ' });
  }
};

// Middleware 2: (ĐÃ SỬA - TẠM TẮT ĐỂ TEST)
const isBusiness = (req, res, next) => {
  
  // --- TẠM BỎ QUA CHECK TOKEN ĐỂ TEST ---
  console.log('!!! CẢNH BÁO: ĐANG TẮT CHECK TOKEN (auth.middleware.js) !!!');
  
  // Gắn một ID Doanh nghiệp "giả" vào request để test
  // Lấy một ID thật từ DB MongoDB Atlas của bạn (bảng 'businesses')
  // Ví dụ: '660a1b2c3d4e5f6a7b8c9d0e'
  req.user = {
    id: '691490b3c5e06aacc8223c10', // <-- QUAN TRỌNG: THAY ID NÀY BẰNG 1 ID DOANH NGHIỆP CÓ THẬT TRONG DB
    role: 'business'
  };
  
  next(); // Cho phép đi tiếp
  
  /* --- CODE GỐC (ĐÃ COMMENT LẠI) ---
  // Dùng middleware 'auth' trước
  auth(req, res, () => {
    // Sau khi 'auth' chạy, ta sẽ có req.user
    if (req.user.role !== 'business') {
      return res.status(403).json({ message: 'Truy cập bị cấm. Chỉ dành cho Doanh nghiệp.' });
    }
    next(); // Là business, cho đi tiếp
  });
  */
};

module.exports = { auth, isBusiness };