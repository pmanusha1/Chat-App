import { useEffect, useState, useContext, useRef } from "react";
import { Box, Typography, Paper } from "@mui/material";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import axios from "axios";
import { StoreContext } from "../store";
import { jwtDecode } from 'jwt-decode';
import { io } from "socket.io-client";

const socket = io("http://localhost:8080");

const ChatArea = ({ selectedUser }) => {
  const [token] = useContext(StoreContext);
  const decoded = jwtDecode(token);
  const user = { _id: decoded.user.id };
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef();

  useEffect(() => {
    if (user?._id) {
      socket.emit("join", user._id);
    }
  }, [user?._id]);

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

  useEffect(() => {
    const handleReceive = (msg) => {
      const isInCurrentChat =
        (msg.sender === user._id && msg.receiver === selectedUser._id) ||
        (msg.sender === selectedUser._id && msg.receiver === user._id);
  
      if (isInCurrentChat) {
        setMessages((prev) => [...prev, msg]);
      }
    };
  
    socket.on("receive-message", handleReceive);
    return () => socket.off("receive-message", handleReceive);
  }, [user?._id, selectedUser?._id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text) => {
    if (text.trim() === "") return;

    try {
      await axios.post("http://localhost:8080/addmsg", {
        receiverId: selectedUser._id,
        text,
      }, {
        headers: { "x-token": token },
      });
    } catch (err) {
      console.error("Send message error:", err);
    }
  };

  if (!user || !selectedUser) {
    return <Box sx={{ p: 2 }}>Loading...</Box>;
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
        <div ref={messagesEndRef} />
      </Box>
      <MessageInput onSend={handleSend} />
    </Box>
  );
};

export default ChatArea;