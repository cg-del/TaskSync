import React, { useEffect, useState } from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/material/Typography';
import { PlayArrow, Pause } from '@mui/icons-material';
import IconButton from '@mui/joy/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';
import { useUser } from '../UserContext';
import { Navigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/joy/Button';

export default function TimerBoardView() {
  const { user } = useUser();
  const [timers, setTimers] = useState([]);
  const [playingTimerId, setPlayingTimerId] = useState(null);
  const [progress, setProgress] = useState(0);
  const [alertOpen, setAlertOpen] = useState(false);
  const intervalRef = React.useRef(null);
  const [initialDurations, setInitialDurations] = useState({});

  if (!user) {
    return <Navigate to="/404" replace />;
  }

  useEffect(() => {
    if (user) {
      const fetchTimers = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/timer/getTimersByUser`, {
            params: {
              userId: user.userId,
            },
          });
          setTimers(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
          console.error('Error fetching timers:', error.response?.data || error.message);
        }
      };

      fetchTimers();
    }
  }, [user]);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const playSound = () => {
    const audio = new Audio('/path/to/your/sound.mp3'); // Add your timer sound file
    audio.play();
  };

  const startCountdown = (timerId) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    setPlayingTimerId(timerId);
    const timer = timers.find(t => t.timerId === timerId);
    if (!timer) return;

    // Store initial duration for progress calculation
    setInitialDurations(prev => ({
      ...prev,
      [timerId]: timer.duration
    }));

    intervalRef.current = setInterval(() => {
      setTimers((prevTimers) => {
        return prevTimers.map(timer => {
          if (timer.timerId === timerId) {
            const newDuration = timer.duration - 1;
            if (newDuration <= 0) {
              clearInterval(intervalRef.current);
              setPlayingTimerId(null);
              setAlertOpen(true);
              playSound();
              return null;
            }
            // Calculate progress based on initial duration
            const initialDuration = initialDurations[timerId];
            setProgress((newDuration / initialDuration) * 100);
            return { ...timer, duration: newDuration };
          }
          return timer;
        }).filter(timer => timer !== null);
      });
    }, 1000);
  };

  const pauseCountdown = async (timerId) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      setPlayingTimerId(null);
    }

    const timer = timers.find(t => t.timerId === timerId);
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
      console.error('Error updating timer:', error.response?.data || error.message);
    }
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
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
        {timers.map((timer) => {
          const initialDuration = initialDurations[timer.timerId] || timer.duration;
          const currentProgress = (timer.duration / initialDuration) * 100;

          return (
            <Box
              key={timer.timerId}
              sx={{
                padding: 3,
                borderRadius: '8px',
                backgroundColor: timer.timerId === playingTimerId ? 'rgba(66, 89, 193, 0.1)' : '#dde5f8',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                },
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography
                  sx={{
                    color: '#1f295a',
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                  }}
                >
                  {formatTime(timer.duration)}
                </Typography>
                <Box>
                  {playingTimerId === timer.timerId ? (
                    <IconButton onClick={() => pauseCountdown(timer.timerId)} sx={{ color: '#4259c1' }}>
                      <Pause />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => startCountdown(timer.timerId)} sx={{ color: '#4259c1' }}>
                      <PlayArrow />
                    </IconButton>
                  )}
                </Box>
              </Box>
              {timer.timerId === playingTimerId && (
                <LinearProgress
                  variant="determinate"
                  value={currentProgress}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: 'rgba(66, 89, 193, 0.2)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: '#4259c1',
                    },
                  }}
                />
              )}
            </Box>
          );
        })}
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
    </Box>
  );
}