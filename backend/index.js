


const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); 
require('dotenv').config(); 
const authRoutes = require('./routes/auth.js');

const app = express();
const port = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch(err => console.error("MongoDB Connection Error:", err));

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

app.use(express.json()); 

app.get('/api', (req, res) => {
  res.json({ message: "Hello, World! This is the SkillMatch API." });
});
app.use('/api/auth', authRoutes);
// TODO: Thêm API cho Đăng ký (Register) và Đăng nhập (Login) ở đây
// app.post('/api/auth/register', ...);
// app.post('/api/auth/login', ...);

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});

module.exports = app;