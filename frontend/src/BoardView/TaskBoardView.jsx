import React, { useEffect, useState } from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/joy/Checkbox';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { useUser } from '../UserContext';
import { Navigate } from 'react-router-dom';

export default function TaskDashboard() {
  const { user } = useUser();
  const [tasks, setTasks] = useState([]);
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
          setTasks(response.data);
        } catch (error) {
          console.error('Error fetching tasks:', error.response?.data || error.message);
        }
      };

      fetchTasks();
    }
  }, [user]);

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
      const taskToUpdate = tasks.find(task => task.taskId === selectedTaskId);
      const response = await axios.put(`http://localhost:8080/api/task/updateTask/${selectedTaskId}`, {
        description: taskToUpdate.description,
        isComplete: true,
        user: { email: user.email },
      });

      setTasks((prevTasks) => prevTasks.map((task) => 
        task.taskId === selectedTaskId ? response.data : task
      ));
      setAnchorElComplete(null);
    } catch (error) {
      console.error('Error updating task status:', error.response?.data || error.message);
    }
  };

  const handleUncompleteTask = async () => {
    if (!selectedTaskId) return;

    try {
      const taskToUpdate = tasks.find(task => task.taskId === selectedTaskId);
      const response = await axios.put(`http://localhost:8080/api/task/updateTask/${selectedTaskId}`, {
        description: taskToUpdate.description,
        isComplete: false,
        user: { email: user.email },
      });

      setTasks((prevTasks) => prevTasks.map((task) => 
        task.taskId === selectedTaskId ? response.data : task
      ));
      setAnchorElUncomplete(null);
    } catch (error) {
      console.error('Error updating task status:', error.response?.data || error.message);
    }
  };

  const handleMenuClose = () => {
    setAnchorElComplete(null);
    setAnchorElUncomplete(null);
  };

  return (
    <Box sx={{ 
      width: '100%',
      height: '100%',
    }}>
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxHeight: '80vh',
        padding: 2,
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: '#f1f1f1',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#4259c1',
          borderRadius: '4px',
        },
      }}>
        {tasks
          .filter(task => !task.isComplete)
          .map((task) => (
          <Box
            key={task.taskId}
            sx={{
              padding: 3,
              borderRadius: '8px',
              backgroundColor: '#dde5f8',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
              },
            }}
          >
            <Checkbox 
              checked={task.isComplete}
              onChange={(e) => handleCheckboxChange(e, task.taskId, task.isComplete)}
              sx={{ 
                color: '#4259c1',
                '&.Mui-checked': {
                  color: '#4259c1',
                },
              }}
            />
            <Typography
              sx={{
                color: '#1f295a',
                textDecoration: task.isComplete ? 'line-through' : 'none',
                opacity: task.isComplete ? 0.7 : 1,
              }}
            >
              {task.description}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Menu for completing tasks */}
      <Menu
        anchorEl={anchorElComplete}
        open={Boolean(anchorElComplete)}
        onClose={handleMenuClose}
      >
        <MenuItem 
          onClick={handleCompleteTask}
          sx={{ 
            color: '#4259c1',
            '&:hover': {
              backgroundColor: 'rgba(66, 89, 193, 0.1)',
            },
          }}
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
          onClick={handleUncompleteTask}
          sx={{ 
            color: '#4259c1',
            '&:hover': {
              backgroundColor: 'rgba(66, 89, 193, 0.1)',
            },
          }}
        >
          Mark as Uncomplete
        </MenuItem>
      </Menu>
    </Box>
  );
}