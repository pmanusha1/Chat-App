import React, { useState } from 'react';
import { Box, Typography, InputBase, List, ListItem, Avatar, Divider } from '@mui/material';
import AvatarMenu from '../Profile/AvatarMenu';

const Sidebar = ({ users, onSelectUser, onSearch, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');

  console.log(users);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <Box width={300} p={2} borderRight="1px solid #ccc" display="flex" flexDirection="column">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">ChatApp</Typography>
        <AvatarMenu onLogout={onLogout} />
      </Box>

      <InputBase
        placeholder="Search users"
        value={searchTerm}
        onChange={handleChange}
        sx={{ mb: 2, p: 1, border: '1px solid #ccc', borderRadius: 1 }}
        fullWidth
      />

      <Divider />

      <List>
        {(Array.isArray(users) ? users : []).map((user) => (
          <ListItem key={user._id} button onClick={() => onSelectUser(user)}>
            <Avatar src={user.avatarUrl} sx={{ mr: 2 }} />
            <Typography>{user.username}</Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
