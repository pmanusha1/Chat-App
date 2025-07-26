import { Box, IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim()) {
      onSend(text.trim());
      setText("");
    }
  };

  return (
    <Box sx={{ p: 1, display: "flex", alignItems: "center", gap: 1, bgcolor: "#fff" }}>
      <TextField
        fullWidth
        size="small"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
      />
      <IconButton onClick={handleSubmit} color="primary">
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default MessageInput;
