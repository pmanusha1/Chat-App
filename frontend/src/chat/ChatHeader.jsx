import { Avatar, Box, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const ChatHeader = ({ selectedUser }) => {
  if (!selectedUser) return null;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 2,
        borderBottom: "1px solid #ccc",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar />
        <Box>
          <Typography>{selectedUser.username}</Typography>
        </Box>
      </Box>
      <InfoOutlinedIcon />
    </Box>
  );
};

export default ChatHeader;
