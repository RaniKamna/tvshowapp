import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Snackbar } from "@mui/material";

export const Loginpage = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    let navigate = useNavigate();

    const validatePassword = (password) => {
        const regex = /^[a-zA-Z0-9]{8,16}$/;
        return regex.test(password);
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (!validatePassword(credentials.password)) {
                setError("Password must be 8 to 16 alphanumeric characters");
                setOpenSnackbar(true);
                return;
            }
            const authToken = localStorage.getItem("authToken");
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${authToken}`
                },
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password,
                }),
            });

            const json = await response.json();

            if (!json.success) {
                setError("Invalid email or password");
                setOpenSnackbar(true);
            }
            if (json.success) {
                localStorage.setItem("userEmail", credentials.email);
                localStorage.setItem("authToken", json.authToken);
                navigate("/search");
            }

        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };
    return (
        <div>
            <form className="formcontainer" onSubmit={handleSubmit}>
                <h2 className="loginheader">Login</h2>
                <TextField
                    label="Email"
                    type="email"
                    value={credentials.email}
                    name="email"
                    onChange={handleChange}
                    fullWidth
                    required
                    sx={{ p: "2px 4px", alignItems: "center", width: 600 }}
                />
                <TextField
                    label="Password"
                    type="password"
                    value={credentials.password}
                    name="password"
                    onChange={handleChange}
                    fullWidth
                    required
                    sx={{ p: "2px 4px", alignItems: "center", width: 600 }}
                />
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ m: "10px" }}
                        type="submit">
                        Login
                    </Button>
                </div>
            </form>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={error}
            />
        </div>
    );
};
