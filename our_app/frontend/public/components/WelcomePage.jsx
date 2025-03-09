import React from "react";
import { Container, Typography, Button } from "@mui/material";
import Logo from "../../assets/logo.png";

function WelcomePage({ navigateToPage }) {
  return (
    <Container maxWidth="sm" style={styles.container}>
      {/* Logo Section */}
      <div style={styles.logoContainer}>
        <img src={Logo} alt="Logo" style={styles.logo} />
        <Typography variant="h2" style={styles.title}>Zaipu</Typography> {/* Increased font size */}
      </div>

      <Typography variant="body1" color="textSecondary" style={styles.subtitle}>
        <em>Master Your Money, Own Your Future</em>
      </Typography>

      {/* Buttons */}
      <div style={styles.buttonContainer}>
        <Button variant="contained" color="primary" style={styles.button} onClick={() => navigateToPage("register")}>
          Register as New User
        </Button>
        <Button variant="contained" color="secondary" style={styles.button} onClick={() => navigateToPage("login")}>
          Login as Existing User
        </Button>
      </div>
    </Container>
  );
}

// Styles
const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
    padding: "20px",
  },
  logoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "20px",
  },
  logo: {
    height: "120px", // Increased logo size
    marginBottom: "15px",
  },
  title: {
    fontWeight: "800",
    letterSpacing: "1.5px",
    color: "#333",
    textTransform: "uppercase",
    fontSize: "2.5rem", // Increased font size for the title
  },
  subtitle: {
    marginBottom: "20px",
    fontStyle: "italic",
    fontSize: "1.2rem", // Slightly increased font size for the subtitle
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginTop: "25px",
  },
  button: {
    borderRadius: "8px",
    fontWeight: "bold",
    textTransform: "none",
    fontSize: "16px",
    padding: "12px",
  },
  outlinedButton: {
    borderRadius: "8px",
    fontWeight: "bold",
    textTransform: "none",
    fontSize: "16px",
    padding: "12px",
    borderColor: "#333",
    color: "#333",
  },
};

export default WelcomePage;
