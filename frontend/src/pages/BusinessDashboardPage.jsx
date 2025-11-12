// File: frontend/src/pages/BusinessDashboardIndexPage.jsx
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box, Flex, Heading, Text, Button, Link,
  Table, Thead, Tbody, Tr, Th, Td, TableContainer,
  Badge,
  SimpleGrid
} from '@chakra-ui/react';

export default function BusinessDashboardIndexPage() {
  // Dữ liệu giả (dummy data)
  const assessments = [
    { name: 'Nguyễn Văn A', test: 'Junior Marketer Test', score: '85%', status: 'OK' },
    { name: 'Trần Thị B', test: 'Junior Marketer Test', score: '92%', status: 'OK' },
    { name: 'Lê Văn C', test: 'Junior Marketer Test', score: '71%', status: 'Flagged' },
  ];

  return (
    <>
      {/* --- Header (Giờ nằm riêng) --- */}
      <Box as="header" bg="white" shadow="sm" p={6}>
        <Flex justify="space-between" align="center">
          <Heading as="h2" size="lg">
            Welcome, [Company Name]!
          </Heading>
          {/* Nút này sẽ trỏ đến trang "Create" mới */}
          <Button as={RouterLink} to="/business/tests/new" colorScheme="blue" size="md">
            Create New Test
          </Button>
        </Flex>
      </Box>

      {/* --- Main Content (Chỉ nội dung) --- */}
      <Box p={8}>
        {/* --- PROMPT: "3-column grid of large statistic cards" --- */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
          <Box bg="white" p={6} rounded="lg" shadow="md">
            <Text fontSize="md" fontWeight="semibold" color="gray.500">Active Assessments</Text>
            <Text fontSize="4xl" fontWeight="bold" mt={2} color="blue.600">8</Text>
          </Box>
          <Box bg="white" p={6} rounded="lg" shadow="md">
            <Text fontSize="md" fontWeight="semibold" color="gray.500">Total Candidates</Text>
            <Text fontSize="4xl" fontWeight="bold" mt={2}>256</Text>
          </Box>
          <Box bg="white" p={6} rounded="lg" shadow="md">
            <Text fontSize="md" fontWeight="semibold" color="gray.500">Candidates Flagged</Text>
            <Text fontSize="4xl" fontWeight="bold" mt={2} color="red.500">14</Text>
          </Box>
        </SimpleGrid>

        {/* --- PROMPT: "a large data grid (table)" --- */}
        <Heading as="h3" size="lg" mb={4}>
          Recently Completed Assessments
        </Heading>
        <TableContainer bg="white" rounded="lg" shadow="md">
          <Table variant="simple">
            <Thead bg="gray.50">
              <Tr>
                <Th>Candidate Name</Th>
                <Th>Test Name</Th>
                <Th>Score</Th>
                <Th>Anti-Cheat Status</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {assessments.map((item, index) => (
                <Tr key={index} _hover={{ bg: 'gray.50' }}>
                  <Td>{item.name}</Td>
                  <Td>{item.test}</Td>
                  <Td fontWeight="bold">{item.score}</Td>
                  <Td>
                    <Badge colorScheme={item.status === 'OK' ? 'green' : 'red'}>
                      {item.status}
                    </Badge>
                  </Td>
                  <Td>
                    <Button as={RouterLink} to={`/business/candidates/view`} variant="link" colorScheme="blue">
                      View Report
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}