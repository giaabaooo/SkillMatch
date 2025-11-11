// File: backend/models/User.model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Đây là "khuôn mẫu" cho dữ liệu User
const userSchema = new Schema({
  email: {
    type: String,
    required: true, // Bắt buộc phải có
    unique: true,   // Email phải là duy nhất
    trim: true,     // Tự động cắt bỏ khoảng trắng thừa
    lowercase: true // Tự động chuyển về chữ thường
  },
  password: {
    type: String,
    required: true, // Bắt buộc phải có
    minlength: 6    // Mật khẩu phải có ít nhất 6 ký tự
  },
  // Đây là nơi chúng ta sẽ lưu hồ sơ "My Skill" sau này
  profile: {
    fullName: { type: String, default: '' },
    headline: { type: String, default: '' },
    // ... (workExperience, education, projects...)
  },
  // Kỹ năng đã được xác thực (Phần quan trọng nhất)
  verifiedSkills: [
    {
      skillName: String,
      score: Number,
      verifiedOn: Date
    }
  ]
}, {
  timestamps: true // Tự động thêm 'createdAt' và 'updatedAt'
});

// "Biên dịch" khuôn mẫu thành một Model
// MongoDB sẽ tự động tạo một "collection" (bảng) tên là 'users'
const User = mongoose.model('User', userSchema);

module.exports = User; // Xuất Model này ra