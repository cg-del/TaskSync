import React, { useEffect, useState } from 'react';
import Table from '@mui/joy/Table';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Add from '@mui/icons-material/Add';
import Edit from '@mui/icons-material/Edit';
import DeleteForever from '@mui/icons-material/DeleteForever';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useUser } from '../UserContext';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import IconButton from '@mui/joy/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Checkbox from '@mui/joy/Checkbox';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Navigate } from 'react-router-dom';

export default function TableAlignment() {
  const { user } = useUser();
  const [rows, setRows] = useState([]);
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [openAddTaskModal, setOpenAddTaskModal] = useState(false);
  const [addTaskDescription, setAddTaskDescription] = useState('');
  const [openEditTaskModal, setOpenEditTaskModal] = useState(false);
  const [anchorElComplete, setAnchorElComplete] = useState(null);
  const [anchorElUncomplete, setAnchorElUncomplete] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  
  if (!user) {
    return <Navigate to="/404" replace />;
  }

  useEffect(() => {
    if (user) {
      const fetchTasks = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/task/getTasksByUser?userId=${user.userId}`);
          setRows(response.data); // Store all tasks
        } catch (error) {
          console.error('Error fetching tasks:', error.response?.data || error.message);
        }
      };

      fetchTasks();
    } else {
      console.log('No user logged in');
    }
  }, [user]);

  const handleAddTask = async () => {
    if (!user || !addTaskDescription) {
      console.error('User is not logged in or task description is empty');
      return;
    }

    const taskData = {
      description: addTaskDescription,
      user: { email: user.email },
    };

    try {
      const response = await axios.post('http://localhost:8080/api/task/postTask', taskData);
      setRows((prevRows) => [...prevRows, response.data]);
      setAddTaskDescription('');
      setOpenAddTaskModal(false);
    } catch (error) {
      console.error('Error adding task:', error.response?.data || error.message);
    }
  };

  const handleEdit = (row) => {
    setNewTaskDescription(row.description);
    setEditingTaskId(row.taskId);
    setOpenEditTaskModal(true);
  };

  const handleUpdateTask = async () => {
    if (!editingTaskId || !newTaskDescription) {
      console.error('Task ID or description is empty');
      return;
    }

    const taskData = {
      description: newTaskDescription,
      user: { email: user.email },
    };

    try {
      const response = await axios.put(`http://localhost:8080/api/task/updateTask/${editingTaskId}`, taskData);
      setRows((prevRows) => prevRows.map((row) => (row.taskId === editingTaskId ? response.data : row)));
      setNewTaskDescription('');
      setOpenEditTaskModal(false);
    } catch (error) {
      console.error('Error updating task:', error.response ? error.response.data : error.message);
    }
  };

  const openDeleteConfirmation = (taskId) => {
    setTaskToDelete(taskId);
    setOpenConfirmation(true);
  };

  const handleDelete = async () => {
    if (!taskToDelete) return;

    try {
      await axios.delete(`http://localhost:8080/api/task/deleteTask/${taskToDelete}`);
      setRows((prevRows) => prevRows.filter((row) => row.taskId !== taskToDelete));
      setOpenConfirmation(false);
    } catch (error) {
      console.error('Error deleting task:', error.response?.data || error.message);
    }
  };

  const handleCancelDelete = () => {
    setOpenConfirmation(false);
  };

  const openAddTaskModalHandler = () => {
    setAddTaskDescription('');
    setOpenAddTaskModal(true);
  };

  // Function to handle checkbox change for completing tasks
  const handleCheckboxChange = (event, taskId, isComplete) => {
    setSelectedTaskId(taskId);
    if (isComplete) {
      setAnchorElUncomplete(event.currentTarget); // Open uncomplete menu
    } else {
      setAnchorElComplete(event.currentTarget); // Open complete menu
    }
  };

  const handleCompleteTask = async () => {
    if (!selectedTaskId) return;

    try {
      const taskToUpdate = rows.find(row => row.taskId === selectedTaskId);
      const response = await axios.put(`http://localhost:8080/api/task/updateTask/${selectedTaskId}`, {
        description: taskToUpdate.description,
        isComplete: true, // Mark as complete
        user: { email: user.email },
      });

      // Update the state with the new task data
      setRows((prevRows) => prevRows.map((row) => (row.taskId === selectedTaskId ? response.data : row)));
      setAnchorElComplete(null); // Close the complete menu
    } catch (error) {
      console.error('Error updating task status:', error.response?.data || error.message);
    }
  };

  const handleUncompleteTask = async () => {
    if (!selectedTaskId) return;

    try {
      const taskToUpdate = rows.find(row => row.taskId === selectedTaskId);
      const response = await axios.put(`http://localhost:8080/api/task/updateTask/${selectedTaskId}`, {
        description: taskToUpdate.description,
        isComplete: false, // Mark as uncomplete
        user: { email: user.email },
      });

      // Update the state with the new task data
      setRows((prevRows) => prevRows.map((row) => (row.taskId === selectedTaskId ? response.data : row)));
      setAnchorElUncomplete(null); // Close the uncomplete menu
    } catch (error) {
      console.error('Error updating task status:', error.response?.data || error.message);
    }
  };

  const handleMenuClose = () => {
    setAnchorElComplete(null);
    setAnchorElUncomplete(null);
  };

  return (
    <Box sx={{ width: '95%', padding: 2 }}>
      {/* Button to trigger the Add Task Modal */}
      <Button
        variant="outlined"
        sx={{ borderColor: '#4259c1', color: '#4259c1' }}
        startDecorator={<Add />}
        onClick={openAddTaskModalHandler}
      >
        Add Task
      </Button>

      <Typography variant="h5" sx={{ marginTop: 2, color: '#1f295a', fontWeight: 'bold'}}>
        To-Do
      </Typography>

      {/* Confirmation Modal */}
      <Modal open={openConfirmation} onClose={handleCancelDelete}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>Delete Task</DialogTitle>
          <Divider />
          <DialogContent>
            Are you sure you want to delete this task?
          </DialogContent>
          <DialogActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="plain"
              color="neutral"
              onClick={handleCancelDelete}
              sx={{ textTransform: 'none', paddingLeft: 0, paddingRight: 0 }}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              color="danger"
              onClick={handleDelete}
              sx={{
                borderColor: 'red',
                color: 'red',
                textTransform: 'none',
                marginLeft: 20,
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>

      {/* Add Task Modal */}
      <Modal open={openAddTaskModal} onClose={() => setOpenAddTaskModal(false)}>
        <ModalDialog sx={{ maxWidth: '450px', width: '100%' }}>
          <IconButton
            aria-label="close"
            onClick={() => setOpenAddTaskModal(false)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: 'gray',
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogTitle>Add task</DialogTitle>
          <DialogContent>Fill in the todo description.</DialogContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleAddTask();
            }}
          >
            <Stack spacing={3}>
              <FormControl>
                <FormLabel>Task Description</FormLabel>
                <Input
                  autoFocus
                  required
                  value={addTaskDescription}
                  onChange={(e) => setAddTaskDescription(e.target.value)}
                />
              </FormControl>
              <Button type="submit">Add Task</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>

      {/* Edit Task Modal */}
      <Modal open={openEditTaskModal} onClose={() => setOpenEditTaskModal(false)}>
        <ModalDialog sx={{ maxWidth: '450px', width: '100%' }}>
          <IconButton
            aria-label="close"
            onClick={() => setOpenEditTaskModal(false)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: 'gray',
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogTitle>Edit task</DialogTitle>
          <DialogContent>Update the todo description.</DialogContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleUpdateTask();
            }}
          >
            <Stack spacing={3}>
              <FormControl>
                <FormLabel>Task Description</FormLabel>
                <Input
                  autoFocus
                  required
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                />
              </FormControl>
              <Button type="submit">Update Task</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>

      {/* Tasks Table */}
      <Box sx={{ 
                marginTop: 2,
                borderRadius: '4px',
                backgroundColor: '#dde5f8',
              }}>
        <Table sx={{ '& tr > *:not(:first-of-type)': { textAlign: 'left' } }}>
          <thead>
          <tr>
            <th style={{ width: '100px',
                          backgroundColor: '#4259c1', 
                          padding: '8px', 
                          borderRadius: '6px 0px 0px 6px', 
                          fontWeight: 'bold', 
                          color: '#eeeeee'
                        }}>Status</th> {/* Status column */}

            <th style={{ backgroundColor: '#4259c1', 
                         width: '500px',
                         padding: '8px', 
                         borderRadius: '0px 0px 0px 0px', 
                         fontWeight: 'bold', 
                         color: '#eeeeee'
                        }}>Task Description</th> {/* Task Description column */}

            <th style={{ backgroundColor: '#4259c1', 
                         padding: '8px', 
                         borderRadius: '0px 6px 6px 0px', 
                         fontWeight: 'bold', 
                         color: '#eeeeee'
                        }}>Action</th> {/* Action column */}
          </tr>
          </thead>
          <tbody>
            {rows.filter(row => !row.isComplete).map((row) => ( // Only show uncompleted tasks
              <tr key={row.taskId}>
                <td>
                  <Checkbox 
                    sx={{ marginLeft: 2, borderColor: '#4259c1', color: '#4259c1' }}
                    checked={row.isComplete} // Ensure this matches your boolean field
                    onChange={(e) => handleCheckboxChange(e, row.taskId, row.isComplete)} // Call the function to open menu
                  />
                </td>
                <td>
                  <Box sx={{ 
                    padding: 2, 
                    borderRadius: '4px', 
                    backgroundColor: '#dde5f8', // Background color for description box
                  }}>
                    <Typography
                      sx={{ opacity: 1,
                      }}
                    >
                      {row.description}
                    </Typography>
                  </Box>
                </td>
                <td>
                  <Box sx={{ 
                    display: 'flex', 
                    padding: 1, 
                    gap: 1,
                    borderRadius: '4px', 
                    backgroundColor: '#dde5f8'
                    }}> {/* Box for action buttons */}
                    <Button
                      variant="outlined"
                      startDecorator={<Edit />}
                      onClick={() => handleEdit(row)}
                      sx={{ marginRight: 1, borderColor: '#4259c1', color: '#4259c1' }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      startDecorator={<DeleteForever />}
                      onClick={() => openDeleteConfirmation(row.taskId)}
                      sx={{
                        borderColor: 'red',
                        color: 'red',
                        textTransform: 'none',
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                </td>
              </tr>
            ))} 
          </tbody>
        </Table>
      </Box>

      {/* Menu for completing tasks */}
      <Menu
        anchorEl={anchorElComplete}
        open={Boolean(anchorElComplete)}
        onClose={handleMenuClose}
      >
        <MenuItem 
          sx={{ 
            borderRadius: '4px',
            backgroundColor: '#dde5f8',
          }}
          onClick={handleCompleteTask}
        >
          Mark as Complete
        </MenuItem>
      </Menu>

      {/* Menu for uncompleting tasks */}
      <Menu
        anchorEl={anchorElUncomplete}
        open={Boolean(anchorElUncomplete)}
        onClose={handleMenuClose}
      >
        <MenuItem 
          sx={{ 
            borderRadius: '4px',
            backgroundColor: '#dde5f8',
          }}
          onClick={handleUncompleteTask}
        >
          Mark as Uncomplete
        </MenuItem>
      </Menu>

      {/* Complete Table */}
      <Typography variant="h5" sx={{ marginTop: 4, color: '#1f295a', fontWeight: 'bold'}}>
        Complete
      </Typography>
      <Box sx={{ 
                marginTop: 2,
                borderRadius: '4px',
                backgroundColor: '#dde5f8',
              }}>
        <Table sx={{ '& tr > *:not(:first-of-type)': { textAlign: 'left' } }}>
          <thead>
          <tr>
            <th style={{ width: '100px',
                          backgroundColor: '#4259c1', 
                          padding: '8px', 
                          borderRadius: '6px 0px 0px 6px', 
                          fontWeight: 'bold', 
                          color: '#eeeeee'
                        }}>Status</th> {/* Status column */}

            <th style={{ backgroundColor: '#4259c1', 
                         width: '500px',
                         padding: '8px', 
                         borderRadius: '0px 0px 0px 0px', 
                         fontWeight: 'bold', 
                         color: '#eeeeee'
                        }}>Task Description</th> {/* Task Description column */}

            <th style={{ backgroundColor: '#4259c1', 
                         padding: '8px', 
                         borderRadius: '0px 6px 6px 0px', 
                         fontWeight: 'bold', 
                         color: '#eeeeee'
                        }}>Action</th> {/* Action column */}
          </tr>
          </thead>
          <tbody>
            {rows.filter(row => row.isComplete).map((row) => ( // Only show completed tasks
              <tr key={row.taskId}>
                <td>
                  <Checkbox 
                    sx={{ marginLeft: 2, borderColor: '#4259c1', color: '#4259c1' }}
                    checked={row.isComplete} // Ensure this matches your boolean field
                    onChange={(e) => handleCheckboxChange(e, row.taskId, row.isComplete)} // Call the function to open menu
                  />
                </td>
                <td>
                  <Box sx={{ 
                    padding: 2, 
                    borderRadius: '4px', 
                    backgroundColor: '#dde5f8', // Background color for description box
                  }}>
                    <Typography
                      sx={{ 
                        opacity: 0.8,
                        textDecoration: 'line-through',
                      }}>
                      {row.description}
                    </Typography>
                  </Box>
                </td>
                <td>
                  <Box sx={{ 
                    display: 'flex', 
                    padding: 1, 
                    gap: 1,
                    borderRadius: '4px', 
                    backgroundColor: '#dde5f8'
                    }}> {/* Box for action buttons */}
                    <Button
                      variant="outlined"
                      startDecorator={<DeleteForever />}
                      onClick={() => openDeleteConfirmation(row.taskId)}
                      sx={{
                        borderColor: 'red',
                        color: 'red',
                        textTransform: 'none',
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                </td>
              </tr>
            ))} 
          </tbody>
        </Table>
      </Box>
    </Box>
  );
}