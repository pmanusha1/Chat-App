import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Sidebar from '../components/Sidebar/Sidebar';
import ChatWindow from '../components/Chat/ChatWindow';
import { getAllUsers, getMessages } from '../services/api';
import { socket } from '../services/socket';

const ChatPage = ({ currentUser }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!currentUser) return;
  
    socket.connect();
    socket.emit('join', currentUser._id);
  
    socket.on('receive_message', (message) => {
      if (message.from === selectedUser?._id) {
        setMessages((prev) => [...prev, { ...message, fromSelf: false }]);
      }
    });
  
    return () => socket.disconnect();
  }, [currentUser, selectedUser]);
  

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getAllUsers();
      setUsers(users);
    };
    fetchUsers();
  }, []);
  

  const handleSearch = async (query) => {
    let data = [];
    if (query) {
      data = await searchUsers(query);
    } else {
      data = await getAllUsers();
    }
    setUsers(data);
  };  

  const handleSendMessage = (text) => {
    if (!currentUser || !selectedUser) {
      console.warn('Missing user information. Cannot send message.');
      return;
    }
  
    const message = {
      from: currentUser._id,
      to: selectedUser._id,
      content: text,
    };
  
    socket.emit('send_message', message);
    setMessages((prev) => [...prev, { ...message, fromSelf: true }]);
  };
  
  const handleSelectUser = async (user) => {
    setSelectedUser(user);
    const history = await getMessages(currentUser._id, user._id);
    const formatted = history.map(msg => ({
      ...msg,
      fromSelf: msg.from === currentUser._id
    }));
    setMessages(formatted);
  };

  return (
    <Box display="flex" height="100vh">
      <Sidebar
        users={users}
        onSearch={handleSearch}
        onSelectUser={handleSelectUser}
        onLogout={() => window.location.href = '/login'} 
      />
      <ChatWindow selectedUser={selectedUser} messages={messages} onSendMessage={handleSendMessage} />
    </Box>
  );
};

export default ChatPage;
