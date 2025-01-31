import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Box, Card, Typography } from "@mui/material";
import axios from "axios";

const Homepage = () => {
    const navigate = useNavigate();

    React.useEffect(() => {
        const validateToken = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/");
                    return;
                }

                const response = await axios.post(
                    "http://localhost:8080/user/validate-token",
                    {}, // No body needed
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                if (!response.data) {
                    throw new Error("Invalid Token");
                }
            } catch (error) {
                console.error("Token validation failed:", error);
                localStorage.removeItem("token");
                navigate("/");
            }
        };

        validateToken();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token"); // Clear token
        navigate("/"); // Redirect to log-in
    };

    return (
        <Container sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Box sx={{
                backgroundColor: "black",
                width: "90%",
                height: "90%",
                marginLeft: "12%",
                borderRadius: 5,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                flexDirection: "column"
            }}>
                <Card raised elevation={10} variant="outlined" sx={{ backgroundColor: "#1e1e1e", color: "white", width: "95%", mt: 5, height: "60%" }}>
                    <Typography sx={{ ml: 3, mt: 1, fontSize: 20, fontFamily: "Inter" }}>Recent Expenses</Typography>
                    <hr style={{ width: "98%", display: "flex", alignSelf: "center", justifySelf: "center" }}></hr>
                    <Button variant="contained" sx={{ mt: 3, backgroundColor: "#d32f2f" }} onClick={handleLogout}>
                        Logout
                    </Button>
                </Card>
            </Box>
        </Container>
    );
};

export default Homepage;
