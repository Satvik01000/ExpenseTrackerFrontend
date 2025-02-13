import React, { useEffect, useState } from "react";
import { Box, List, ListItem, Avatar, Typography, Button, Divider } from "@mui/material";
import LogoutButton from "../Auth/LogoutButton";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import BaseUrl from "../../util/BaseUrl";

const SideBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [name, setName] = useState("Name");

    useEffect(() => {
        const handleGetName = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const decodedToken = jwtDecode(token);
                const username = decodedToken.sub;

                const nameResponse = await axios.get(`${BaseUrl}/user/name/${username}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setName(nameResponse.data);
            } catch (error) {
                console.error("Error fetching name:", error);
            }
        };

        handleGetName();
    }, []);

    const menuItems = [
        { label: "Home", path: "/homepage" },
        { label: "Monthly Analysis", path: "/monthly-analysis" },
        { label: "Settings", path: "/settings" },
    ];

    return (
        <Box
            sx={{
                width: "20vw",
                height: "100vh",
                background: "linear-gradient(180deg, #121212, #1e1e1e)", // Darker gradient to match homepage
                color: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: 3,
                boxShadow: "4px 0px 10px rgba(0, 0, 0, 0.3)",
            }}
        >
            <Avatar sx={{ width: 90, height: 90, bgcolor: "#2C2F33", mb: 2, fontSize: 28 }}>P</Avatar>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3, color: "white" }}>
                {name}
            </Typography>

            <List sx={{ width: "100%" }}>
                {menuItems.map((item) => (
                    <ListItem key={item.path} disablePadding>
                        <Button
                            variant="text"
                            sx={{
                                width: "100%",
                                height: 50,
                                color: location.pathname === item.path ? "black" : "#B0BEC5",
                                backgroundColor: location.pathname === item.path ? "rgba(255,145,0,0.94)" : "transparent",
                                borderRadius: 3,
                                fontSize: 16,
                                textTransform: "none",
                                fontWeight: location.pathname === item.path ? "bold" : "normal",
                                "&:hover": {
                                    backgroundColor: "rgba(255,145,0,0.94)",
                                    color: "white",
                                },
                                transition: "0.3s ease",
                            }}
                            onClick={() => navigate(item.path)}
                        >
                            {item.label}
                        </Button>
                    </ListItem>
                ))}
            </List>

            <Divider sx={{ width: "80%", marginY: 2, bgcolor: "#505050" }} />

            <Box sx={{ marginTop: "auto", width: "100%", paddingBottom: 3 }}>
                <ListItem>
                    <LogoutButton/>
                </ListItem>
            </Box>
        </Box>
    );
};

export default SideBar;