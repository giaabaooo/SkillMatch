

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // Để mã hóa mật khẩu
const jwt = require('jsonwebtoken'); // Để tạo "vé đăng nhập" (token)

// Import "khuôn mẫu" User chúng ta vừa tạo
const User = require('../models/User.js');
const Business = require('../models/Business.model.js'); // Import khuôn mẫu Business
const { body, validationResult } = require('express-validator'); // Công cụ kiểm tra dữ liệu

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
router.post(
  '/login',
  [ // Kiểm tra dữ liệu
    body('email', 'Email không hợp lệ').isEmail(),
    body('password', 'Mật khẩu không được để trống').not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { email, password } = req.body;

    try {
      // 1. Tìm trong "nhóm" Ứng viên (User) trước
      let user = await User.findOne({ email });
      let userType = 'candidate'; // Mặc định là ứng viên

      // 2. Nếu không thấy, tìm trong "nhóm" Doanh nghiệp (Business)
      if (!user) {
        user = await Business.findOne({ email });
        userType = 'business'; // Đổi loại
      }

      // 3. Nếu không tìm thấy ở cả 2 nơi
      if (!user) {
        return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng' });
      }

      // 4. So sánh mật khẩu
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng' });
      }

      // 5. TẠO "VÉ" (TOKEN) - ĐÃ BAO GỒM VAI TRÒ (ROLE)
      const payload = {
        user: {
          id: user.id,
          role: user.role || userType // Lấy role từ DB, nếu k có thì dùng userType
        }
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '7d' },
        (err, token) => {
          if (err) throw err;
          // 6. Gửi "vé" (token) về
          res.json({ token });
        }
      );

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// --- API 3: ĐĂNG KÝ (REGISTER) CHO DOANH NGHIỆP ---
// @route   POST /api/auth/register-business
// @desc    Đăng ký tài khoản doanh nghiệp mới
router.post(
  '/register-business',
  [
    // 1. Kiểm tra dữ liệu đầu vào
    body('fullName', 'Tên không được để trống').not().isEmpty(),
    body('email', 'Email công việc không hợp lệ').isEmail(),
    body('password', 'Mật khẩu phải có ít nhất 6 ký tự').isLength({ min: 6 })
  ],
  async (req, res) => {
    // 2. Trả về lỗi nếu dữ liệu không hợp lệ
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    // 3. Lấy dữ liệu từ body
    const { fullName, email, password } = req.body;

    try {
      // 4. Kiểm tra xem email Doanh nghiệp này đã tồn tại chưa
      let business = await Business.findOne({ email });
      if (business) {
        return res.status(400).json({ message: 'Email này đã được đăng ký' });
      }

      // 5. (Nâng cao) Kiểm tra xem email này có phải là email cá nhân không
      // (Chúng ta sẽ KHÔNG cho phép @gmail.com, @yahoo.com đăng ký business)
      // const personalDomains = ['gmail.com', 'yahoo.com', 'outlook.com'];
      // const domain = email.split('@')[1];
      // if (personalDomains.includes(domain)) {
      //   return res.status(400).json({ message: 'Vui lòng sử dụng email công ty (Không dùng Gmail, Yahoo...)' });
      // }

      // 6. Tạo tài khoản Business mới
      business = new Business({
        fullName,
        email,
        password
        // role: 'business' (đã tự động)
      });

      // 7. Mã hóa mật khẩu
      const salt = await bcrypt.genSalt(10);
      business.password = await bcrypt.hash(password, salt);

      // 8. Lưu vào DB
      await business.save();

      // 9. (Nghiệp vụ) Tạo Token để "auto-login" (tự động đăng nhập)
      // cho họ vào thẳng trang Onboarding (Bước 2)
      const payload = {
        user: {
          id: business.id,
          role: 'business' // Ghi rõ vai trò
        }
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '7d' }, 
        (err, token) => {
          if (err) throw err;
          // Trả về "vé" (token) để họ vào trang Onboarding
          res.status(201).json({ token });
        }
      );

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router; // Xuất file route này ra