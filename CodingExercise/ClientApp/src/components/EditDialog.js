import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";

export default function EditDialog({ open, onClose, rowData, onEdit }) {
  const [editedData, setEditedData] = useState({ ...rowData });
  const [isSaving, setIsSaving] = useState(false); // Track whether the save operation is in progress
  const [formErrors, setFormErrors] = useState({
    title: "",
    presenterName: "",
    durationInMinutes: "",
  });

  const validateField = (name, value) => {
    let error = "";
    if (/^\s+$/.test(value)) {
      error = "Whitespace characters are not allowed.";
    }
    if (value.trim() === "") {
      error = "This field is required.";
    }
    if (name === "title") {
      if (!value.trim()) {
        error = "Title is required.";
      } else if (
        value.trim().length < 2 ||
        value.trim().length > 255 ||
        /^\s|\s$/.test(value) // Check for leading or trailing white spaces
      ) {
        error =
          "Title must be between 2 and 255 characters and should not have leading/trailing spaces.";
      }
    } else if (name === "presenterName") {
      if (!value.trim()) {
        error = "Presenter is required.";
      } else if (
        value.trim().length < 2 ||
        value.trim().length > 50 ||
        /^\s|\s$/.test(value) // Check for leading or trailing white spaces
      ) {
        error =
          "Presenter Name must be between 2 and 50 characters and should not have leading/trailing spaces.";
      }
    }
    if (name === "durationInMinutes") {
      if (!value.trim()) {
        error = "Duration is required.";
      } else if (/^\s|\s$/.test(value)) {
        error = "Duration cannot have leading or trailing spaces.";
      } else {
        const duration = parseInt(value, 10);
        if (isNaN(duration) || duration < 1 || duration > 60) {
          error = "Duration must be a number between 1 and 60.";
        }
      }
    }

    setFormErrors({ ...formErrors, [name]: error });
  };

  useEffect(() => {
    // Create a copy of the rowData for editing
    const editedRowData = { ...rowData };
    setEditedData(editedRowData);
  }, [rowData]);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
    validateField(name, value);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const hasErrors = Object.values(formErrors).some((error) => error);
      if (hasErrors) {
        alert("Please correct the errors in the form before submitting.");
        return;
      }

      const apiUrl = `${process.env.REACT_APP_API_URL}/api/Presentation/UpdatePresentation/`;
      const token = JSON.parse(localStorage.getItem("data"))?.token;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.put(apiUrl, editedData, {
        headers: headers,
      });

      if (response.status === 200) {
        onEdit(editedData);
        onClose();
      } else {
        console.error("Error updating presentation:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating presentation:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="sm">
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
          error={formErrors.title !== ""}
          helperText={formErrors.title}
          style={{ marginTop: "16px" }}
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
          error={formErrors.presenterName !== ""}
          helperText={formErrors.presenterName}
          style={{ marginTop: "16px" }}
        />
        <TextField
          label="Duration in Minutes"
          variant="outlined"
          fullWidth
          required
          name="durationInMinutes"
          value={editedData.durationInMinutes}
          onChange={handleFieldChange}
          disabled={isSaving}
          error={
            formErrors.durationInMinutes !== "" ||
            isNaN(editedData.durationInMinutes) ||
            editedData.durationInMinutes < 1 ||
            editedData.durationInMinutes > 60
          }
          helperText={formErrors.durationInMinutes}
          style={{ marginTop: "16px" }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isSaving}>
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
