// File: frontend/src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Flex, Heading, Text, Button, Link, FormControl, FormLabel, Input, Alert, AlertIcon } from '@chakra-ui/react';
import { jwtDecode } from 'jwt-decode';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    try {
      const response = await fetch(`${apiBaseUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Đăng nhập thất bại');
      }

      localStorage.setItem('skillmatch_token', data.token);

      // 2. "ĐỌC" VÉ
      const decodedToken = jwtDecode(data.token);
      const userRole = decodedToken.user.role; // Đọc vai trò (role)

      setLoading(false);

      // 3. Phân luồng
      if (userRole === 'business') {
        navigate('/business/dashboard'); // Về nhà Doanh nghiệp
      } else {
        navigate('/dashboard'); // Về nhà Ứng viên
      }
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <Flex minH="100vh" bg="gray.900" color="white" align="center" justify="center">
      <Box bg="gray.800" p={8} rounded="lg" shadow="lg" w="full" maxW="md">
        <Heading as="h2" size="xl" textAlign="center" mb={6}>
          Đăng nhập
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl isRequired mb={4}>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} bg="gray.700" border="none" _focus={{ ring: '2px', ringColor: 'blue.500' }} />
          </FormControl>
          <FormControl isRequired mb={6}>
            <FormLabel>Mật khẩu</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} bg="gray.700" border="none" _focus={{ ring: '2px', ringColor: 'blue.500' }} />
          </FormControl>
          {error && (
            <Alert status="error" mb={4} rounded="md">
              <AlertIcon />
              {error}
            </Alert>
          )}
          <Button type="submit" colorScheme="blue" w="full" py={6} isLoading={loading}>
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </Button>
        </form>
        <Text textAlign="center" color="gray.400" mt={6}>
          Chưa có tài khoản?{' '}
          <Link as={RouterLink} to="/register-select" color="blue.400" fontWeight="bold">
            Tạo tài khoản
          </Link>
        </Text>
      </Box>
    </Flex>
  );
}