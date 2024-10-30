import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';

const Timer = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [timers, setTimers] = useState([]);
  const [form, setForm] = useState({ hours: 0, minutes: 0, seconds: 0, timerId: null });
  const [isEditing, setIsEditing] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!user) {
      console.error('User is not available');
      navigate('/login');
      return;
    }
  
    console.log('User object:', user); // Log the entire user object
  
    if (!user.userId) {
      console.error('User ID is not available');
      return;
    }
  
    const fetchTimers = async () => {
      try {
        console.log('Fetching timers for user ID:', user.userId);
  
        const response = await axios.get(`http://localhost:8080/api/timer/getTimersByUser`, {
          params: {
            userId: user.userId,
          },
        });
  
        setTimers(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching timers:', error.response ? error.response.data : error.message);
      }
    };
  
    fetchTimers();
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: parseInt(value, 10) || 0 }));
  };

  const handleCreateTimer = async () => {
    const totalSeconds = form.hours * 3600 + form.minutes * 60 + form.seconds;
    try {
      const response = await axios.post('http://localhost:8080/api/timer/postTimer', {
        user: {
          username: user.username,
          email: user.email,
          password: user.password, // Ensure this is handled securely
          occupation: user.occupation,
        },
        duration: totalSeconds,
      });
      setTimers((prevTimers) => [...prevTimers, response.data]);
      setForm({ hours: 0, minutes: 0, seconds: 0, timerId: null });
    } catch (error) {
      console.error('Error creating timer:', error.response ? error.response.data : error.message);
    }
  };

  const handleEditTimer = (timer) => {
    const hours = Math.floor(timer.duration / 3600);
    const minutes = Math.floor((timer.duration % 3600) / 60);
    const seconds = timer.duration % 60;
    setForm({ hours, minutes, seconds, timerId: timer.timerId });
    setIsEditing(true);
  };

  const handleUpdateTimer = async () => {
    const totalSeconds = form.hours * 3600 + form.minutes * 60 + form.seconds;
    try {
      const response = await axios.put(`http://localhost:8080/api/timer/putTimer?id=${form.timerId}`, {
        user: {
          username: user.username,
          email: user.email,
          password: user.password, // Ensure this is handled securely
          occupation: user.occupation,
        },
        duration: totalSeconds,
      });
      setTimers((prevTimers) => prevTimers.map(timer => (timer.timerId === form.timerId ? response.data : timer)));
      setForm({ hours: 0, minutes: 0, seconds: 0, timerId: null });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating timer:', error.response ? error.response.data : error.message);
    }
  };

  const handleDeleteTimer = async (timerId) => {
    try {
      // Send DELETE request to the server
      await axios.delete(`http://localhost:8080/api/timer/deleteTimer/${timerId}`);
      
      // Update the timers list by filtering out the deleted timer
      setTimers((prevTimers) => prevTimers.filter(timer => timer.timerId !== timerId));
  
      // Clear interval if it’s running
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      console.log(`Timer with ID ${timerId} deleted successfully.`);
    } catch (error) {
      const errorMessage = error.response?.data || error.message;
      console.error(`Error deleting timer: ${errorMessage}`);
      alert(`Failed to delete timer: ${errorMessage}`);
    }
  };
  

  const startCountdown = (timerId) => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setTimers((prevTimers) => {
        return prevTimers.map(timer => {
          if (timer.timerId === timerId) {
            const newDuration = timer.duration - 1;
            if (newDuration <= 0) {
              clearInterval(intervalRef.current);
              handleDeleteTimer(timerId);
              return null;
            }
            return { ...timer, duration: newDuration };
          }
          return timer;
        }).filter(timer => timer !== null);
      });
    }, 1000); // Decrease duration every second
  };

  const pauseCountdown = async (timerId) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  
    // Find the timer that is being paused
    const timer = timers.find(timer => timer.timerId === timerId);
    if (!timer) return;
  
    try {
      // Update the timer's duration in the database
      await axios.put(`http://localhost:8080/api/timer/putTimer?id=${timerId}`, {
        user: {
          username: user.username,
          email: user.email,
          password: user.password, // Ensure this is handled securely
          occupation: user.occupation,
        },
        duration: timer.duration,
      });
      console.log(`Timer with ID ${timerId} paused and updated in the database.`);
    } catch (error) {
      console.error('Error updating timer:', error.response ? error.response.data : error.message);
    }
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Timer Management
      </Typography>
      {user ? (
        <>
          <Typography variant="h6" gutterBottom>
            Hello, {user.username}!
          </Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <TextField
              label="Hours"
              type="number"
              name="hours"
              value={form.hours}
              onChange={handleChange}
              required
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Minutes"
              type="number"
              name="minutes"
              value={form.minutes}
              onChange={handleChange}
              required
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Seconds"
              type="number"
              name="seconds"
              value={form.seconds}
              onChange={handleChange}
              required
              variant="outlined"
              margin="normal"
            />
          </Box>
          {isEditing ? (
            <Button variant="contained" color="primary" onClick={handleUpdateTimer}>
              Update Timer
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleCreateTimer}>
              Create Timer
            </Button>
          )}

          <Typography variant="h5" mt={4}>
            Existing Timers
          </Typography>
          <List>
            {timers.map((timer) => (
              <ListItem key={timer.timerId}>
                <ListItemText
                  primary={`Time Remaining: ${formatTime(timer.duration)}`}
                />
                <Button variant="outlined" color="secondary" onClick={() => handleEditTimer(timer)}>
                  Edit
                </Button>
                <Button variant="outlined" color="error" onClick={() => handleDeleteTimer(timer.timerId)}>
                  Delete
                </Button>
                <Button variant="outlined" color="primary" onClick={() => startCountdown(timer.timerId)}>
                  Start
                </Button>
                <Button variant="outlined" color="default" onClick={() => pauseCountdown(timer.timerId)}>
                  Pause
                </Button>
              </ListItem>
            ))}
          </List>
        </>
      ) : (
        <Typography variant="h6" color="error">
          Please log in to manage timers.
        </Typography>
      )}
    </Box>
  );
};

export default Timer;