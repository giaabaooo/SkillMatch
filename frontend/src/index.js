
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ComingSoonPage from './pages/ComingSoonPage'; 


const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};
const theme = extendTheme({ config });




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}> 
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />

          
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