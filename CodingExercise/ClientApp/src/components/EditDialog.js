import React, { useState, useEffect } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios'; 

export default function EditDialog({ open, onClose, rowData, onEdit })  {
  const [editedData, setEditedData] = useState(rowData);
  const [isSaving, setIsSaving] = useState(false); // Track whether the save operation is in progress
 
  useEffect(() => {
    // Create a copy of the rowData for editing
    const editedRowData = { ...rowData };
    setEditedData(editedRowData);
  }, [rowData]);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };


  const handleSave = async () => {
    try {
      setIsSaving(true); // Set saving state to true

      // Construct the API URL with the ID
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/Presentation/UpdatePresentation/`;
  
      // Retrieve the JWT token from localStorage
      const token = JSON.parse(localStorage.getItem('data'))?.token;
  
      // Set the authorization headers with the token
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // Adjust the content type as needed
      };
  
      // Send a PUT request to update the resource with the edited data
      const response = await axios.put(apiUrl, editedData, {
        headers: headers,
      });
  
      if (response.status === 200) {
        // The update was successful
        onEdit(editedData); // Pass the updated data to the Table component
        onClose(); // Close the dialog
      } else {
        console.error('Error updating presentation:', response.statusText);
        // Handle the error (e.g., show an error message)
      }
    } catch (error) {
      console.error('Error updating presentation:', error);
      // Handle the error (e.g., show an error message)
    } finally {
      setIsSaving(false); // Set saving state back to false
    }
  };
  

  const responsiveDialog = {
    maxWidth: '100%', // Adjust the maximum width as needed
    width: '90%', // Adjust the width as needed
    overflowX: 'auto',
  };
  
  const responsiveTextField = {
    marginBottom: '16px', // Add some vertical spacing between text fields
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="sm" style={responsiveDialog}>
    <DialogTitle>Edit Row</DialogTitle>
    <DialogContent>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        required
        name="title"
        value={editedData.title}
        onChange={handleFieldChange}
        disabled={isSaving}
        style={{responsiveTextField, marginTop: '16px'}}
      />
      <TextField
        label="Presenter"
        variant="outlined"
        fullWidth
        required
        name="presenterName"
        value={editedData.presenterName}
        onChange={handleFieldChange}
        disabled={isSaving}
        style={{ ...responsiveTextField, marginTop: '10px' }} // Add marginTop for spacing
      />
      <TextField
        label="Duration"
        variant="outlined"
        fullWidth
        required
        name="durationInMinutes"
        value={editedData.durationInMinutes}
        onChange={handleFieldChange}
        disabled={isSaving}
        style={{ ...responsiveTextField }} // Add marginTop for spacing
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} disabled={isSaving}>
        Cancel
      </Button>
      <Button onClick={handleSave} color="primary" disabled={isSaving}>
        {isSaving ? 'Saving...' : 'Save'}
      </Button>
    </DialogActions>
  </Dialog>
  
  )
}
