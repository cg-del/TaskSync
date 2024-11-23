import { Delete, Edit, Pause, PlayArrow, Add } from '@mui/icons-material';
import {
  Box,
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  TextField,
  Dialog,
  Divider,
} from '@mui/material'; // Keep this for other components
import Typography from '@mui/joy/Typography'; // Updated import for Typography
import Modal from '@mui/joy/Modal'; // Use Joy UI Modal
import ModalDialog from '@mui/joy/ModalDialog'; // Use Joy UI ModalDialog
import DialogTitle from '@mui/joy/DialogTitle'; // Use Joy UI DialogTitle
import DialogContent from '@mui/joy/DialogContent'; // Use Joy UI DialogContent
import DialogActions from '@mui/joy/DialogActions'; // Use Joy UI DialogActions
import StopCircleIcon from '@mui/icons-material/StopCircle'; 

import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import timerSound from '../assets/timersound.wav';
import Button from '@mui/joy/Button';

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
  const [countdown, setCountdown] = useState(0);
  const [progress, setProgress] = useState(0); // State to hold the progress value
  const largeTimerRef = useRef(null); // Create a ref for the large timer display
  const [isPlaying, setIsPlaying] = useState(false); // State to track if the timer is playing



  useEffect(() => {
    if (!user) {
      console.error('User is not available');
      navigate('/login');
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
    setIsPlaying(true); // Set playing state to true

    const initialDuration = timers.find(timer => timer.timerId === timerId).duration;
    setInitialDurations((prev) => ({
      ...prev,
      [timerId]: initialDuration,
    }));

    if (largeTimerRef.current) {
      largeTimerRef.current.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the element
    }

    intervalRef.current = setInterval(() => {
      setTimers((prevTimers) => {
        return prevTimers.map(timer => {
          if (timer.timerId === timerId) {
            const newDuration = timer.duration - 1;
            if (newDuration <= 0) {
              clearInterval(intervalRef.current);
              setPlayingTimerId(null); // Reset playing timer
              setAlertOpen(true);
              playSound(); // Play sound
              return null; // Mark timer for removal
            }
            return { ...timer, duration: newDuration };
          }
          return timer;
        }).filter(timer => timer !== null); // Remove completed timers
      });
    }, 1000); // Decrease duration every second
  };

  const pauseCountdown = (timerId) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      setIsPlaying(false); // Set playing state to false
    }
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
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
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none', 
      }}
    >
      {/* Large Timer Display */}
      <Box
        ref={largeTimerRef}
        sx={{
          
          width: '100%',
          height: '400px',
          userSelect: 'none', 
          backgroundColor: 'white',
          borderRadius: '15px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          color: 'white',
          marginBottom: '20px',
        }}
      >
        <Typography 
          variant="h1" 
          component="div"
          sx={{
            color: '#4259c1',
            fontWeight: 'bold',
            fontSize: '10rem',
          }}
        >
          {formatTime(timers.find(timer => timer.timerId === playingTimerId)?.duration || 0)}
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <Button 
            onClick={() => startCountdown(playingTimerId)} 
            sx={{
              background: 'transparent', 
              border: 'none', 
              borderRadius: '50%',
              cursor: isPlaying ? 'not-allowed' : 'pointer',
              padding: 0,
              marginRight: 2,
              '&:hover': {
                backgroundColor: 'rgba(66, 89, 193, 0.1)',
              },
            }}
          >
            <PlayArrow sx={{ fontSize: '4rem', color: '#4259c1' }} />
          </Button>
          <Button 
            onClick={() => pauseCountdown(playingTimerId)} 
            sx={{
              background: 'transparent', 
              border: 'none', 
              borderRadius: '50%',
              cursor: !isPlaying ? 'not-allowed' : 'pointer',
              padding: 0,
              marginLeft: 2,
              '&:hover': {
                backgroundColor: 'rgba(66, 89, 193, 0.1)',
              },
            }}
          >
            <StopCircleIcon sx={{ fontSize: '4rem', color: '#4259c1' }} /> 
          </Button>
        </Box>
      </Box>

      {/* User Timers List */}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {user ? (
          <>
            <Grid container sx={{ width: '100%', maxWidth: '100%', margin: '0 auto'}}>
            <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', borderRadius: '15px', padding: 2,}}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    height: '95%',
                    borderRadius: '15px',
                  }}
                >
                  <Typography
                  sx={{
                    fontSize: '1rem',
                    
                  }}
                  >
                    Current Time
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      color: '#30418e',
                      fontWeight: 'bold',
                      fontSize: '3rem',
                    }}
                  >
                    {currentTime.toLocaleTimeString()}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6} alignItems="center" justifyContent="center"  sx={{ display: 'flex', flexDirection: 'row', justifyContent:'space-between',border: '1px solid #ddd', borderRadius: '15px', padding: 2, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', backgroundColor: '#f3f3fa',}}>
                <Box display="flex" gap={2} ml={3}>
                  <TextField
                    label="Hours"
                    color='#4259c1'
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
                          borderColor: '#4259c1', color: '#4259c1',
                        },
                        '&:hover fieldset': {
                          borderColor: '#4259c1',
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
                          borderColor: '#4259c1', color: '#4259c1',
                        },
                        '&:hover fieldset': {
                          borderColor: '#4259c1',
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
                          borderColor: '#4259c1', color: '#4259c1',
                        },
                        '&:hover fieldset': {
                          borderColor: '#4259c1',
                        },
                      },
                    }}
                  />
                </Box>
                <Box gap={2} display={'flex'} alignItems={'center'} justifyContent={'center'} marginLeft={5} marginRight={4}>
                  <Button
                    variant="outlined"

                    sx={{
                      borderColor: '#4259c1', color: '#4259c1',
                    }}
                    onClick={isEditing ? handleUpdateTimer : handleCreateTimer}
                  >
                    {isEditing ? 'Update Timer' : 'Add Timer'}
                  </Button>
                  {isEditing && (
                    <Button
                      variant="outlined"
                      sx={{
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
            </Grid>

            <List
              sx={{
                marginTop: 4,
                minHeight: '230px',
                padding: '5px',
                borderRadius: '15px',
                width: '99%',
                backgroundColor: 'white',
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
                      backgroundColor: timer.timerId === playingTimerId ? 'rgba(101, 119, 197, 0.5)' : 'rgba(243, 243, 250, 0.5)', // Lowered opacity for #6577c5
                      '&:hover': {
                        backgroundColor: 'rgba(101, 119, 197, .3)', // Adjust hover color if needed
                      },
                      borderRadius: '15px',
                      width: '100%',
                      overflow: 'hidden',
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography level="body1" sx={{fontWeight: 'bold'}}>
                          {formatTime(timer.duration)}
                        </Typography>
                      }
                    />
                    {timer.timerId === playingTimerId && (
                      <LinearProgress
                        variant="determinate"
                        value={progress}  
                        sx={{
                          width: '80%',
                          height: 10,
                          borderRadius: 5,
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: '#1f295a',
                          },
                          '& .MuiLinearProgress-root': {
                            backgroundColor: '#e0e0e0',
                          },
                        }}
                      />
                    )}
                    <IconButton sx={{ color: '#4259c1' }} onClick={() => handleEditTimer(timer)}>
                      <Edit />
                    </IconButton>
                    <IconButton sx={{ color: '#4259c1' }} onClick={() => { setTimerToDelete(timer.timerId); setOpen(true); }}>
                      <Delete />
                    </IconButton>
                    <IconButton sx={{ color: '#4259c1' }} onClick={() => startCountdown(timer.timerId)}>
                      <PlayArrow />
                    </IconButton>
                    <IconButton sx={{ color: '#4259c1' }} onClick={() => pauseCountdown(timer.timerId)}>
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
      </Box>

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

      {/* Delete Confirmation Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>Delete Timer</DialogTitle>
          <Divider />
          <DialogContent>
            Are you sure you want to delete this Timer?
          </DialogContent>
          <DialogActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setOpen(false)}
              sx={{ textTransform: 'none', paddingLeft: 0, paddingRight: 0 }}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              color="danger"
              onClick={handleDeleteTimer}
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

      {/* Update Confirmation Modal */}
      <Dialog open={openConfirmUpdate} onClose={handleCloseConfirmUpdate}
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: '15px',
            width: '400px',
            padding: '20px',
          },
        }}
      >
        <DialogTitle>
          Confirm Update
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Typography level="body1" sx={{ fontFamily: 'YourDesiredFont, sans-serif', fontSize: '16px', padding: '20px 0px 20px 0px' }}>
            Are you sure you want to proceed with the update?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleConfirmUpdate} sx={{margin:'4px'}}>
            Update
          </Button>
          <Button variant="contained" color="neutral" onClick={handleCloseConfirmUpdate}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Timer;