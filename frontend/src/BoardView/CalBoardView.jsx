import React, { useEffect, useState } from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useUser } from '../UserContext';
import { Navigate } from 'react-router-dom';

export default function CalendarBoardView() {
  const { user } = useUser();
  const [tasks, setTasks] = useState([]);

  if (!user) {
    return <Navigate to="/404" replace />;
  }

  useEffect(() => {
    if (user) {
      const fetchTasks = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/taskcalendar/getTasksByUser?userId=${user.userId}`);
          const parsedTasks = response.data.map(row => ({
            ...row,
            date: formatDateString(new Date(row.date))
          }));
          
          // Sort tasks by date ASC
          parsedTasks.sort((a, b) => new Date(a.date) - new Date(b.date));
          setTasks(parsedTasks);
        } catch (error) {
          console.error('Error fetching tasks:', error.response?.data || error.message);
        }
      };

      fetchTasks();
    }
  }, [user]);

  const formatDateString = (date) => {
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    return utcDate.toISOString().split('T')[0];
  };

  const formatDateWithDay = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
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
        {tasks.map((task) => (
          <Box
            key={task.calendarId}
            sx={{
              padding: 3,
              borderRadius: '8px',
              backgroundColor: '#dde5f8',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
              },
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                color: '#1f295a',
                fontWeight: 'bold',
                marginBottom: 1
              }}
            >
              {formatDateWithDay(task.date)}
            </Typography>
            <Typography
              sx={{
                color: '#1f295a',
              }}
            >
              {task.taskDescription}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}