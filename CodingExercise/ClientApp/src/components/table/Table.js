import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { IconButton, Button, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditDialog from "../EditDialog";
import AddDialog from "../AddDialog";
import AddIcon from "@mui/icons-material/Add";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "100px",
};

const dataGridContainerStyle = {
  maxWidth: "462px",
  width: "100%",
  overflowX: "auto",
};

const responsiveColumnsStyle = {
  display: "block",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  width: "100%",
};

const noRowsOverlayStyle = {
  position: "relative",
  marginTop: "20px",
  minHeight: "200px",
};

const noRowsMessageStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  textAlign: "center",
  transform: "translateY(-100%)",
  zIndex: 1,
};

// CSS class for the normal container (for larger screens)
const normalContainer = {
  width: "40%", // Adjust the width as needed
  margin: "0 auto", // Center the container horizontally
};

function Table() {
  const [rows, setRows] = useState([]);
  const [tableData, setTableData] = useState([]); // Store a copy of the original data
  const [selectedRow, setSelectedRow] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });

  const isAdmin = JSON.parse(localStorage.getItem("data"))?.role === "Admin";

  const fetchPresentationData = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/Presentation/GetPresentationList`
      )
      .then((response) => {
        const responseData = response.data.data;
        console.log("Response from server:", responseData);
        setRows(responseData); // Update the rows state with the fetched data
        setTableData(responseData); // Store a copy of the original data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    console.log("Navigated");
    fetchPresentationData();
  }, []);

  // Handle Edit and Delete actions
  const handleEditClick = (row) => {
    setSelectedRow(row);
    setOpenEditDialog(true);
  };

  // Handle saving edited data
  const handleEditSave = (editedData) => {
    console.log("Saving edited data:", editedData);
    // Update the tableData state with the edited data
    const updatedTableData = tableData.map((row) =>
      row.id === editedData.id ? editedData : row
    );

    setTableData(updatedTableData); // Update the tableData state
    setOpenEditDialog(false); // Close the edit dialog
    fetchPresentationData();
  };

  const handleAddClick = () => {
    setOpenAddDialog(true);
    console.log("Add button clicked");
  };

  const handleAddSave = () => {
    setOpenAddDialog(false);
    fetchPresentationData();
    console.log("Add button clicked");
  };

  const handleDeleteClick = (id) => {
    // Retrieve the JWT token from localStorage
    const token = JSON.parse(localStorage.getItem("data"))?.token;

    // Set the authorization headers with the token
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Construct the API URL with the ID
    const apiUrl = `${process.env.REACT_APP_API_URL}/api/Presentation/DeletePresentation/${id}`;

    // Send a DELETE request to delete the resource
    axios
      .delete(apiUrl, {
        headers: headers,
      })
      .then((response) => {
        if (response.status === 200) {
          // The delete was successful, you can update your data or handle as needed
          console.log(`Deleted presentation with ID: ${id}`);
          fetchPresentationData(); // Refresh the data after deletion
        } else {
          console.error("Error deleting presentation:", response.statusText);
          // Handle the error (e.g., show an error message)
        }
      })
      .catch((error) => {
        console.error("Error deleting presentation:", error);
        // Handle the error (e.g., show an error message)
      });
    console.log(`Delete clicked for ID: ${id}`);
  };

  let columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "presenterName", headerName: "Presentation", width: 200 },
    { field: "durationInMinutes", headerName: "Duration", width: 130 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <div>
          {isAdmin && (
            <>
              <IconButton
                onClick={() => handleEditClick(params.row)} // Handle edit action
                color="primary"
                aria-label="Edit"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => handleDeleteClick(params.row.id)} // Handle delete action
                color="secondary"
                aria-label="Delete"
              >
                <DeleteIcon />
              </IconButton>
            </>
          )}
        </div>
      ),
    },
  ];

  if (!isAdmin) {
    columns = columns.filter((column) => column.field !== "actions");
  }

  return (
    <div style={containerStyle}>
      <div
        style={
          window.innerWidth < 768 ? dataGridContainerStyle : normalContainer
        }
      >
        <div style={responsiveColumnsStyle}>
          <DataGrid
            initialState={{
              columns: {
                columnVisibilityModel: {
                  id: false, // Hide the "ID" column
                },
              },
            }}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            rows={rows || []}
            columns={columns}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            components={{
              Toolbar: (props) => (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    {isAdmin && (
                      <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={handleAddClick}
                      >
                        Add
                      </Button>
                    )}
                  </div>
                  <div>
                    <GridToolbar {...props} />
                  </div>
                </div>
              ),
              NoRowsOverlay: () => (
                <div style={noRowsOverlayStyle}>
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    style={noRowsMessageStyle}
                  >
                    No rows in DataGrid
                  </Stack>
                </div>
              ),
              NoResultsOverlay: () => (
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  style={noRowsMessageStyle}
                >
                  Local filter returns no result
                </Stack>
              ),
            }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                csvOptions: { disableToolbarButton: true },
                printOptions: { disableToolbarButton: true },
                quickFilterProps: { debounceMs: 250 },
              },
            }}
          />
        </div>
      </div>
      {isAdmin && selectedRow && (
        <EditDialog
          open={openEditDialog}
          onClose={() => setOpenEditDialog(false)}
          rowData={selectedRow}
          onEdit={handleEditSave}
        />
      )}
      {isAdmin && (
        <AddDialog
          open={openAddDialog}
          onClose={() => setOpenAddDialog(false)}
          onAdd={handleAddSave}
        />
      )}
    </div>
  );
}

export default Table;
