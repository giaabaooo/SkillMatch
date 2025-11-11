// File: frontend/src/pages/HomePage.jsx (Code bằng Chakra UI)
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Heading, Text, Button, Link, Container, SimpleGrid, Icon } from '@chakra-ui/react';
import { FiShield, FiCpu, FiBriefcase } from 'react-icons/fi';

export default function HomePage() {
  return (
    <Box bg="gray.900" color="white" minH="100vh">
      <Container maxW="container.xl">
        <Flex as="nav" py={4} justify="space-between" align="center">
          <Heading as="h1" size="lg">SkillMatch</Heading>
          <Flex display={{ base: 'none', md: 'flex' }} gap={6}>
    <Link as={RouterLink} to="/candidates" _hover={{ color: 'blue.300' }}>
      For Candidates
    </Link>
    <Link as={RouterLink} to="/employers" _hover={{ color: 'blue.300' }}>
      For Employers
    </Link>
    <Link as={RouterLink} to="/pricing" _hover={{ color: 'blue.300' }}>
      Pricing
    </Link>
  </Flex>
          <Flex gap={4}>
            <Button as={RouterLink} to="/login" variant="ghost" _hover={{ bg: 'gray.700' }}>
              Login
            </Button>
            <Button as={RouterLink} to="/register" colorScheme="blue">
              Sign Up
            </Button>
          </Flex>
        </Flex>
      </Container>
      <Container maxW="container.xl" py={32} textAlign="center">
        <Heading as="h1" size={{ base: '2xl', md: '3xl' }} mb={6}>
          Stop Guessing. Start Growing.
        </Heading>
        <Text fontSize={{ base: 'xl', md: '2xl' }} color="gray.400" maxW="3xl" mx="auto" mb={10}>
          Our AI-powered platform tests your skills, builds your personalized learning path, and connects you with top companies.
        </Text>
        <Button as={RouterLink} to="/register" colorScheme="blue" size="lg" px={10} py={7}>
          Get Started Free
        </Button>
      </Container>
      <Box bg="gray.800" py={24}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={12} textAlign="center">
            <Flex direction="column" align="center">
              <Icon as={FiShield} color="blue.400" boxSize={16} mb={4} />
              <Heading size="lg" mb={2}>Smart Assessments</Heading>
              <Text color="gray.400">AI-proctored tests to validate your skills.</Text>
            </Flex>
            <Flex direction="column" align="center">
              <Icon as={FiCpu} color="blue.400" boxSize={16} mb={4} />
              <Heading size="lg" mb={2}>AI-Powered Feedback</Heading>
              <Text color="gray.400">Get a detailed analysis of your strengths, weaknesses, and a custom learning path.</Text>
            </Flex>
            <Flex direction="column" align="center">
              <Icon as={FiBriefcase} color="blue.400" boxSize={16} mb={4} />
              <Heading size="lg" mb={2}>Direct Job Matching</Heading>
              <Text color="gray.400">Get matched with companies that need your verified skills.</Text>
            </Flex>
          </SimpleGrid>
        </Container>
      </Box>
      <Container maxW="container.xl" py={12} textAlign="center">
        <Box borderTop="1px" borderColor="gray.700" pt={8}>
          <Flex justify="center" gap={6} mb={4}>
            <Link>About Us</Link>
            <Link>Privacy Policy</Link>
            <Link>Terms of Service</Link>
          </Flex>
          <Text color="gray.500">&copy; 2025 SkillMatch. All rights reserved.</Text>
        </Box>
      </Container>
    </Box>
  );
}