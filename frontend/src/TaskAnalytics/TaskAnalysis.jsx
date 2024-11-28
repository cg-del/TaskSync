import React, { useEffect, useState } from 'react';
import Box from '@mui/joy/Box';
import CircularProgress from '@mui/joy/CircularProgress';
import Typography from '@mui/joy/Typography';
import { useUser } from '../UserContext';
import { useCountUp } from 'use-count-up';
import axios from 'axios';

export default function TaskAnalysis() {
  const { user } = useUser();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [percentage, setPercentage] = useState(0);

  const { value: animatedValue } = useCountUp({
    isCounting: true,
    duration: 1,
    start: 0,
    end: percentage,
    onComplete: () => {
      // Optional: Add any completion logic here
    },
  });

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8080/api/task/getTasksByUser?userId=${user.userId}`);
      setTasks(response.data);
      const newPercentage = calculateCompletionPercentage(response.data);
      setPercentage(newPercentage);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateCompletionPercentage = (taskList) => {
    if (taskList.length === 0) return 0;
    const completedTasks = taskList.filter(task => task.isComplete).length;
    return Math.round((completedTasks / taskList.length) * 100);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2,
      height: '100%',
      width: '100%',
      marginRight: 12
    }}>
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}>
        <CircularProgress
          determinate
          value={animatedValue}
          size="lg"
          thickness={12}
          sx={{
            '--CircularProgress-size': '100px',
            '--CircularProgress-trackThickness': '6px',
            '--CircularProgress-progressThickness': '6px',
            color: '#4259c1',
          }}
        />
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'flex-start'
        }}>
          <Typography 
            level="h2" 
            sx={{ 
              fontSize: '1.8rem', 
              fontWeight: 'bold',
              color: '#4259c1',
              lineHeight: 1
            }}
          >
            {Math.round(animatedValue)}%
          </Typography>
          <Typography 
            level="body-sm" 
            sx={{ 
              color: '#666',
              fontSize: '1rem'
            }}
          >
            Tasks Completed
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}