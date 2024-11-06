import React, { useEffect, useState } from 'react';
import Table from '@mui/joy/Table';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Add from '@mui/icons-material/Add';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useUser } from '../UserContext';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function TaskCalendar() {
  const { user } = useUser();
  const [rows, setRows] = useState([]);
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const formatDateString = (date) => {
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    return utcDate.toISOString().split('T')[0]; // Format date as 'YYYY-MM-DD'
  };

  useEffect(() => {
    const fetchAllTasks = async () => {
      if (user) {
        try {
          const response = await axios.get(`http://localhost:8080/api/taskcalendar/getAllTasksCal`);
          const parsedTasks = response.data.map(row => ({
            ...row,
            date: formatDateString(new Date(row.date)) // Convert each date to 'YYYY-MM-DD'
          }));
          setRows(parsedTasks);
        } catch (error) {
          console.error('Error fetching tasks:', error.response?.data || error.message);
        }
      }
    };

    fetchAllTasks();
  }, [user]);

  const handleAddTask = async () => {
    if (!user) {
      console.error('User is not logged in');
      return;
    }

    const taskData = {
      taskDescription: newTaskDescription,
      date: formatDateString(selectedDate),
      user: { userId: user.userId }
    };

    try {
      const response = await axios.post('http://localhost:8080/api/taskcalendar/addTaskCal', taskData);
      setRows(prevRows => [...prevRows, { ...response.data, date: formatDateString(new Date(response.data.date)) }]);
      resetForm();
    } catch (error) {
      console.error('Error adding task:', error.response?.data || error.message);
    }
  };

  const handleUpdateTask = async () => {
    if (!user || !editingTask) {
      console.error('User is not logged in or no task is being edited');
      return;
    }

    const taskData = {
      taskDescription: newTaskDescription,
      date: formatDateString(selectedDate),
      user: { userId: user.userId }
    };

    try {
      const response = await axios.put(`http://localhost:8080/api/taskcalendar/updateTaskCal?calendarId=${editingTask.calendarId}`, taskData);
      setRows(prevRows => prevRows.map(row => (row.calendarId === editingTask.calendarId ? { ...response.data, date: formatDateString(new Date(response.data.date)) } : row)));
      resetForm();
    } catch (error) {
      console.error('Error updating task:', error.response?.data || error.message);
    }
  };

  const resetForm = () => {
    setNewTaskDescription('');
    setSelectedDate(new Date());
    setDialogOpen(false);
    setEditingTask(null);
  };

  const handleDialogOpen = (task = null) => {
    if (task) {
      setEditingTask(task);
      setNewTaskDescription(task.taskDescription);
      setSelectedDate(new Date(task.date));
    } else {
      resetForm();
    }
    setDialogOpen(true);
  };

  const handleDialogSubmit = () => {
    if (editingTask) {
      handleUpdateTask();
    } else {
      handleAddTask();
    }
  };

  const handleDeleteTask = async (calendarId) => {
    if (!calendarId) {
      console.error("Calendar ID is undefined");
      return;
    }

    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`http://localhost:8080/api/taskcalendar/deleteTaskCal/${calendarId}`);
        setRows(prevRows => prevRows.filter(row => row.calendarId !== calendarId));
      } catch (error) {
        console.error('Error deleting task:', error.response?.data || error.message);
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 4 }}>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        onClickDay={(date) => setSelectedDate(date)}
        locale="en-US"
        firstDayOfWeek={0}
      />
      <Box sx={{ flex: 1 }}>
        <Typography variant="h4">Tasks</Typography>
        <Button onClick={() => handleDialogOpen()}>
          <Add /> Add Task
        </Button>
        <Table>
          <thead>
            <tr>
              <th>Task Description</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.calendarId || row.taskDescription}>
                <td>{row.taskDescription}</td>
                <td>{row.date}</td>
                <td>
                  <Button onClick={() => handleDialogOpen(row)}>
                    <Edit /> Edit
                  </Button>
                  <Button onClick={() => handleDeleteTask(row.calendarId)}>
                    <Delete /> Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Dialog open={dialogOpen} onClose={resetForm}>
          <DialogTitle>{editingTask ? 'Edit Task' : 'Add Task'}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Task Description"
              type="text"
              fullWidth
              variant="outlined"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Date"
              type="date"
              fullWidth
              variant="outlined"
              value={formatDateString(selectedDate)}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={resetForm}>Cancel</Button>
            <Button onClick={handleDialogSubmit}>{editingTask ? 'Update' : 'Add'}</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
