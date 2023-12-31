import React, { useState } from "react";
import {
  FormControl,
  TextField,
  Button,
  Select,
  MenuItem,
  Container,
  Box,
  Typography,
  CssBaseline,
  InputAdornment,
  IconButton,
} from "@mui/material";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

// Define styles as constants
const containerStyle = {
  marginTop: 8,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const formControlStyle = {
  fullWidth: true,
};

const inputStyle = {
  required: true,
};

//Function component
function Registration() {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    password: "",
    role: "Admin", // Default role
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    name: "",
    userName: "",
    password: "",
  });

  const validateForm = () => {
    const newErrorMessages = { name: "", userName: "", password: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrorMessages.name = "Name is required.";
      isValid = false;
    }

    if (formData.userName.trim() === "") {
      // Ignore leading and trailing whitespace
      formData.userName = formData.userName.trim();
    } else if (/^\s/.test(formData.userName) || /\s$/.test(formData.userName)) {
      newErrorMessages.userName =
        "Leading or trailing whitespace is not allowed in the username.";
      isValid = false;
    } else {
      newErrorMessages.userName = ""; // Clear the username error message
    }

    if (!formData.password.trim()) {
      newErrorMessages.password = "Password is required.";
      isValid = false;
    } else {
      newErrorMessages.password = ""; // Clear the password error message
    }
    setErrorMessages(newErrorMessages);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/Register`, formData)
        .then((response) => {
          console.log("Registration successful:", response.data.message);
          navigate("/login");
        })
        .catch((error) => {
          console.error("Error registering:", error);
        });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Trim whitespace from input values
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box sx={containerStyle}>
        <Typography style={{ marginTop: "16px" }} component="h1" variant="h5">
          Registration
        </Typography>
        <form onSubmit={handleSubmit}>
          {errorMessages.name && (
            <Typography variant="body2" color="error">
              {errorMessages.name}
            </Typography>
          )}
          <FormControl {...formControlStyle}>
            <TextField
              fullWidth
              required
              label="Name"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              {...inputStyle}
              autoComplete="name"
              error={!!errorMessages.name}
              style={{ marginTop: "16px" }}
            />
          </FormControl>
          {errorMessages.userName && (
            <Typography variant="body2" color="error">
              {errorMessages.userName}
            </Typography>
          )}
          <FormControl {...formControlStyle}>
            <TextField
              fullWidth
              required
              label="Username"
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              {...inputStyle}
              autoComplete="username"
              error={!!errorMessages.userName}
              style={{ marginTop: "16px" }}
            />
          </FormControl>
          {errorMessages.password && (
            <Typography variant="body2" color="error">
              {errorMessages.password}
            </Typography>
          )}
          <FormControl {...formControlStyle}>
            <TextField
              fullWidth
              required
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              style={{ marginTop: "16px" }}
              value={formData.password}
              onChange={handleInputChange}
              {...inputStyle}
              autoComplete="new-password"
              error={!!errorMessages.password}
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
          </FormControl>
          <FormControl {...formControlStyle}>
            <Select
              label="Role"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              style={{ marginTop: "16px" }}
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="User">User</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Registration;
