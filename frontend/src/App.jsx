
import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  // 2. Tạo một "state" mới để lưu tin nhắn từ API
  const [message, setMessage] = useState("Đang tải tin nhắn từ API...");

  
  useEffect(() => {
    // Lấy link API từ Biến Môi Trường (chúng ta sẽ cài ở Bước 2)
    // Nó sẽ là https://skillmatch-k7gy.onrender.com
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    // Gọi đến "cửa" /api
    fetch(`${apiBaseUrl}/api`)
      .then(res => res.json())
      .then(data => {
        // Lưu tin nhắn từ API vào "state"
        setMessage(data.message);
      })
      .catch(err => {
        console.error("Lỗi khi gọi API:", err);
        setMessage("Không thể kết nối đến API.");
      });
  }, []); // Dấu [] rỗng nghĩa là "chỉ chạy 1 lần"

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      
      {/* 4. HIỂN THỊ TIN NHẮN TỪ API RA MÀN HÌNH */}
      <div className="card">
        <h2>Tin nhắn từ "bộ não" Back-end:</h2>
        <p style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
          "{message}"
        </p>
      </div>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    </>
  )
}

export default App