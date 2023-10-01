import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import axios from 'axios'; 

function AddDialog({ open, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    title: '',
    presenterName: '',
    durationInMinutes: '',
  });

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAdd = async () => {
    try {
      // Validate and process the form data
      // You can add your validation logic here

      // Get the authentication token from localStorage
      const token = JSON.parse(localStorage.getItem('data'))?.token;

      // Construct the API URL for adding data
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/Presentation/AddPresentation`;

      // Send a POST request with the token and form data
      const response = await axios.post(apiUrl, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        // The data was added successfully
        // Call the "onAdd" callback to update the table data
        onAdd(formData);

        // Close the dialog
        onClose();
      } else {
        console.error('Error adding presentation:', response.statusText);
        // Handle the error (e.g., show an error message)
      }
    } catch (error) {
      console.error('Error adding presentation:', error);
      // Handle the error (e.g., show an error message)
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Presentation</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          name="title"
          value={formData.title}
          onChange={handleFieldChange}
        />
        <TextField
          label="Presenter"
          variant="outlined"
          fullWidth
          name="presenterName"
          value={formData.presenterName}
          onChange={handleFieldChange}
        />
        <TextField
          label="Duration"
          variant="outlined"
          fullWidth
          name="durationInMinutes"
          value={formData.durationInMinutes}
          onChange={handleFieldChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAdd} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddDialog;
