// File: frontend/src/pages/BusinessDashboardPage.jsx
import React from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Heading, Text, Button, Link, SimpleGrid } from '@chakra-ui/react';

export default function BusinessDashboardPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('skillmatch_token');
    navigate('/'); // Về Trang chủ
  };

  // Giao diện này sẽ khác với Dashboard của Ứng viên
  return (
    <Flex h="100vh" bg="gray.900" color="white">
      {/* 1. Sidebar Doanh nghiệp */}
      <Flex as="aside" w="64" bg="gray.800" p={6} shadow="lg" direction="column">
        <Heading as="h1" size="lg" mb={8}>SkillMatch (Business)</Heading>
        <Flex as="nav" direction="column" flex={1} gap={2}>
          <Link as={RouterLink} to="/business/dashboard" bg="blue.600" color="white" p={3} rounded="lg" fontWeight="bold">
            Dashboard
          </Link>
          <Link as={RouterLink} to="/business/tests" p={3} rounded="lg" _hover={{ bg: 'gray.700' }}>
            Quản lý Bài Test
          </Link>
          <Link as={RouterLink} to="/business/candidates" p={3} rounded="lg" _hover={{ bg: 'gray.700' }}>
            Quản lý Ứng viên
          </Link>
          <Link as={RouterLink} to="/settings" p={3} rounded="lg" _hover={{ bg: 'gray.700' }}>
            Cài đặt
          </Link>
        </Flex>
        <Button onClick={handleLogout} colorScheme="red" p={3} rounded="lg" fontWeight="bold">
          Đăng xuất
        </Button>
      </Flex>

      {/* 2. Main Content */}
      <Flex as="main" flex={1} direction="column">
        <Box as="header" bg="gray.800" shadow="md" p={6}>
          <Heading as="h2" size="lg">Chào mừng, [Tên Công ty]!</Heading>
        </Box>
        <Box flex={1} p={8} overflowY="auto">
          <Heading as="h3" size="xl" mb={6}>Tổng quan Doanh nghiệp</Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <Box bg="gray.800" p={6} rounded="lg" shadow="lg">
              <Text fontSize="lg" fontWeight="semibold" color="gray.400">Bài Test Đang Mở</Text>
              <Text fontSize="4xl" fontWeight="bold" mt={2}>2</Text>
            </Box>
            <Box bg="gray.800" p={6} rounded="lg" shadow="lg">
              <Text fontSize="lg" fontWeight="semibold" color="gray.400">Ứng viên Đã Nộp</Text>
              <Text fontSize="4xl" fontWeight="bold" mt={2}>120</Text>
            </Box>
            <Box bg="gray.800" p={6} rounded="lg" shadow="lg">
              <Text fontSize="lg" fontWeight="semibold" color="gray.400">Gói (Plan)</Text>
              <Text fontSize="4xl" fontWeight="bold" mt={2}>Premium</Text>
            </Box>
          </SimpleGrid>
        </Box>
      </Flex>
    </Flex>
  );
}