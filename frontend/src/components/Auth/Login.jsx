import React, { useState } from 'react';
import { Box, Button, Typography, Link } from '@mui/material';
import { loginUser } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import StyledInput from './StyledInput';

export default function Login({ setCurrentUser }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await loginUser(form);
      setCurrentUser(res.data.user);
      navigate('/chat');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 400, mx: 'auto', bgcolor: '#f9f9f9', borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>Login</Typography>

      <StyledInput
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <StyledInput
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <Button variant="contained" fullWidth onClick={handleSubmit}>Login</Button>

      <Typography variant="body2" mt={2}>
        New user? <Link onClick={() => navigate('/register')} sx={{ cursor: 'pointer' }}>Register</Link>
      </Typography>
    </Box>
  );
}
