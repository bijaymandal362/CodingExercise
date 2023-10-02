import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Tabs,
  Tab,
  Drawer,
  Typography,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

// Define styles as constants
const appBarStyle = {
  background: "#063970",
};

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
};

const buttonStyle = {
  marginLeft: "auto",
};

const containerStyle = {
  marginLeft: "10px",
};

function Layout() {
  const value = "none"; // initial tab based on current pathname
  let navigate = useNavigate();

  const handleLoginButtonClicked = (e) => {
    e.preventDefault();
    console.log("login");
    return navigate("/login");
  };

  const handleRegistrationButtonClicked = (e) => {
    e.preventDefault();
    console.log("registration");
    return navigate("/registration");
  };

  const handleLogout = () => {
    const token = JSON.parse(localStorage.getItem("data"))?.token;
    if (!token) {
      alert("You are not logged in");
      return;
    }
    axios
      .post(`${process.env.REACT_APP_API_URL}/Logout`, null, {
        headers: {
          Authorization: `Bearer ${token}`, // Replace 'yourAccessToken' with the actual access token
        },
      })
      .then((response) => {
        const message = response.data.message;
        localStorage.removeItem("data");
        console.log("Response from server:", message);
        return navigate("/login");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <React.Fragment>
      <AppBar sx={appBarStyle}>
        <Toolbar>
          <IconButton onClick={handleLogout} color="inherit">
            <ExitToAppIcon />
          </IconButton>

          <Typography sx={{ margin: "5px" }}> Presentation </Typography>
          <Tabs textColor="inherit" value={value}>
            <Tab
              label={
                <Link to="/" style={linkStyle}>
                  Home
                </Link>
              }
            />
            <Tab
              label={
                <Link to="*" style={linkStyle}>
                  About
                </Link>
              }
            />
          </Tabs>
          <Button
            sx={buttonStyle}
            onClick={handleLoginButtonClicked}
            variant="contained"
            color="primary"
          >
            Login{" "}
          </Button>
          <Button
            sx={containerStyle}
            onClick={handleRegistrationButtonClicked}
            variant="contained"
            color="primary"
          >
            Register{" "}
          </Button>

          <Drawer />
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default Layout;
