import React, { useState } from 'react';
import { Box, IconButton, InputBase, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };

  return (
    <Paper component="form" onSubmit={(e) => e.preventDefault()} sx={{ display: 'flex', p: 1 }}>
      <InputBase
        fullWidth
        placeholder="Type a message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{ ml: 1 }}
      />
      <IconButton color="primary" onClick={handleSend}>
        <SendIcon />
      </IconButton>
    </Paper>
  );
};

export default MessageInput;
