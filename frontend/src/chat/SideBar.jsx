import { useState, useContext, useEffect } from "react";
import {
    Box, Typography, InputBase, Avatar, Stack, IconButton
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from '@mui/icons-material/Logout';
import { StoreContext } from '../store';
import { Navigate } from "react-router-dom";
import axios from "axios";

const SideBar = ({ onSelectUser }) => {
    const [users, setUsers] = useState([]);
    const [token, setToken] = useContext(StoreContext);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        if (!token) return;

        const fetchUsers = async () => {
            try {
                const res = await axios.get('http://localhost:8080/users', {
                    headers: {
                        'x-token': token,
                    },
                });
                setUsers(res.data);
            } catch (err) {
                console.error("Failed to fetch users", err);
            }
        };

        fetchUsers();
    }, [token]);

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem("token");
    };

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return (
        <Box
            sx={{
                width: 300,
                display: "flex",
                flexDirection: "column",
                bgcolor: "#042a78",
                color: "#fff",
                height: "100vh",
                overflow: "hidden",
            }}
        >
            <Box sx={{ p: 2, width: 270 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        ChatApp
                    </Typography>
                    <IconButton sx={{ color: "white" }} onClick={handleLogout}>
                        <LogoutIcon />
                    </IconButton>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        bgcolor: "#132347",
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                    }}
                >
                    <SearchIcon />
                    <InputBase
                        placeholder="Search here.."
                        sx={{ ml: 1, color: "#fff" }}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </Box>
            </Box>

            <Box
                sx={{
                    flexGrow: 1,
                    overflowY: "auto",
                    px: 2,
                    minHeight: 0,
                }}
            >
                <Stack spacing={2} sx={{ py: 2, pb: 6 }}>
                    {users.filter((user) =>
                        user.username.toLowerCase().includes(searchText.toLowerCase())
                    ).length === 0 ? (
                        <Typography sx={{ color: "#ccc", textAlign: "center", mt: 4 }}>
                            No users found
                        </Typography>
                    ) : (
                        users
                            .filter((user) =>
                                user.username.toLowerCase().includes(searchText.toLowerCase())
                            )
                            .map((user, idx) => (
                                <Box
                                    key={idx}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 2,
                                        cursor: "pointer",
                                        "&:hover": { bgcolor: "#1c3c76", borderRadius: 2, p: 1 },
                                    }}
                                    onClick={() => onSelectUser(user)}
                                >
                                    <Avatar />
                                    <Box>
                                        <Typography>{user.username}</Typography>
                                    </Box>
                                </Box>
                            ))
                    )}
                </Stack>

            </Box>

        </Box>
    );
};

export default SideBar;
