import { Delete, Edit, Pause, PlayArrow } from '@mui/icons-material';
import {
  Box,
  Button,
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from '@mui/material'; // Keep this for other components
import Typography from '@mui/joy/Typography'; // Updated import for Typography
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import timerSound from '../assets/timersound.wav';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

const Timer = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [timers, setTimers] = useState([]);
  const [form, setForm] = useState({ hours: 0, minutes: 0, seconds: 0, timerId: null });
  const [isEditing, setIsEditing] = useState(false);
  const intervalRef = useRef(null);
  const [playingTimerId, setPlayingTimerId] = useState(null);
  const [initialDurations, setInitialDurations] = useState({});
  const [alertOpen, setAlertOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [timerToDelete, setTimerToDelete] = useState(null);
  const [openConfirmUpdate, setOpenConfirmUpdate] = useState(false);

  useEffect(() => {
    if (!user) {
      console.error('User is not available');
      navigate('/loginv2');
      return;
    }
  
    console.log('User object:', user); 
  
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = parseInt(value, 10);

    // Allow any numeric input, including zero
    setForm((prevForm) => ({ ...prevForm, [name]: isNaN(parsedValue) ? 0 : parsedValue }));
  };

  const handleCreateTimer = async () => {
    const totalSeconds = form.hours * 3600 + form.minutes * 60 + form.seconds;
    
    if (totalSeconds <= 0) {
      return; 
    }

    try {
      const response = await axios.post('http://localhost:8080/api/timer/postTimer', {
        user: {
          username: user.username,
          email: user.email,
          password: user.password,
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

  const handleUpdateTimer = () => {
    setOpenConfirmUpdate(true); 
  };

  const handleConfirmUpdate = async () => {
    const totalSeconds = form.hours * 3600 + form.minutes * 60 + form.seconds;
    try {
      const response = await axios.put(`http://localhost:8080/api/timer/putTimer?id=${form.timerId}`, {
        user: {
          username: user.username,
          email: user.email,
          password: user.password,
          occupation: user.occupation,
        },
        duration: totalSeconds,
      });
      setTimers((prevTimers) => prevTimers.map(timer => (timer.timerId === form.timerId ? response.data : timer)));
      setForm({ hours: 0, minutes: 0, seconds: 0, timerId: null });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating timer:', error.response ? error.response.data : error.message);
    } finally {
      setOpenConfirmUpdate(false); // Close the confirmation modal
    }
  };

  const handleCloseConfirmUpdate = () => {
    setOpenConfirmUpdate(false); // Close the confirmation modal without action
  };

  const handleDeleteTimer = async () => {
    if (timerToDelete) {
      try {
        await axios.delete(`http://localhost:8080/api/timer/deleteTimer/${timerToDelete}`);
        
        setTimers((prevTimers) => prevTimers.filter(timer => timer.timerId !== timerToDelete));
  
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        
        console.log(`Timer with ID ${timerToDelete} deleted successfully.`);
      } catch (error) {
        const errorMessage = error.response?.data || error.message;
        console.error(`Error deleting timer: ${errorMessage}`);
      } finally {
        setOpen(false); // Close the modal after deletion
        setTimerToDelete(null); // Reset the timer ID
      }
    }
  };

  const startCountdown = (timerId) => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    setPlayingTimerId(timerId); 

    setInitialDurations((prev) => ({
      ...prev,
      [timerId]: prev[timerId] || timers.find(timer => timer.timerId === timerId).duration,
    }));

    intervalRef.current = setInterval(() => {
      setTimers((prevTimers) => {
        return prevTimers.map(timer => {
          if (timer.timerId === timerId) {
            const newDuration = timer.duration - 1;
            if (newDuration <= 0) {
              clearInterval(intervalRef.current);
              handleDeleteTimer(timerId);
              setPlayingTimerId(null); // Reset playing timer
              setAlertOpen(true);
              playSound(); // Play sound
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
  
    const timer = timers.find(timer => timer.timerId === timerId);
    if (!timer) return;
  
    try {
      await axios.put(`http://localhost:8080/api/timer/putTimer?id=${timerId}`, {
        user: {
          username: user.username,
          email: user.email,
          password: user.password, 
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
    return `🕧 ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const playSound = () => {
    const audio = new Audio(timerSound);
    audio.play();
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handleCancelUpdate = () => {
    if (isEditing) {
      // If editing, just reset the form
      setForm({ hours: 0, minutes: 0, seconds: 0, timerId: null });
      setIsEditing(false);
    }
  };

  return (
    <Box
      p={4}
      sx={{
        backgroundPosition: 'center',
        borderRadius: 3,
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      <Typography level="h4" gutterBottom sx={{ width: 'max-content' }}>
        Study Timer 📚
      </Typography>

      {user ? (
        <>
          <Grid container spacing={4} sx={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
            <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #ddd', borderRadius: 2, padding: 2, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'}}>
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <TextField
                  label="Hours"
                  type="number"
                  name="hours"
                  value={form.hours}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  margin="normal"
                  sx={{
                    width: '80px',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#00796b',
                      },
                      '&:hover fieldset': {
                        borderColor: '#004d40',
                      },
                    },
                  }}
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
                  sx={{
                    width: '80px',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#00796b',
                      },
                      '&:hover fieldset': {
                        borderColor: '#004d40',
                      },
                    },
                  }}
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
                  sx={{
                    width: '80px',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#00796b',
                      },
                      '&:hover fieldset': {
                        borderColor: '#004d40',
                      },
                    },
                  }}
                />
              </Box>
              <Box display="flex" gap={2}>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: '#00796b',
                    '&:hover': {
                      borderColor: '#004d40',
                    },
                  }}
                  onClick={isEditing ? handleUpdateTimer : handleCreateTimer}
                >
                  {isEditing ? 'Update Timer' : 'Create Timer'}
                </Button>
                {isEditing && (
                  <Button
                    variant="outlined"
                    sx={{
                      
                      borderColor: '#00796b',
                      '&:hover': {
                        borderColor: '#004d40',
                      },
                    }}
                    onClick={handleCancelUpdate}
                  >
                    Cancel Update
                  </Button>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  borderRadius: 2,
                  padding: 2,
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Typography
                  level="h6"
                  sx={{
                    backgroundShadow: '0 2px 4px rgba(0, 0, 0, 1)',
                  }}
                >
                  Current Time
                </Typography>
                <Typography
                  level="h4"
                  sx={{
                    color: '#004d40',
                  }}
                >
                  {currentTime.toLocaleTimeString()}
                </Typography>
              </Box>
            </Grid>
          </Grid>


          <List
            sx={{
              marginTop: 4,
              minHeight: '300px',
              overflow: 'auto',
              borderRadius: 2,
              width: '80%',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              border: '1px solid #ddd',
            }}
          >
            {timers.map((timer) => {
              const initialDuration = initialDurations[timer.timerId] || timer.duration;
              const progress = (timer.duration / initialDuration) * 100;

              return (
                <ListItem
                  key={timer.timerId}
                  sx={{
                    borderBottom: '1px solid #ddd',
                    backgroundColor: timer.timerId === playingTimerId ? 'rgba(224, 247, 250, 0.9)' : 'rgba(255, 255, 255, 0.8)',
                    '&:hover': {
                      backgroundColor: 'rgba(240, 248, 255, 0.8)',
                    },
                    borderRadius: 1,
                    margin: '4px 0',
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography level="body1" >
                        Time Remaining: {formatTime(timer.duration)}
                      </Typography>
                    }
                  />
                  {timer.timerId === playingTimerId && (
                    <LinearProgress
                      variant="determinate"
                      value={progress}
                      sx={{
                        width: '100%',
                        marginTop: 1,
                        height: 10,
                        borderRadius: 5,
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: '#00796b',
                        },
                      }}
                    />
                  )}
                  <IconButton color="secondary" onClick={() => handleEditTimer(timer)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => { setTimerToDelete(timer.timerId); setOpen(true); }}>
                    <Delete />
                  </IconButton>
                  <IconButton color="primary" onClick={() => startCountdown(timer.timerId)}>
                    <PlayArrow />
                  </IconButton>
                  <IconButton color="default" onClick={() => pauseCountdown(timer.timerId)}>
                    <Pause />
                  </IconButton>
                </ListItem>
              );
            })}
          </List>
        </>
      ) : (
        <Typography level="h6" color="error" sx={{ }}>
          Please log in to manage timers.
        </Typography>
      )}

      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
        message="Timer has finished!"
        action={
          <Button color="inherit" size="small" onClick={handleAlertClose}>
            Close
          </Button>
        }
      />

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          Confirmation
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Typography level="body1" sx={{ fontFamily: 'YourDesiredFont, sans-serif', fontSize: '16px' }}>
              Are you sure you want to discard this timer?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleDeleteTimer}>
            Discard Timer
          </Button>
          <Button variant="outlined" color="neutral" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openConfirmUpdate} onClose={handleCloseConfirmUpdate}>
        <DialogTitle>
          Confirm Update
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Typography level="body1" sx={{ fontFamily: 'YourDesiredFont, sans-serif', fontSize: '16px' }}>
            Are you sure you want to proceed with the update?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleConfirmUpdate}>
            Update
          </Button>
          <Button variant="outlined" color="neutral" onClick={handleCloseConfirmUpdate}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Timer;