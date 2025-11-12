const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const multer = require('multer'); // Thư viện xử lý file upload
const fs = require('fs');
const path = require('path');

// Import Model và Middleware bảo vệ
const Assessment = require('../models/Assessment.model.js');
const { isBusiness } = require('../middleware/auth.middleware.js');

// --- Cấu hình Multer ---
// Sử dụng bộ nhớ (memory storage) để không lưu file rác trên server
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// -------------------------------------------------------------------
// --- HÀM HELPER: ĐỌC NỘI DUNG FILE .TXT (LOGIC MỚI) ---
// -------------------------------------------------------------------
function parseTxtToJSON(txtContent, testType) {
  const lines = txtContent.split('\n');
  const questions = [];
  let currentQuestion = null;

  if (testType === 'mcq' || testType === 'iq') {
    lines.forEach(line => {
      line = line.trim();
      if (line.startsWith('Q:')) {
        if (currentQuestion) questions.push(currentQuestion); // Lưu câu hỏi trước
        currentQuestion = {
          type: testType,
          question: line.substring(2).trim(),
          options: [],
          correctAnswer: null
        };
      } else if (line.startsWith('O:') && currentQuestion) {
        currentQuestion.options.push(line.substring(2).trim());
      } else if (line.startsWith('A:') && currentQuestion) {
        currentQuestion.correctAnswer = parseInt(line.substring(2).trim(), 10);
      }
    });
    if (currentQuestion) questions.push(currentQuestion); // Lưu câu hỏi cuối cùng
  } 
  else if (testType === 'practical') {
    lines.forEach(line => {
      line = line.trim();
      if (line.startsWith('T:')) {
        if (currentQuestion) questions.push(currentQuestion); // Lưu câu hỏi trước
        currentQuestion = {
          type: testType,
          title: line.substring(2).trim(),
          prompt: ''
        };
      } else if (line.startsWith('P:') && currentQuestion) {
        // Nối các dòng prompt lại với nhau
        currentQuestion.prompt += line.substring(2).trim() + '\n'; 
      }
    });
    if (currentQuestion) {
      currentQuestion.prompt = currentQuestion.prompt.trim(); // Xóa dòng trống cuối
      questions.push(currentQuestion);
    }
  }

  return questions;
}

// -------------------------------------------------------------------
// --- API 1 (MỚI): PHÂN TÍCH FILE VÀ TRẢ VỀ JSON REVIEW ---
// -------------------------------------------------------------------
// @route   POST /api/tests/parse-upload
// @desc    Nhận file .txt, đọc và trả về JSON câu hỏi
// @access  Private (Chỉ Business)
router.post(
  '/parse-upload',
  [
    isBusiness, // Bảo vệ
    upload.single('testFile') // 'testFile' là tên field trong FormData
  ],
  (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'Không tìm thấy file nào.' });
      }

      const { testType } = req.body;
      if (!testType) {
        return res.status(400).json({ message: 'Vui lòng chọn loại test trước.' });
      }

      // Đọc file từ bộ nhớ
      const txtContent = req.file.buffer.toString('utf8');
      
      // Phân tích file
      const parsedQuestions = parseTxtToJSON(txtContent, testType);

      if (parsedQuestions.length === 0) {
        return res.status(400).json({ message: 'File không đúng định dạng hoặc không có câu hỏi nào.' });
      }
      
      console.log(`[Parse Success] Doanh nghiệp ${req.user.id} vừa parse ${parsedQuestions.length} câu hỏi từ file ${req.file.originalname}`);

      // Trả về JSON cho frontend review
      res.status(200).json(parsedQuestions);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error khi đọc file');
    }
  }
);


// -------------------------------------------------------------------
// --- API 2 (CẬP NHẬT): LƯU BÀI TEST VÀO DB ---
// -------------------------------------------------------------------
// @route   POST /api/tests/create  (ĐÃ ĐỔI TÊN TỪ '/' SANG '/create')
// @desc    Tạo một bài test mới (Lưu nháp hoặc Đăng tải)
// @access  Private (Chỉ Business)
router.post(
  '/create', // <-- ĐÃ ĐỔI TÊN ROUTE
  [
    express.json(),
    isBusiness, // BẮT BUỘC: Phải là Business mới được qua
    // Kiểm tra dữ liệu (validation)
    body('assessmentName', 'Tên bài test không được để trống').not().isEmpty(),
    body('timeLimit', 'Thời gian phải là một con số').isNumeric(),
    body('testType', 'Loại test không hợp lệ').isIn(['mcq', 'practical', 'iq']),
    body('status', 'Trạng thái không hợp lệ').isIn(['DRAFT', 'PUBLISHED']),
    body('questions', 'Phải có ít nhất 1 câu hỏi').isArray({ min: 1 })
  ],
  async (req, res) => {
    // 1. Kiểm tra lỗi validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    try {
      // 2. Lấy dữ liệu từ body (đã được FE gửi lên)
      const {
        assessmentName,
        timeLimit,
        securitySettings,
        testType,
        status, // Đây là logic DRAFT/PUBLISHED
        questions // Đây là JSON đã được parse từ API /parse-upload
      } = req.body;

      // 3. Lấy ID của doanh nghiệp (từ middleware isBusiness đã giải mã)
      const businessId = req.user.id;

      // 4. Tạo bài test mới trong DB
      const newAssessment = new Assessment({
        assessmentName,
        timeLimit,
        securitySettings,
        testType,
        status, // Lưu trạng thái
        questions,
        createdBy: businessId // Liên kết bài test này với business đã tạo ra nó
      });

      // 5. Lưu vào DB
      await newAssessment.save();

      console.log("---");
      console.log(`[SAVE SUCCESS] Doanh nghiệp (ID: ${businessId}) vừa tạo bài test: ${assessmentName}`);
      console.log(`Trạng thái: ${status}`);
      console.log("---");

      // 6. Trả về thông báo thành công
      res.status(201).json({
        message: `Đã lưu thành công với trạng thái ${status}`,
        testId: newAssessment._id
      });

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error khi lưu DB');
    }
  }
);

// TODO: Code thêm các API khác ở đây
// router.get('/', isBusiness, ...) // Lấy tất cả bài test của business (My Tests / Drafts)

module.exports = router;