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

  const [formData, setFormData] = useState(initialFormData);
  const [formTouched, setFormTouched] = useState(false);

  const [errors, setErrors] = useState({
    title: "",
    presenterName: "",
    durationInMinutes: "",
  });

  const clearForm = () => {
    setFormData(initialFormData);
    setFormTouched(false);
    setFormTouched(false);
    setErrors({
      title: "",
      presenterName: "",
      durationInMinutes: "",
    });
  };

  const validateField = (fieldName, value) => {
    let error = "";

    if (fieldName === "title") {
      if (
        value.trim() === "" ||
        value.length < 2 ||
        value.length > 255 ||
        /^\s|\s$/.test(value) // Check for leading or trailing white spaces
      ) {
        error =
          "Title must be between 2 and 255 characters and should not have leading/trailing spaces.";
      }
    }

    if (fieldName === "presenterName") {
      if (
        value.trim() === "" ||
        value.length < 2 ||
        value.length > 50 ||
        /^\s|\s$/.test(value) // Check for leading or trailing white spaces
      ) {
        error =
          "Presenter Name must be between 2 and 50 characters and should not have leading/trailing spaces.";
      }
    }

    if (fieldName === "durationInMinutes") {
      if (!value.trim()) {
        error = "Duration is required.";
      } else if (/^\s|\s$/.test(value)) {
        error = "Duration cannot have leading or trailing spaces.";
      } else {
        const numberValue = parseInt(value, 10);
        if (isNaN(numberValue) || numberValue < 1 || numberValue > 60) {
          error = "Duration must be a number between 1 and 60.";
        }
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

    // Update the error for the changed field
    setErrors({
      ...errors,
      [name]: validateField(name, value),
    });

    setFormTouched(true);
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
      const token = JSON.parse(localStorage.getItem("data"))?.token;
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/Presentation/AddPresentation`;
      const response = await axios.post(apiUrl, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        onAdd(formData);
        setFormData(initialFormData);
        clearForm();
        onClose();
      } else {
        console.error("Error adding presentation:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding presentation:", error);
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
          error={formTouched && !!errors.title}
          helperText={formTouched && errors.title}
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
          error={formTouched && !!errors.presenterName}
          helperText={formTouched && errors.presenterName}
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
          error={formTouched && !!errors.durationInMinutes}
          helperText={formTouched && errors.durationInMinutes}
          style={{ ...responsiveTextField }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onClose();
            clearForm();
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
