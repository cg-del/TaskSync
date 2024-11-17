import React, { useEffect, useState } from 'react';
import Table from '@mui/joy/Table';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Add from '@mui/icons-material/Add';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import Typography from '@mui/joy/Typography';
import axios from 'axios';
import { useUser } from '../UserContext';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import "../css/Calendar.css";
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Divider from '@mui/joy/Divider';

export default function TaskCalendar() {
  const { user } = useUser();
  const [rows, setRows] = useState([]);
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const taskColors = [
    '#ffd54f', '#ff8a80', '#80deea', '#b388ff', '#c5e1a5', '#ffcc80', '#e1bee7'
  ];

  const formatDateString = (date) => {
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    return utcDate.toISOString().split('T')[0]; 
  };
  
  useEffect(() => {
    const fetchAllTasks = async () => {
      if (user) {
        try {
          const response = await axios.get(`http://localhost:8080/api/taskcalendar/getTasksByUser?userId=${user.userId}`);
          const parsedTasks = response.data.map(row => ({
            ...row,
            date: formatDateString(new Date(row.date))
          }));

          // Sort tasks by date ASC
          parsedTasks.sort((a, b) => new Date(a.date) - new Date(b.date));

          setRows(parsedTasks);
        } catch (error) {
          console.error('Error fetching tasks:', error.response?.data || error.message);
        }
      } else {
        console.log('No user logged in');
      }
    };
  
    fetchAllTasks();
  }, [user]);

  useEffect(() => {
    console.log('Current tasks:', rows);
  }, [rows]);

  const groupTasksByDate = (tasks) => {
    return tasks.reduce((acc, task) => {
      (acc[task.date] = acc[task.date] || []).push(task);
      return acc;
    }, {});
  };

  const groupedTasks = groupTasksByDate(rows);

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
      setRows(prevRows => {
        const updatedRows = [...prevRows, { ...response.data, date: formatDateString(new Date(response.data.date)) }];
        
        // Sort tasks by date ASC after adding new task
        updatedRows.sort((a, b) => new Date(a.date) - new Date(b.date));
        return updatedRows;
      });
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
      setRows(prevRows => {
        const updatedRows = prevRows.map(row => (row.calendarId === editingTask.calendarId ? { ...response.data, date: formatDateString(new Date(response.data.date)) } : row));
        
        // Sort tasks by date ASC after updating task
        updatedRows.sort((a, b) => new Date(a.date) - new Date(b.date));
        return updatedRows;
      });
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
    
    try {
      await axios.delete(`http://localhost:8080/api/taskcalendar/deleteTaskCal/${calendarId}`);
      setRows(prevRows => {
        const updatedRows = prevRows.filter(row => row.calendarId !== calendarId);
        
        // Sort tasks by date ASC after deleting task
        updatedRows.sort((a, b) => new Date(a.date) - new Date(b.date));
        return updatedRows;
      });
    } catch (error) {
      console.error('Error deleting task:', error.response?.data || error.message);
    }
  };

  const openDeleteConfirmation = (calendarId) => {
    setTaskToDelete(calendarId);
    setOpenConfirmation(true);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      handleDeleteTask(taskToDelete);
      setOpenConfirmation(false);
    }
  };

  const handleCancelDelete = () => {
    setOpenConfirmation(false);
  };

  const tileClassName = ({ date }) => {
    const calendarDate = formatDateString(date);
    const taskClasses = rows
      .filter(row => row.date === calendarDate)
      .map((task, index) => `task-highlight-${index % taskColors.length}`)
      .join(' ');

    const className = taskClasses + (taskClasses ? ' has-tasks' : ' no-tasks');
    console.log(`Date: ${calendarDate}, Classes: ${className}`);
    return className;
  };

  const formatDateWithDay = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  return (
    <Box sx={{ display: 'flex', gap: 4 }}>
      <div style={{ flexShrink: 0, maxHeight: '500px', overflowY: 'auto' }}>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          onClickDay={(date) => setSelectedDate(date)}
          locale="en-US"
          tileClassName={tileClassName}
          firstDayOfWeek={0}
        />
      </div>

      <Box sx={{ flex: 1 }}>
        <Typography variant="h4">Tasks</Typography>
        <Button
          variant="outlined"
          color="neutral"
          startDecorator={<Add />}
          onClick={() => handleDialogOpen()}
        >
          Add Task
        </Button>
        {Object.keys(groupedTasks).map((date) => (
          <div key={date}>
            <Typography 
              variant="h6" 
              sx={{ 
                marginTop: 2, 
                color: '#1976d2',  // Blue color
                fontWeight: 'bold'
              }}
            >
              {formatDateWithDay(date)}
            </Typography>
            <Table>
              <thead>
                <tr>
                  <th>Task Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {groupedTasks[date].map((task) => (
                  <tr key={task.calendarId}>
                    <td>{task.taskDescription}</td>
                    <td>
                      <Button
                        variant="outlined"
                        startDecorator={<Edit />}
                        onClick={() => handleDialogOpen(task)}
                        sx={{ marginRight: 1 }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        startDecorator={<Delete />}
                        onClick={() => openDeleteConfirmation(task.calendarId)}
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
        ))}
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
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={resetForm} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDialogSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Box>

      <Modal open={openConfirmation} onClose={handleCancelDelete}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>Delete Task</DialogTitle>
          <Divider />
          <DialogContent>
            Are you sure you want to delete this task?
          </DialogContent>
          <DialogActions sx={{ display: 'flex', justifyContent: 'flex-end'}}>
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
              onClick={handleConfirmDelete}
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
    </Box>
  );
}
  