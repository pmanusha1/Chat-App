import React, { useState, useContext } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Container
} from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { store } from '../store';

const Login = () => {
  const [token, setToken] = useContext(store)
  const navigate = useNavigate()

  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const changeHandler = (e) => {
    setData({...data, [e.target.name]: e.target.value})
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const res = await axios.post('http://localhost:8080/login', data)
    setToken(res.data.token)
  }

  if(token) {
    return <Navigate to='/myprofile' />
  }

  return (
    <Container maxWidth="sm">
      <Paper sx={{ bgcolor: '#57B9FF', height: '100%' }}>
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            <svg
              viewBox="0 0 256 256"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMinYMin meet"
              width="50"
              height="50"
            >
              <circle
                cx="128"
                cy="128"
                r="114"
                stroke="#FFF"
                strokeWidth="20"
                fill="none"
              />
              <path
                d="M97.637 121.69c27.327-22.326 54.058-45.426 81.98-67.097-14.646 22.505-29.708 44.711-44.354 67.215-12.562.06-25.123.06-37.626-.119zM120.737 134.132c12.621 0 25.183 0 37.745.179-27.505 22.206-54.117 45.484-82.099 67.096 14.646-22.505 29.708-44.77 44.354-67.275z"
                fill="#FFF"
              />
            </svg>

            <svg
              width="50"
              height="50"
              viewBox="-10.5 -9.45 21 18.9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="0" cy="0" r="2" fill="currentColor"></circle>
              <g stroke="currentColor" strokeWidth="1" fill="none">
                <ellipse rx="10" ry="4.5"></ellipse>
                <ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse>
                <ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse>
              </g>
            </svg>
          </Box>
        </Box>
        <Typography variant="h4" component="h1" align="center" sx={{fontWeight: '500', textTransform: "uppercase"}} gutterBottom>
          Chat App
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" paragraph>
          Connect instantly with friends and colleagues in a fast, responsive chat experience.
          Enjoy real-time messaging powered by modern web technologies.
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" component="h2" align="center" sx={{fontWeight: '500', textTransform: "uppercase"}} gutterBottom>
          Login
        </Typography>

        <Box component="form" onSubmit={submitHandler} autoComplete='off'>
          <TextField
            label="Email"
            name='email'
            value={data.email}
            onChange={changeHandler}
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />

          <TextField
            label="Password"
            name='password'
            value={data.password}
            onChange={changeHandler}
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3, mb: 2, bgcolor: "#57B9FF" }}
          >
            LOGIN
          </Button>
          <Button>Forgot password</Button>
          <Typography variant="body2">
            Don't have an account{" "}
            <Button onClick={() => navigate('/register')}>
              Create Account
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;