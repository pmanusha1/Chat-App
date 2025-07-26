import React, { useState, useRef, useEffect } from 'react'
import { Box, Paper, Typography, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ChatArea = ({ username }) => {
    const [ws, setWs] = useState(null);
    const [msg, setMsg] = useState('');
    const [chat, setChat] = useState([]);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');
        socket.onopen = () => {
            socket.send(JSON.stringify({ type: 'register', username }));
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'chat') {
                setChat(prev => [...prev, data]);
            }
        };

        setWs(socket);
        return () => socket.close();
    }, [username]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chat]);

    const sendMessage = () => {
        if (ws && msg.trim()) {
            ws.send(JSON.stringify({ type: 'chat', text: msg }));
            setMsg('');
        }
    };
    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <Box sx={{ flex: 1, p: 2, bgcolor: '#F3F5FA', display: 'flex', flexDirection: 'column' }}>
                <Paper sx={{ flex: 1, p: 2, overflowY: 'auto' }}>
                    {chat.map((c, idx) => (
                        <Box key={idx} mb={2}>
                            <Typography variant="subtitle2">{c.username}</Typography>
                            <Typography variant="body1">{c.text}</Typography>
                            <Typography variant="caption" color="textSecondary">
                                {new Date(c.timestamp).toLocaleTimeString()}
                            </Typography>
                        </Box>
                    ))}
                    <div ref={messagesEndRef} />
                </Paper>

                <Box sx={{ mt: 1, display: 'flex' }}>
                    <TextField
                        fullWidth
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        label="Type a message"
                    />
                    <IconButton onClick={sendMessage} color="primary">
                        <SendIcon />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    )
}

export default ChatArea