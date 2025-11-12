// File: frontend/src/pages/RegisterBusinessPage.jsx
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Flex, Heading, Text, Button, Link, FormControl, FormLabel, Input, Alert, AlertIcon } from '@chakra-ui/react';

export default function RegisterBusinessPage() {
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
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
      // TẠM THỜI: Chúng ta chưa code API này, nên sẽ báo lỗi (nhưng không crash app)
      // const response = await fetch(`${apiBaseUrl}/api/auth/register-business`, { ... });

      // Giả lập lỗi "Coming Soon"
      const response = await fetch(`${apiBaseUrl}/api/auth/register-business`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Gửi cả 3 trường
        body: JSON.stringify({ fullName, email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Đăng ký thất bại');
      }

      // Đăng ký thành công -> Lưu token và vào Dashboard
      localStorage.setItem('skillmatch_token', data.token);
      setLoading(false);
      navigate('/dashboard');

    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <Flex minH="100vh" bg="gray.900" color="white" align="center" justify="center">
      <Box bg="gray.800" p={8} rounded="lg" shadow="lg" w="full" maxW="md">
        <Heading as="h2" size="xl" textAlign="center" mb={6}>
          Đăng ký (Doanh nghiệp)
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl isRequired mb={4}>
            <FormLabel>Tên Công ty</FormLabel>
            <Input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} bg="gray.700" border="none" _focus={{ ring: '2px', ringColor: 'blue.500' }} />
          </FormControl>
          <FormControl isRequired mb={4}>
            <FormLabel>Họ và Tên</FormLabel>
            <Input
              type="text"
              value={fullName} // <-- Thêm State
              onChange={(e) => setFullName(e.target.value)} // <-- Thêm State
              bg="gray.700" border="none" _focus={{ ring: '2px', ringColor: 'blue.500' }}
            />
          </FormControl>
          
            <FormControl isRequired mb={4}>
              <FormLabel>Email Công việc</FormLabel>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} bg="gray.700" border="none" _focus={{ ring: '2px', ringColor: 'blue.500' }} />
            </FormControl>
            
            <FormControl isRequired mb={6}>
              <FormLabel>Mật khẩu</FormLabel>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} bg="gray.700" border="none" _focus={{ ring: '2px', ringColor: 'blue.500' }} minLength={6} />
            </FormControl>
            {error && (
              <Alert status="error" mb={4} rounded="md">
                <AlertIcon />
                {error}
              </Alert>
            )}
            <Button type="submit" colorScheme="blue" w="full" py={6} isLoading={loading}>
              Tạo tài khoản Doanh nghiệp
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