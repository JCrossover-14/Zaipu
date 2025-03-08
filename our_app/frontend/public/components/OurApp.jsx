import React, { useState } from "react";
//import { Box, Button, Container, Typography } from "@mui/material";
import WelcomePage from "./WelcomePage";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";

function OurApp() {
  const [currentPage, setCurrentPage] = useState("welcome");

  // Navigation function
  const navigateToPage = (page) => {
    setCurrentPage(page);
  };

  let render;

  switch (currentPage) {
    case "welcome":
      render = <WelcomePage navigateToPage={navigateToPage} />;
      break;
    case "register":
      render = <Register navigateToPage={navigateToPage} />;
      break;
    case "login":
      render = <Login navigateToPage={navigateToPage} />;
      break;
    case "guest":
      render = <div></div>;
      break;
    case "home":
      render = <div></div>;
      break; 
    default:
      render = <WelcomePage navigateToPage={navigateToPage} />;
  }

  render = <Home/>; 

  return (
    <div>
      {render}
    </div>
  );
}

export default OurApp;
