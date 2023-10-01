import React, { useState } from "react";
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

const Layout = () => {
  const [value, setValue] = useState(0);
 
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
    axios
      .post(`${process.env.REACT_APP_API_URL}/Logout`, null, {
        headers: {
          Authorization: `Bearer ${token}`, // Replace 'yourAccessToken' with the actual access token
        },
      })
      .then((response) => {
        const message = response.data.message;
        getDataFromList();
        localStorage.removeItem("data");
        console.log("Response from server:", message);
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  const getDataFromList = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/Presentation/GetPresentationList`
      )
      .then((response) => {
        const responseData = response.data.data;
        console.log("Response from server:", responseData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  return (
    <React.Fragment>
      <AppBar sx={{ background: "#063970" }}>
        <Toolbar>
          <IconButton onClick={handleLogout}  color="inherit">
            <ExitToAppIcon /> {/* Use ExitToApp icon for logout */}
          </IconButton>
          <Typography sx={{ margin: "5px" }}> Presentation </Typography>
          <Tabs
            textColor="inherit"
            value={value}
            onChange={(e, value) => setValue(value)}
            indicatorColor="secondary"
          >
            <Tab label="Home" />
            <Tab label="About" />
          </Tabs>
          <Button
            sx={{ marginLeft: "auto" }}
            onClick={handleLoginButtonClicked}
            variant="contained"
            color="primary"
          >
            Login{" "}
          </Button>
          <Button
            sx={{ marginLeft: "10px" }}
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
};

export default Layout;
