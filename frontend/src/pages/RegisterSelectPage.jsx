// File: frontend/src/pages/RegisterSelectPage.jsx
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Heading, Text, Link, SimpleGrid, Icon } from '@chakra-ui/react';
import { FiUser, FiBriefcase } from 'react-icons/fi';

export default function RegisterSelectPage() {
  return (
    <Flex
      minH="100vh"
      bg="gray.900"
      color="white"
      align="center"
      justify="center"
      direction="column"
      p={4}
    >
      <Heading as="h1" size="2xl" mb={4} textAlign="center">
        Tham gia SkillMatch với tư cách...
      </Heading>
      <Text fontSize="lg" color="gray.400" mb={12} textAlign="center">
        Chọn loại tài khoản bạn muốn tạo.
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} maxW="4xl" w="full">
        <Flex
          as={RouterLink}
          to="/register"
          direction="column"
          align="center"
          justify="center"
          bg="gray.800"
          p={10}
          rounded="lg"
          shadow="lg"
          border="2px"
          borderColor="transparent"
          _hover={{ borderColor: 'blue.500', transform: 'scale(1.02)' }}
          transition="all 0.2s ease-in-out"
        >
          <Icon as={FiUser} boxSize={16} color="blue.400" mb={6} />
          <Heading as="h2" size="lg" mb={2}>
            Ứng viên
          </Heading>
          <Text color="gray.400" textAlign="center">
            Tôi muốn làm bài test, xây dựng hồ sơ kỹ năng và tìm cơ hội việc làm.
          </Text>
        </Flex>
        <Flex
          as={RouterLink}
          to="/register-business"
          direction="column"
          align="center"
          justify="center"
          bg="gray.800"
          p={10}
          rounded="lg"
          shadow="lg"
          border="2px"
          borderColor="transparent"
          _hover={{ borderColor: 'blue.500', transform: 'scale(1.02)' }}
          transition="all 0.2s ease-in-out"
        >
          <Icon as={FiBriefcase} boxSize={16} color="blue.400" mb={6} />
          <Heading as="h2" size="lg" mb={2}>
            Doanh nghiệp
          </Heading>
          <Text color="gray.400" textAlign="center">
            Tôi muốn đăng bài test, sàng lọc ứng viên và tuyển dụng nhân sự.
          </Text>
        </Flex>
      </SimpleGrid>
    </Flex>
  );
}