// File: frontend/src/pages/BusinessLayout.jsx (Bố cục "Cha")
import React from 'react';
import { useNavigate, Link as RouterLink, Outlet, useLocation } from 'react-router-dom';
import { Box, Flex, Heading, Button, Link, Icon } from '@chakra-ui/react';
import { FiHome, FiClipboard, FiUsers, FiSettings } from 'react-icons/fi';

export default function BusinessLayout() {
  const navigate = useNavigate();
  const location = useLocation(); // Dùng để biết đang ở trang nào

  const handleLogout = () => {
    localStorage.removeItem('skillmatch_token');
    navigate('/'); // Về Trang chủ
  };

  // Hàm check link nào đang "Active"
  const isActive = (path) => location.pathname === path;

  return (
    // --- PROMPT: "Light mode, clean and professional" ---
    <Flex h="100vh" bg="gray.50" color="gray.800">

      {/* --- PROMPT: "A left sidebar navigation with icons" --- */}
      <Flex
        as="aside"
        w="64"
        bg="white"
        p={6}
        shadow="md"
        direction="column"
      >
        <Heading as="h1" size="lg" mb={8} color="blue.600">
          SkillMatch
        </Heading>
        <Flex as="nav" direction="column" flex={1} gap={2}>
          {/* Link 1: Dashboard */}
          <Link
            as={RouterLink}
            to="/business/dashboard" // Link tới trang "Welcome"
            bg={isActive('/business/dashboard') ? 'blue.50' : 'transparent'}
            color={isActive('/business/dashboard') ? 'blue.600' : 'gray.600'}
            p={3}
            rounded="lg"
            fontWeight={isActive('/business/dashboard') ? 'bold' : 'medium'}
            _hover={{ bg: 'gray.100' }}
            display="flex"
            alignItems="center"
          >
            <Icon as={FiHome} mr={3} />
            Trang chủ 
          </Link>
          {/* Link 2: My Tests */}
          <Link
            as={RouterLink}
            to="/business/tests" // Link tới trang "My Tests"
            bg={isActive('/business/tests') ? 'blue.50' : 'transparent'}
            color={isActive('/business/tests') ? 'blue.600' : 'gray.600'}
            p={3}
            rounded="lg"
            fontWeight={isActive('/business/tests') ? 'bold' : 'medium'}
            _hover={{ bg: 'gray.100' }}
            display="flex"
            alignItems="center"
          >
            <Icon as={FiClipboard} mr={3} />
            Bài phỏng vấn 
          </Link>
          {/* Link 3: Candidates */}
          <Link
            as={RouterLink}
            to="/business/candidates" // Link tới trang "Candidates"
            bg={isActive('/business/candidates') ? 'blue.50' : 'transparent'}
            color={isActive('/business/candidates') ? 'blue.600' : 'gray.600'}
            p={3}
            rounded="lg"
            fontWeight={isActive('/business/candidates') ? 'bold' : 'medium'}
            _hover={{ bg: 'gray.100' }}
            display="flex"
            alignItems="center"
          >
            <Icon as={FiUsers} mr={3} />
            Ứng viên 
          </Link>
          {/* Link 4: Settings */}
          {/* <Link
            as={RouterLink}
            to="/settings" // Trỏ đến ComingSoon
            p={3}
            rounded="lg"
            _hover={{ bg: 'gray.100' }}
            display="flex"
            alignItems="center"
          >
            <Icon as={FiSettings} mr={3} />
            Settings
          </Link> */}
          <Link
            as={RouterLink}
            to="/business/settings" // Link tới trang "Candidates"
            bg={isActive('/business/settings') ? 'blue.50' : 'transparent'}
            color={isActive('/business/settings') ? 'blue.600' : 'gray.600'}
            p={3}
            rounded="lg"
            fontWeight={isActive('/business/settings') ? 'bold' : 'medium'}
            _hover={{ bg: 'gray.100' }}
            display="flex"
            alignItems="center"
          >
             <Icon as={FiUsers} mr={3} />
            Cài đặt
          </Link>
          
        </Flex>
        <Button
          onClick={handleLogout}
          colorScheme="red"
          variant="outline"
          p={3}
          rounded="lg"
        >
          Đăng xuất
        </Button>
      </Flex>

      {/* --- Đây là "Cửa sổ" --- */}
      {/* Toàn bộ "Main Content" sẽ được "load" vào đây */}
      <Flex as="main" flex={1} direction="column" overflowY="auto">
        <Outlet /> 
      </Flex>

    </Flex>
  );
}