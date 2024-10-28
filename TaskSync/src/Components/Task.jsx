import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { useState } from 'react';

const columns = [
  {
    field: 'description',
    headerName: 'Description',
    width: 600,
    editable: true,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    renderCell: (params) => (
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton onClick={() => handleEdit(params.row)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => handleDelete(params.row.id)}>
          <DeleteIcon />
        </IconButton>
      </Box>
    ),
  },
];

export default function DataGridDemo({ initialRows }) {
  const [rows, setRows] = useState(initialRows);

  const handleEdit = (row) => {
    // Implement your edit logic here
    console.log('Edit row:', row);
  };

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleAddTask = () => {
    const newTask = {
      id: rows.length + 1, // Simple ID generation
      description: `Task ${rows.length + 1}: New task description`,
    };
    setRows([...rows, newTask]);
  };

  return (
    <Box sx={{ height: 400, width: '100%', mt: 2 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddTask}
        sx={{ mt: 2 }} // Margin top for spacing
      >
        Add Task
      </Button>
    </Box>
  );
}

DataGridDemo.propTypes = {
  initialRows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

// Example default rows for testing purposes
DataGridDemo.defaultProps = {
  initialRows: [
    { id: 1, description: 'Task 1: Description example' },
    { id: 2, description: 'Task 2: Description example' },
    { id: 3, description: 'Task 3: Description example' },
    { id: 4, description: 'Task 4: Description example' },
    { id: 5, description: 'Task 5: Description example' },
  ],
};