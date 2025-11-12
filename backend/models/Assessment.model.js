// File: backend/models/Assessment.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Định nghĩa cấu trúc của 1 câu hỏi (sub-document)
const questionSchema = new Schema({
  type: {
    type: String,
    enum: ['mcq', 'practical', 'iq'], // Chỉ chấp nhận 3 loại này
    required: true
  },
  title: { // Dùng cho 'practical' (vd: "Bài tập 1: Viết content")
    type: String 
  },
  question: { // Dùng cho 'mcq'/'iq' (vd: "Câu hỏi 1 là gì?")
    type: String
  },
  prompt: { // Dùng cho 'practical' (vd: "Hãy viết 1 bài 300 chữ...")
    type: String
  },
  options: [String], // Mảng các lựa chọn (cho mcq/iq)
  correctAnswer: { // Vị trí (index) của đáp án đúng
    type: Number
  }
}, { _id: false }); // _id: false để không tự tạo _id cho từng câu hỏi

// Định nghĩa cấu trúc của bài test (Assessment)
const assessmentSchema = new Schema({
  // --- LIÊN KẾT VỚI DOANH NGHIỆP ---
  // Đây là key quan trọng nhất
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'Business', // Tham chiếu đến 'Business' model
    required: true
  },

  // --- THÔNG TIN TỪ FORM ---
  assessmentName: {
    type: String,
    required: true,
    trim: true
  },
  timeLimit: {
    type: Number,
    required: true
  },
  securitySettings: {
    enableAI: { type: Boolean, default: false },
    enableWebcam: { type: Boolean, default: false },
    enableScreen: { type: Boolean, default: false },
    lockBrowser: { type: Boolean, default: false }
  },
  testType: {
    type: String,
    enum: ['mcq', 'practical', 'iq'],
    required: true
  },
  
  // --- LOGIC DRAFT/PUBLISH ---
  status: {
    type: String,
    enum: ['DRAFT', 'PUBLISHED'], // Trạng thái của bài test
    required: true
  },

  // --- NỘI DUNG CÂU HỎI ---
  questions: [questionSchema] // Một mảng chứa các câu hỏi

}, {
  timestamps: true // Tự động thêm createdAt và updatedAt
});

// "Biên dịch" khuôn mẫu thành Model
// MongoDB sẽ tự động tạo collection tên là 'assessments'
const Assessment = mongoose.model('Assessment', assessmentSchema);

module.exports = Assessment;