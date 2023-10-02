import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import {
  Avatar,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Container,
  Box,
  CssBaseline,
  InputAdornment,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginMenu() {
  let navigate = useNavigate();

  const paperStyle = {
    padding: "20px",
    width: 280,
    margin: "20px auto",
    height: "50vh",
  };

  const avatarColour = { backgroundColor: "#1bbd7e" };
  const [loginData, setLoginData] = useState({ userName: "", password: "" });
  const [errorMessages, setErrorMessages] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("login", loginData, process.env.REACT_APP_API_URL);
    // Check if the username is only whitespace
    if (!loginData.userName.trim()) {
      setErrorMessages("Username cannot be whitespace only.");
      return;
    }
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

  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
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
                label="Username"
                placeholder="Enter Username"
                sx={{ mt: 2, mb: 2 }}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                required
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                label="Password"
                placeholder="Enter Password"
                onChange={handleChange}
                sx={{ mt: 1, mb: 1 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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
                sx={{ mt: 3 }} // Adjust the spacing as needed
              >
                Login
              </Button>
            </form>
          </Paper>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default LoginMenu;
