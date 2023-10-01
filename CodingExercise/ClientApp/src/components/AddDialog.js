import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import axios from "axios";

const responsiveTextField = {
  marginBottom: "16px", // Add some vertical spacing between text fields
};

function AddDialog({ open, onClose, onAdd }) {
  const initialFormData = {
    title: "",
    presenterName: "",
    durationInMinutes: "",
  };
  const [formData, setFormData] = useState({
    title: "",
    presenterName: "",
    durationInMinutes: "",
  });

  const clearForm = () => {
    setFormData(initialFormData);
  };
  const validateField = (fieldName, value) => {
    let error = "";
    if (fieldName === "title") {
      if (value.trim() === "" || value.length < 2 || value.length > 255) {
        error = "Title must be between 2 and 255 characters.";
      }
    }
    if (fieldName === "presenterName") {
      if (value.trim() === "" || value.length < 2 || value.length > 50) {
        error = "Presenter Name must be between 2 and 50 characters.";
      }
    }
    if (fieldName === "durationInMinutes") {
      const numberValue = parseInt(value, 10);
      if (isNaN(numberValue) || numberValue < 1 || numberValue > 60) {
        error = "Duration must be a number between 1 and 60.";
      }
    }
    return error;
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    // Validate fields
    const titleError = validateField("title", formData.title);
    const presenterNameError = validateField(
      "presenterName",
      formData.presenterName
    );
    const durationError = validateField(
      "durationInMinutes",
      formData.durationInMinutes
    );

    if (titleError || presenterNameError || durationError) {
      alert("Please correct the errors in the form before submitting.");
      return; // Exit the function, preventing form submission
    }

    try {
      // Continue with the API call and submission logic
      // Get the authentication token from localStorage
      const token = JSON.parse(localStorage.getItem("data"))?.token;

      // Construct the API URL for adding data
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/Presentation/AddPresentation`;

      // Send a POST request with the token and form data
      const response = await axios.post(apiUrl, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        // The data was added successfully
        // Call the "onAdd" callback to update the table data
        onAdd(formData);
        // Close the dialog
        setFormData(initialFormData);
        clearForm();
        onClose();
      } else {
        console.error("Error adding presentation:", response.statusText);
        // Handle the error (e.g., show an error message)
      }
    } catch (error) {
      console.error("Error adding presentation:", error);
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
          required
          name="title"
          value={formData.title}
          onChange={handleFieldChange}
          error={!!validateField("title", formData.title)}
          helperText={validateField("title", formData.title)}
          style={{ ...responsiveTextField, marginTop: "16px" }}
        />
        <TextField
          label="Presenter"
          variant="outlined"
          fullWidth
          required
          name="presenterName"
          value={formData.presenterName}
          onChange={handleFieldChange}
          error={!!validateField("presenterName", formData.presenterName)}
          helperText={validateField("presenterName", formData.presenterName)}
          style={{ ...responsiveTextField, marginTop: "10px" }}
        />
        <TextField
          label="Duration"
          variant="outlined"
          fullWidth
          required
          name="durationInMinutes"
          value={formData.durationInMinutes}
          onChange={handleFieldChange}
          error={
            !!validateField("durationInMinutes", formData.durationInMinutes)
          }
          helperText={validateField(
            "durationInMinutes",
            formData.durationInMinutes
          )}
          style={{ ...responsiveTextField }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onClose();
            setFormData(initialFormData);
          }}
        >
          Cancel
        </Button>
        <Button onClick={handleAdd} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddDialog;
