// File: backend/models/Business.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const businessSchema = new Schema({
  // Thông tin ở Bước 1 (Đăng ký)
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  // Tên người đăng ký (HR, Manager...)
  fullName: {
    type: String,
    required: true,
  },

  // Thông tin ở Bước 2 (Onboarding)
  companyName: {
    type: String,
    default: ''
  },
  companyPhone: {
    type: String,
    default: ''
  },
  companySize: {
    type: String, // Ví dụ: "1-50", "51-200"
    default: ''
  },

  // Định danh vai trò (Rất quan trọng)
  role: {
    type: String,
    default: 'business' // Phân biệt với 'candidate'
  }
}, {
  timestamps: true 
});

const Business = mongoose.model('Business', businessSchema);

module.exports = Business;