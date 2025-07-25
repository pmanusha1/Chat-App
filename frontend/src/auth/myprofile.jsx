import React, { useState, useContext, useEffect } from 'react'
import { Container, Paper, Typography, Box } from '@mui/material'
import { store } from '../store'
import { Navigate } from 'react-router-dom'
import axios from 'axios'

const MyProfile = () => {
  const [token] = useContext(store)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) return

    axios.get('http://localhost:8080/myprofile', {
      headers: { 'x-token': token }
    })
      .then(res => {
        setData(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }, [token])

  if (!token) return <Navigate to='/login' />
  if (loading) return <Typography align="center" sx={{ mt: 5 }}>Loading profile...</Typography>

  return (
    <Container maxWidth="sm">
      {data && (
        <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
          <Box textAlign="center">
            <Typography variant="h4" gutterBottom>
              Dashboard
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Welcome, {data.username}
            </Typography>
            <Typography variant="body1">
              Email: {data.email}
            </Typography>
          </Box>
        </Paper>
      )}
    </Container>
  )
}

export default MyProfile
