import { Box } from "@mui/material";
import SideBar from "./SideBar";
import ChatArea from "./ChatArea";
import { useState } from "react";

const ChatPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden", }}>
      <SideBar onSelectUser={setSelectedUser} />
      <ChatArea selectedUser={selectedUser} />
    </Box>
  );
};

export default ChatPage;
