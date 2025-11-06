
const express = require('express');
const cors = require('cors'); 
const app = express();

const port = process.env.PORT || 3001; 

// QUAN TRỌNG: Dạy Back-end "tin tưởng" Front-end
// Thay 'httpsS://skill-match.vercel.app' bằng link Vercel của bạn
app.use(cors({
  origin: 'https://skillmatchs.vercel.app/' 
}));

// Dạy Back-end hiểu được dữ liệu JSON (cho các API POST sau này)
app.use(express.json()); 

// API "Hello World" của bạn
app.get('/api', (req, res) => {
  res.json({ message: "Hello, World! This is the SkillMatch API." });
});

// ... (Tất cả các API khác của bạn sẽ nằm ở đây) ...

// Khởi động server
app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});

// Dùng cho việc test (sẽ cần sau)
module.exports = app;