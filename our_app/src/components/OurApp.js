import React, { useState } from "react";
import WelcomePage from "./Welcome.js";
import Register from "./Register";
import Login from "./Login";

function OurApp() {
  const [currentPage, setCurrentPage] = useState("welcome");

  //redirection
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
      render = <div/>;
      break;
    default:
      render = <WelcomePage navigateToPage={navigateToPage} />;
  }

  return render;
}

export default OurApp;