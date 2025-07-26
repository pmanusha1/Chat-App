import React, { useState, useContext, useEffect } from 'react'
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Divider
} from '@mui/material'
import { store } from '../store'
import { Navigate } from 'react-router-dom'
import axios from 'axios'

const MyProfile = () => {
  const [token, setToken] = useContext(store)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [allmsg, setAllMsg] = useState([])
  const [newmsg, setNewMsg] = useState('')

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

  useEffect(() => {
    if (!token) return

    axios.get('http://localhost:8080/getmsg', {
      headers: { 'x-token': token }
    })
      .then(res => setAllMsg(res.data))
      .catch(err => console.log(err))
  }, [token])

  const send = async (e) => {
    e.preventDefault()

    try {
      await axios.post('http://localhost:8080/addmsg',
        { text: newmsg },
        { headers: { 'x-token': token } }
      )

      const res = await axios.get('http://localhost:8080/getmsg', {
        headers: { 'x-token': token }
      })

      setAllMsg(res.data)
      setNewMsg('')
    } catch (err) {
      console.log(err)
    }
  }

  if (!token) return <Navigate to='/login' />
  if (loading) return <Typography align="center" sx={{ mt: 5 }}>Loading profile...</Typography>

  return (
    <Container maxWidth="sm">
      {data && (
        <Paper elevation={4} sx={{ p: 4, mt: 5 }}>
          <Typography variant="h5" gutterBottom align="center">
            Welcome, {data.username}
          </Typography>

          <Card variant="outlined" sx={{ maxHeight: 300, overflowY: 'auto', mb: 2 }}>
            <CardContent>
              {allmsg.length > 0 ? (
                allmsg.map((message, idx) => (
                  <Box key={idx} sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="textSecondary">
                      {message.username}
                    </Typography>
                    <Typography variant="body1">{message.text}</Typography>
                    {message.date && (
                      <Typography variant="caption" color="textSecondary">
                        {new Date(message.date).toLocaleString()}
                      </Typography>
                    )}
                    {idx < allmsg.length - 1 && <Divider sx={{ my: 1 }} />}
                  </Box>
                ))
              ) : (
                <Typography>No messages yet.</Typography>
              )}
            </CardContent>
          </Card>

          <Box
            component="form"
            onSubmit={send}
            sx={{ display: 'flex', gap: 2, mb: 2 }}
          >
            <TextField
              fullWidth
              size="small"
              label="Type your message"
              variant="outlined"
              value={newmsg}
              onChange={(e) => setNewMsg(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary">
              Send
            </Button>
          </Box>

          <Button
            fullWidth
            variant="outlined"
            color="error"
            onClick={() => setToken(null)}
          >
            Logout
          </Button>
        </Paper>
      )}
    </Container>
  )
}

export default MyProfile
