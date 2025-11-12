// File: frontend/src/pages/DashboardPage.jsx
import React from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Heading, Text, Button, Link, SimpleGrid } from '@chakra-ui/react';

export default function DashboardPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('skillmatch_token');
    navigate('/'); // Sửa: Về Trang chủ
  };

  return (
    <Flex h="100vh" bg="gray.900" color="white">
      {/* 1. Sidebar */}
      <Flex as="aside" w="64" bg="gray.800" p={6} shadow="lg" direction="column">
        <Heading as="h1" size="lg" mb={8}>SkillMatch</Heading>
        <Flex as="nav" direction="column" flex={1} gap={2}>
          <Link as={RouterLink} to="/dashboard" bg="blue.600" color="white" p={3} rounded="lg" fontWeight="bold">
            Dashboard
          </Link>
          <Link as={RouterLink} to="/my-skill" p={3} rounded="lg" _hover={{ bg: 'gray.700' }}>
            My Skill (Hồ sơ)
          </Link>
          <Link as={RouterLink} to="/tests" p={3} rounded="lg" _hover={{ bg: 'gray.700' }}>
            Làm Bài Test
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
          <Heading as="h2" size="lg">Chào mừng trở lại!</Heading>
        </Box>
        <Box flex={1} p={8} overflowY="auto">
          <Heading as="h3" size="xl" mb={6}>Tổng quan</Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <Box bg="gray.800" p={6} rounded="lg" shadow="lg">
              <Text fontSize="lg" fontWeight="semibold" color="gray.400">Bài test đã làm</Text>
              <Text fontSize="4xl" fontWeight="bold" mt={2}>5</Text>
            </Box>
            <Box bg="gray.800" p={6} rounded="lg" shadow="lg">
              <Text fontSize="lg" fontWeight="semibold" color="gray.400">Kỹ năng đã xác thực</Text>
              <Text fontSize="4xl" fontWeight="bold" mt={2}>3</Text>
            </Box>
            <Box bg="gray.800" p={6} rounded="lg" shadow="lg">
              <Text fontSize="lg" fontWeight="semibold" color="gray.400">Cơ hội việc làm</Text>
              <Text fontSize="4xl" fontWeight="bold" mt={2}>1</Text>
            </Box>
          </SimpleGrid>
        </Box>
      </Flex>
    </Flex>
  );
}