import React from 'react';
import { Box, Typography } from '@mui/material';
import MessageInput from './MessageInput';

const ChatWindow = ({ selectedUser, messages, onSendMessage }) => {
  if (!selectedUser) {
    return (
      <Box flex={1} display="flex" alignItems="center" justifyContent="center">
        <Typography variant="h6">Select a user to start chatting</Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" flex={1}>
      <Box flex={1} p={2} sx={{ overflowY: 'auto' }}>
        {messages.map((msg, index) => (
          <Box key={index} mb={1} textAlign={msg.fromSelf ? 'right' : 'left'}>
            <Typography variant="body2" color="textSecondary">
              {msg.content}
            </Typography>
          </Box>
        ))}
      </Box>
      <MessageInput onSend={onSendMessage} />
    </Box>
  );
};

export default ChatWindow;
