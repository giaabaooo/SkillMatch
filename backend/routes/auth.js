// File: backend/routes/auth.routes.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // Để mã hóa mật khẩu
const jwt = require('jsonwebtoken'); // Để tạo "vé đăng nhập" (token)

// Import "khuôn mẫu" User chúng ta vừa tạo
const User = require('../models/User.js');

// --- API 1: ĐĂNG KÝ (REGISTER) ---
// @route   POST /api/auth/register
// @desc    Đăng ký người dùng mới
router.post('/register', async (req, res) => {
  // 1. Lấy email và password từ "thân" (body) của request
  const { email, password } = req.body;

  try {
    // 2. Kiểm tra xem email đã tồn tại chưa
    let user = await User.findOne({ email });
    if (user) {
      // Nếu email đã tồn tại, trả về lỗi 400
      return res.status(400).json({ message: 'Email đã được đăng ký' });
    }

    // 3. Nếu chưa, tạo một User mới
    user = new User({
      email,
      password
    });

    // 4. Mã hóa mật khẩu (RẤT QUAN TRỌNG)
    const salt = await bcrypt.genSalt(10); // Tạo "muối"
    user.password = await bcrypt.hash(password, salt); // "Băm" mật khẩu

    // 5. Lưu User mới vào database
    await user.save();

    // 6. Trả về thông báo thành công (sau này sẽ trả về token)
    res.status(201).json({ message: 'Đăng ký thành công!' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// --- API 2: ĐĂNG NHẬP (LOGIN) ---
// @route   POST /api/auth/login
// @desc    Đăng nhập người dùng
// (Chúng ta sẽ code logic này ở bước tiếp theo)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 2. Kiểm tra xem email có tồn tại không
    let user = await User.findOne({ email });
    if (!user) {
      // Dùng chung 1 thông báo lỗi để tăng bảo mật
      return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng' });
    }

    // 3. So sánh mật khẩu
    // Dùng bcrypt.compare để so sánh password người dùng gõ (password)
    // với 'user.password' (đã được mã hóa) trong database
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      // Mật khẩu không khớp
      return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng' });
    }

    // 4. Nếu mọi thứ đều đúng -> Tạo "Vé đăng nhập" (Token)
    // Tạo "payload" (thông tin chúng ta muốn lưu trong vé)
    const payload = {
      user: {
        id: user.id // Chỉ cần lưu ID của user là đủ
      }
    };

    // Ký tên vào "vé" với "Chìa khóa bí mật"
    jwt.sign(
      payload,
      process.env.JWT_SECRET, // Lấy chìa khóa từ file .env
      { expiresIn: '7d' }, // Vé có hạn sử dụng 7 ngày
      (err, token) => {
        if (err) throw err;
        // 5. Gửi "vé" (token) về cho người dùng
        res.json({ token });
      }
    );

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router; // Xuất file route này ra