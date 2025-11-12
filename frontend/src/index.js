// File: frontend/src/index.js (Code cho CRA + Chakra v2)
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 1. GOM HẾT IMPORT LÊN ĐẦU
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ComingSoonPage from './pages/ComingSoonPage';
import RegisterSelectPage from './pages/RegisterSelectPage'; // <-- Import file mới
import RegisterBusinessPage from './pages/RegisterBusinessPage'; // <-- Import file mới
import BusinessDashboardPage from './pages/BusinessDashboardPage';
import BusinessLayout from './pages/BusinessLayout';
import CreateTestPage from './pages/CreateTestPage';

// 2. CODE CẤU HÌNH
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};
const theme = extendTheme({ config });

// 3. RENDER
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}> 
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <BrowserRouter>
        <Routes>
          {/* Luồng chính */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* Luồng Đăng ký MỚI */}
          <Route path="/register-select" element={<RegisterSelectPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/register-business" element={<RegisterBusinessPage />} />

          <Route path="/business" element={<BusinessLayout />}>
            <Route path="dashboard" element={<BusinessDashboardPage />} />
            <Route path="tests" element={<ComingSoonPage />} /> {/* Trang "My Tests" (chưa code) */}
            <Route path="tests/new" element={<CreateTestPage />} /> {/* Trang "Tạo Test" */}
            <Route path="candidates" element={<ComingSoonPage />} /> {/* Trang "Candidates" (chưa code) */}
            <Route path="settings" element={<ComingSoonPage />} />
          </Route>

          {/* Luồng "Coming Soon" */}
          <Route path="/my-skill" element={<ComingSoonPage />} />
          <Route path="/tests" element={<ComingSoonPage />} />
          <Route path="/settings" element={<ComingSoonPage />} />
          <Route path="/candidates" element={<ComingSoonPage />} />
          <Route path="/employers" element={<ComingSoonPage />} />
          <Route path="/pricing" element={<ComingSoonPage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);