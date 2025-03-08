import React from "react";
import { Container, Typography, Button, Paper, Box } from "@mui/material";

function WelcomePage({ navigateToPage }) {
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 5, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Welcome to Our App
        </Typography>
        <Box display="flex" flexDirection="column" gap={2} mt={2}>
          <Button variant="contained" color="primary" onClick={() => navigateToPage("register")}>
            Register as New User
          </Button>
          <Button variant="contained" color="secondary" onClick={() => navigateToPage("login")}>
            Login as Existing User
          </Button>
          <Button variant="outlined" color="inherit" onClick={() => navigateToPage("guest")}>
            Continue as Guest
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default WelcomePage;
