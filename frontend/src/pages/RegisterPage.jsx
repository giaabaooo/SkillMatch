// File: frontend/src/pages/RegisterPage.jsx (Code bằng Chakra UI)
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Flex, Heading, Text, Button, Link, FormControl, FormLabel, Input, Alert, AlertIcon } from '@chakra-ui/react';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // DÙNG BIẾN MÔI TRƯỜNG CỦA CRA
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    try {
      const response = await fetch(`${apiBaseUrl}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Đăng ký thất bại');
      }
      setLoading(false);
      navigate('/login');
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <Flex minH="100vh" bg="gray.900" color="white" align="center" justify="center">
      <Box bg="gray.800" p={8} rounded="lg" shadow="lg" w="full" maxW="md">
        <Heading as="h2" size="xl" textAlign="center" mb={6}>
          Đăng ký SkillMatch
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl isRequired mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              bg="gray.700"
              border="none"
              _focus={{ ring: '2px', ringColor: 'blue.500' }}
            />
          </FormControl>
          <FormControl isRequired mb={6}>
            <FormLabel>Mật khẩu (tối thiểu 6 ký tự)</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              bg="gray.700"
              border="none"
              _focus={{ ring: '2px', ringColor: 'blue.500' }}
              minLength={6}
            />
          </FormControl>
          
          {error && (
            <Alert status="error" mb={4} rounded="md">
              <AlertIcon />
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            colorScheme="blue"
            w="full"
            py={6}
            isLoading={loading}
          >
            {loading ? 'Đang xử lý...' : 'Đăng ký'}
          </Button>
        </form>
        <Text textAlign="center" color="gray.400" mt={6}>
          Đã có tài khoản?{' '}
          <Link as={RouterLink} to="/login" color="blue.400" fontWeight="bold">
            Đăng nhập ngay
          </Link>
        </Text>
      </Box>
    </Flex>
  );
}