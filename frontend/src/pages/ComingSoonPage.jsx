// File: frontend/src/pages/ComingSoonPage.jsx
import React from 'react';
import { Box, Flex, Heading, Text, Button, Icon } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FiTool } from 'react-icons/fi';

export default function ComingSoonPage() {
  return (
    <Flex
      minH="100vh"
      bg="gray.900"
      color="white"
      align="center"
      justify="center"
      direction="column"
    >
      <Icon as={FiTool} boxSize={20} color="blue.400" mb={6} />
      <Heading as="h1" size="2xl" mb={4}>
        Tính năng Đang Phát triển
      </Heading>
      <Text fontSize="lg" color="gray.400" mb={8}>
        Chúng tôi đang làm việc chăm chỉ để mang tính năng này đến với bạn!
      </Text>
      <Button
        as={RouterLink}
        to="/dashboard" // Nút quay về Dashboard
        colorScheme="blue"
        size="lg"
      >
        Quay về Dashboard
      </Button>
    </Flex>
  );
}