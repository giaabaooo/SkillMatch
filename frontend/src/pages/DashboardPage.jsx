
import React from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Heading, Button, Link,  SimpleGrid } from '@chakra-ui/react';

export default function DashboardPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('skillmatch_token');
    navigate('/');
  };

  return (
    <Flex h="100vh" bg="gray.900" color="white">
      {/* 1. Sidebar */}
      <Flex
        as="aside"
        w="64"
        bg="gray.800"
        p={6}
        shadow="lg"
        direction="column"
      >
        <Heading as="h1" size="lg" mb={8}>SkillMatch</Heading>
        <Flex as="nav" direction="column" flex={1} gap={2}>
          <Link
            as={RouterLink}
            to="/dashboard" // Link này là trang hiện tại
            bg="blue.600"
            color="white"
            p={3}
            rounded="lg"
            fontWeight="bold"
          >
            Dashboard
          </Link>
          <Link
            as={RouterLink}
            to="/my-skill" // Link tới trang Coming Soon
            p={3}
            rounded="lg"
            _hover={{ bg: 'gray.700' }}
          >
            My Skill (Hồ sơ)
          </Link>
          <Link
            as={RouterLink}
            to="/tests" // Link tới trang Coming Soon
            p={3}
            rounded="lg"
            _hover={{ bg: 'gray.700' }}
          >
            Làm Bài Test
          </Link>
          <Link
            as={RouterLink}
            to="/settings" // Link tới trang Coming Soon
            p={3}
            rounded="lg"
            _hover={{ bg: 'gray.700' }}
          >
            Cài đặt
          </Link>
        </Flex>
        <Button
          onClick={handleLogout}
          colorScheme="red"
          p={3}
          rounded="lg"
          fontWeight="bold"
        >
          Đăng xuất
        </Button>
      </Flex>

    
      <Flex as="main" flex={1} direction="column">
        <Box as="header" bg="gray.800" shadow="md" p={6}>
          <Heading as="h2" size="lg">Chào mừng trở lại!</Heading>
        </Box>
        <Box flex={1} p={8} overflowY="auto">
          <Heading as="h3" size="xl" mb={6}>Tổng quan</Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          </SimpleGrid>
        </Box>
        </Flex>
    </Flex>
  );
}