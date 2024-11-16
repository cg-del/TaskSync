import React, { useEffect, useState } from 'react';
import Table from '@mui/joy/Table';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Add from '@mui/icons-material/Add';
import Edit from '@mui/icons-material/Edit';
import DeleteForever from '@mui/icons-material/DeleteForever';
import Typography from '@mui/joy/Typography';
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

export default function TableAlignment() {
  const { user } = useUser();
  const [rows, setRows] = useState([]);
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [openAddTaskModal, setOpenAddTaskModal] = useState(false);
  const [addTaskDescription, setAddTaskDescription] = useState(''); // Separate state for Add Task modal
  const [openEditTaskModal, setOpenEditTaskModal] = useState(false); // State for Edit Task modal

  useEffect(() => {
    if (user) {
      const fetchTasks = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/task/getTasksByUser?userId=${user.userId}`);
          setRows(response.data);
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
      setAddTaskDescription(''); // Reset the add task description
      setOpenAddTaskModal(false);  // Close modal after adding the task
    } catch (error) {
      console.error('Error adding task:', error.response?.data || error.message);
    }
  };

  const handleEdit = (row) => {
    setNewTaskDescription(row.description);
    setEditingTaskId(row.taskId);
    setOpenEditTaskModal(true); // Open the edit modal
  };

  const handleUpdateTask = async () => {
    if (!editingTaskId || !newTaskDescription) {
      console.error('Task ID or description is empty');
      return;
    }

    const taskData = {
      description: newTaskDescription,
      user: { email: user.email }, // Include user information
  };

    try {
      const response = await axios.put(`http://localhost:8080/api/task/updateTask/${editingTaskId}`, taskData);
      setRows((prevRows) => prevRows.map((row) => (row.taskId === editingTaskId ? response.data : row)));
      setNewTaskDescription(''); // Reset the new task description
      setOpenEditTaskModal(false); // Close the edit modal
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

  // Update the openAddTaskModal function to reset the description
  const openAddTaskModalHandler = () => {
    setAddTaskDescription(''); // Reset the description when opening the modal
    setOpenAddTaskModal(true);
  };

  return (
    <div>
      <Typography level="h2" sx={{ marginBottom: '16px' }}>
        To-do List
      </Typography>

      {/* Button to trigger the Add Task Modal */}
      <Button
        variant="outlined"
        color="neutral"
        startDecorator={<Add />}
        onClick={openAddTaskModalHandler} // Use the new handler
      >
        Add Task
      </Button>

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
                marginLeft: 20, // Adds space between the buttons
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>

      {/* Add Task Modal */}
      <Modal open={openAddTaskModal} onClose={() => setOpenAddTaskModal(false)}>
        
        <ModalDialog sx={{ maxWidth: '450px', width: '100%' }} >
          {/* Close Button */}
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
                  value={addTaskDescription} // Use addTaskDescription instead
                  onChange={(e) => setAddTaskDescription(e.target.value)} // Use addTaskDescription instead
                />
              </FormControl>
              <Button type="submit">Add Task</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>

      {/* Edit Task Modal */}
      <Modal open={openEditTaskModal} onClose={() => setOpenEditTaskModal(false)}>
        <ModalDialog sx={{ maxWidth: '450px', width: '100%' }} >
          {/* Close Button */}
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
                  value={newTaskDescription} // Use newTaskDescription for editing
                  onChange={(e) => setNewTaskDescription(e.target.value)} // Use newTaskDescription for editing
                />
              </FormControl>
              <Button type="submit">Update Task</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>

      {/* Tasks Table */}
      <Table sx={{ '& tr > *:not(:first-of-type)': { textAlign: 'left' } }}>
        <thead>
          <tr>
            <th>To-do</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.taskId}>
              <td>{row.description}</td>
              <td>
                <Button
                  variant="outlined"
                  startDecorator={<Edit />}
                  onClick={() => handleEdit(row)}
                  sx={{ marginRight: 1 }}
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
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}