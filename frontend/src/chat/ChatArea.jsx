import { Box, Typography, Paper } from "@mui/material";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../store";
import { jwtDecode } from 'jwt-decode'

const ChatArea = ({ selectedUser }) => {
  const [token] = useContext(StoreContext);
  const [messages, setMessages] = useState([]);
  const decoded = jwtDecode(token);
  const user = { _id: decoded.user.id };

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser) return;
      try {
        const res = await axios.get(`http://localhost:8080/getmsg/${selectedUser._id}`, {
          headers: {
            'x-token': token,
          },
        });
        setMessages(res.data);
      } catch (err) {
        console.error("Error fetching messages", err);
      }
    };

    fetchMessages();
  }, [selectedUser]);

  const handleSend = async (text) => {
    if (!selectedUser) return;
    try {
      const response = await axios.post(
        "http://localhost:8080/addmsg",
        {
          receiverId: selectedUser._id,
          text,
        },
        {
          headers: {
            "x-token": token,
          },
        }
      );
      setMessages((prev) => [...prev, response.data]);

    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  if (!selectedUser || !user) {
    return (
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#666",
          fontSize: 18,
        }}
      >
        Please select a user to start chatting.
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", height: "100vh" }}>
      <ChatHeader selectedUser={selectedUser} />
      <Box sx={{ flexGrow: 1, p: 2, overflowY: "auto" }}>
        {messages.map((msg, index) => {
          const senderId = typeof msg.sender === "object" ? msg.sender._id : msg.sender;
          const isOwnMessage = senderId === user?._id;

          console.log("senderId", senderId, "user._id", user._id);

          return (
            <Box
              key={index}
              display="flex"
              justifyContent={isOwnMessage ? "flex-end" : "flex-start"}
              mb={1}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  backgroundColor: isOwnMessage ? "#1976d2" : "#f0f0f0",
                  color: isOwnMessage ? "white" : "black",
                  maxWidth: "70%",
                }}
              >
                <Typography variant="body1">{msg.text}</Typography>
                <Typography
                  variant="caption"
                  display="block"
                  textAlign="right"
                  sx={{ mt: 0.5 }}
                >
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
              </Paper>
            </Box>

          );
        })}
      </Box>
      <MessageInput onSend={handleSend} />
    </Box>
  );
};

export default ChatArea;
