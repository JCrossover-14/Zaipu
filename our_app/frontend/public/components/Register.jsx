import React, { useState } from "react";
import axios from "axios";
import { Container, Typography, TextField, Button, Paper, Box } from "@mui/material";

function Register({ navigateToPage }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      console.log("trying to add to database username:",username," email: ", email, "password: ",password);
      const response = await axios.post("http://localhost:8000/register", {
        username,
        email,
        password, // Send the raw password, hashing is handled on the server
      });

      console.log(response.data); // For debugging purposes
      navigateToPage("login"); // Navigate to login page after successful registration
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data);
      } else {
        console.error("Registration error", error);
        alert("An error occurred during registration.");
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            type="text"
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            type="email"
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <TextField
            type="password"
            label="Confirm Password"
            variant="outlined"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign Up
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => navigateToPage("welcome")}
          >
            Back
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Register;
