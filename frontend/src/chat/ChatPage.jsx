import React from 'react';
import {
  Box
} from '@mui/material';
import SideBar from './SideBar';
import ChatArea from './ChatArea';

const ChatPage = () => {

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <SideBar />
      <ChatArea />
    </Box>
  );
};

export default ChatPage;
