import React, { useEffect, useState } from 'react';
import Table from '@mui/joy/Table';
import Box from '@mui/joy/Box'; 
import Button from '@mui/joy/Button'; 
import Add from '@mui/icons-material/Add';
import Edit from '@mui/icons-material/Edit'; 
import Delete from '@mui/icons-material/Delete'; 
import Typography from '@mui/joy/Typography'; 
import Input from '@mui/joy/Input'; 
import axios from 'axios'; 
import { useUser } from '../UserContext'; 

export default function TableAlignment() {
  const { user } = useUser();
  const [rows, setRows] = useState([]); 
  const [newTaskDescription, setNewTaskDescription] = useState(''); 
  const [editingTaskId, setEditingTaskId] = useState(null); 

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/task/getAllTask');
        console.log("Fetched Tasks:", response.data);
        setRows(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error.response?.data || error.message);
      }
    };

    fetchTasks();
  }, []);

  const handleChangeTaskDescription = (e) => {
    setNewTaskDescription(e.target.value);
  };

  const handleTaskOperation = async () => {
    if (!user) {
      console.error('User is not logged in');
      return;
    }

    const taskData = {
      description: newTaskDescription,
      user: { email: user.email },
    };

    try {
      if (editingTaskId) {
        // Update existing task
        await axios.put(`http://localhost:8080/api/task/putTask?id=${editingTaskId}`, taskData);
        setRows((prevRows) =>
          prevRows.map((row) => (row.taskId === editingTaskId ? { ...row, description: newTaskDescription } : row))
        );
        resetForm();
      } else {
        // Add new task
        const response = await axios.post('http://localhost:8080/api/task/postTask', taskData);
        setRows((prevRows) => [...prevRows, response.data]);
        resetForm();
      }
    } catch (error) {
      console.error('Error adding/updating task:', error.response?.data || error.message);
    }
  };

  const handleEdit = (row) => {
    setNewTaskDescription(row.description);
    setEditingTaskId(row.taskId); // Set the ID of the task being edited
  };

  const resetForm = () => {
    setNewTaskDescription('');
    setEditingTaskId(null);
  };

  const handleDelete = async (taskId) => {
    if (!taskId) {
      console.error("Task ID is undefined, cannot delete.");
      return;
    }

    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        const response = await axios.delete(`http://localhost:8080/api/task/deleteTask/${taskId}`);
        alert(response.data);
        setRows((prevRows) => prevRows.filter((row) => row.taskId !== taskId));
      } catch (error) {
        console.error('Error deleting task:', error.response?.data || error.message);
        alert('Error deleting task: ' + (error.response?.data || error.message));
      }
    }
  };

  return (
    <div>
      <Typography level="h2" sx={{ marginBottom: '16px' }}>
        To-do List
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', marginBottom: 2 }}>
        <Input
          color="neutral"
          placeholder="To-do"
          value={newTaskDescription}
          onChange={handleChangeTaskDescription}
          sx={{ flexGrow: 1 }} 
        />
        <Button
          startDecorator={<Add />}
          onClick={handleTaskOperation}
        >
          {editingTaskId ? 'Update Task' : 'Add Task'}
        </Button>
      </Box>

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
                  startDecorator={<Delete />}
                  onClick={() => handleDelete(row.taskId)}
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
