import React, { useEffect, useState } from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import { useUser } from '../UserContext';
import axios from 'axios';

export default function TaskStats() {
  const { user } = useUser();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

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
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return null;
  }

  return (
    <Box sx={{ padding: 0 }}>
      <Card
        variant="outlined"
        sx={{
          maxWidth: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          backgroundColor: 'transparent',
          boxShadow: 'none',
          marginTop: 2
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography level="body-sm">Total Tasks:</Typography>
            <Typography level="body-sm" fontWeight="bold">{tasks.length}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography level="body-sm">Completed:</Typography>
            <Typography level="body-sm" fontWeight="bold" sx={{ color: 'success.main' }}>
              {tasks.filter(task => task.isComplete).length}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography level="body-sm">Pending:</Typography>
            <Typography level="body-sm" fontWeight="bold" sx={{ color: 'warning.main' }}>
              {tasks.filter(task => !task.isComplete).length}
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}