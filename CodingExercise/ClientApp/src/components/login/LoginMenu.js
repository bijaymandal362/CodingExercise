import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import {
  Avatar,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginMenu() {
  const paperStyle = {
    padding: "20px",
    width: 280,
    margin: "20px auto",
    height: "50vh",
  };
  const avatarColour = { backgroundColor: "#1bbd7e" };

  const [loginData, setLoginData] = useState({ userName: "", password: "" });
  const [errorMessages, setErrorMessages] = useState("");
  let navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("login", loginData, process.env.REACT_APP_API_URL);

    try {
     
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/Login",
        loginData
      );
      console.log("Response from server:", response.data);
      localStorage.setItem("data", JSON.stringify(response.data));
      return navigate("/");
    } catch (error) {
      console.error("Error:", error.response.data.message);
      setErrorMessages(error.response.data.message);
    }
  };

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  return (
    <React.Fragment>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarColour}>
              <LockOpenOutlinedIcon />
            </Avatar>
          </Grid>

          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              required
              name="userName"
              id="outlined-required"
              label="Username"
              placeholder="Enter Username"
              sx={{ mt: 2, mb: 2 }}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              required
              name="password"
              id="outlined-required"
              label="Password"
              placeholder="Enter Password"
              type="password"
              onChange={handleChange}
              sx={{ mt: 1, mb: 1 }}
            />

            {errorMessages && (
              <Typography variant="body2" color="error">
                {errorMessages}
              </Typography>
            )}

            <Button
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              sx={{ mt: 5 }}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Grid>
    </React.Fragment>
  );
}

export default LoginMenu;
