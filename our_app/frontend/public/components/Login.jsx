import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, Paper, Box } from "@mui/material";

function Login({ navigateToPage }) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Check if user is already logged in
    axios
      .get("http://localhost:8000/userInfo", { withCredentials: true })
      .then(() => {
        navigateToPage("guest");
      })
      .catch(() => {
        console.log("User not logged in");
      });
  }, [navigateToPage]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("trying to log in with ", identifier, " and ", password);
      await axios.post(
        "http://localhost:8000/login",
        { identifier, password },
        { withCredentials: true }
      );
      navigateToPage("guest");
    } catch (error) {
      if (error.response?.status === 401) {
        alert("Invalid email/username or password.");
      } else {
        console.error("Login error", error);
        alert("An error occurred during login.");
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            type="text"
            label="Username or email"
            variant="outlined"
            fullWidth
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
          <Button variant="outlined" color="secondary" fullWidth onClick={() => navigateToPage("welcome")}>
            Back
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
