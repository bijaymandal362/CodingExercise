import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  TextField,
  Button,
  Select,
  MenuItem,
  Container,
  Grid,
  Box,
  Typography,
  CssBaseline,
  InputAdornment,
  IconButton,
} from '@mui/material';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from "react-router-dom";


function Registration() {
  const [formData, setFormData] = useState({
    name: '',
    userName: '',
    password: '',
    role: 'Admin', // Default role
  });

  let navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    axios
      .post(`${process.env.REACT_APP_API_URL}/Register`, formData)
      .then((response) => {
      e.preventDefault();
      console.log('Registration successful:', response.data.message);
      return  navigate("/"); 
      })
      .catch((error) => {
        // Handle registration error
        console.error('Error registering:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Registration
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth>
            <FormLabel>Enter Name</FormLabel>
            <TextField
              label="Name"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              autoComplete="name"
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel>Enter Username</FormLabel>
            <TextField
              label="Username"
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              required
              autoComplete="username"
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel>Enter Password</FormLabel>
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              autoComplete="new-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={togglePasswordVisibility}
                      edge="end"
                    >
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
          <FormControl fullWidth>
            <FormLabel>Select Role</FormLabel>
            <Select
              label="Role"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
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
