import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

const DataGridDemo = ({ initialRows }) => {
  const [rows, setRows] = useState(initialRows);
  const [editableRowId, setEditableRowId] = useState(null); // Track which row is editable
  const [completedTasks, setCompletedTasks] = useState({}); // Track completed tasks

  const handleEdit = (row) => {
    setEditableRowId(row.id); // Set the selected row as editable
  };

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
    if (editableRowId === id) setEditableRowId(null); // Reset editableRow if the deleted row was being edited
    const newCompletedTasks = { ...completedTasks };
    delete newCompletedTasks[id];
    setCompletedTasks(newCompletedTasks); // Remove completed state for deleted task
  };

  const handleAddTask = () => {
    const newTask = {
      id: rows.length + 1, // Simple ID generation
      description: `Task ${rows.length + 1}: New task description`,
    };
    setRows([...rows, newTask]);
    setEditableRowId(null); // Make previous tasks non-editable
  };

  const handleCellEditCommit = (params) => {
    if (params.id === editableRowId) {
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === params.id ? { ...row, [params.field]: params.value } : row
        )
      );
    }
  };

  const handleCompletionToggle = (id) => {
    setCompletedTasks((prev) => ({ ...prev, [id]: !prev[id] })); // Toggle completion state
  };

  const columns = [
    {
      field: 'description',
      headerName: 'Description',
      width: 500,
      editable: true,
      renderCell: (params) => (
        <Box
          component="span"
          sx={{
            textDecoration: completedTasks[params.row.id] ? 'line-through' : 'none',
            color: completedTasks[params.row.id] ? 'gray' : 'inherit',
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: 'completed',
      headerName: 'Completed',
      width: 100,
      renderCell: (params) => (
        <Checkbox
          checked={!!completedTasks[params.row.id]}
          onChange={() => handleCompletionToggle(params.row.id)}
          color="primary"
        />
      ),
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

  return (
    <Box sx={{ height: 400, width: '100%', mt: 2 }}>
      {rows.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: 'center', mt: 2 }}>
          No tasks available. Please add a task.
        </Typography>
      ) : (
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
          disableRowSelectionOnClick
          onCellEditCommit={handleCellEditCommit}
          isCellEditable={(params) => params.row.id === editableRowId} // Only editable row can be edited
        />
      )}
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
};

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

  ],
};

export default DataGridDemo;
