import React from 'react'
import { Box, Typography, Avatar } from '@mui/material'

const SideBar = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Box sx={{ width: 250, bgcolor: '#0A0F2C', color: 'white', p: 2 }}>
        <Typography variant="h6" mb={2}>Chatapp</Typography>
        <Box>
          <Avatar sx={{ width: 40, height: 40, mb: 1 }} />
          <Typography variant="body2">username</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default SideBar