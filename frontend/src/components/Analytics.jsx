import React, { useRef } from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useUser } from '../UserContext';

import TBoard from '../BoardView/TaskBoardView';
import CalendarBoardView from '../BoardView/CalBoardView';
import TimerBoardView from '../BoardView/TimerBoardView';
import NoteBoardView from '../BoardView/NotesBoardView';
import TaskAnalysis from '../TaskAnalytics/TaskAnalysis';
import TaskStats from '../TaskAnalytics/TaskCount';
import CurrentTime from '../TaskAnalytics/CurrentTIme';

const HorizontalScrollBox = () => {
  const scrollRef1 = useRef(null);
  const { user } = useUser();


  return (
    <Box sx={{ width: '100%', margin: 0 }}>
      {/* First Grid - Analytics Dashboard */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>

        <Box
          ref={scrollRef1}
          sx={{
            display: 'flex',
            overflowX: 'auto',
            borderRadius: '15px',
            width: '100%',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {/* Task Progress Box */}
          <Box
            sx={{
              minWidth: '400px',
              height: '150px',
              backgroundColor: 'white',
              borderRadius: '15px',
              margin: '0 5px',
              padding: '12px',
              overflow: 'hidden',
            }}
          >
            <Typography 
              variant="h6" 
              sx={{
                fontWeight: 'bold', 
                color: '#1f295a',
                fontSize: '1rem',
                mb: 1,
              }}
            >
              Task Progress
            </Typography>
            <Box sx={{ 
              height: 'calc(100% - 28px)',
              overflow: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
            }}>
              <TaskAnalysis />

            </Box>
          </Box>

          <Box
            sx={{
              minWidth: '400px',
              height: '150px',
              backgroundColor: 'white',
              borderRadius: '15px',
              margin: '0 5px',
              padding: '12px',
            }}
          >
            <Typography 
              variant="h6" 
              sx={{
                fontWeight: 'bold', 
                color: '#1f295a',
                fontSize: '1rem',
              }}
            >
              Number Of Task
            </Typography>
            <Box  >
              <TaskStats />
            </Box>

          </Box>

          <Box
            sx={{
              minWidth: '400px',
              height: '150px',
              backgroundColor: 'white',
              borderRadius: '15px',
              margin: '0 5px',
              padding: '12px',
            }}
          >
            <Typography 
              variant="h6" 
              sx={{
                fontWeight: 'bold', 
                color: '#1f295a',
                fontSize: '1rem',
              }}
            >
                  Current Time
            </Typography>
            <Box sx={{ 
              height: 'calc(100% - 28px)',
              overflow: 'hidden',
            }}>
              <CurrentTime />
            </Box>
          </Box>
        </Box>

      </Box>

      {/* Second Grid - Main Dashboard */}
      <Grid container spacing={0.5} sx={{ width: '100%', boxSizing: 'border-box', maxWidth: '100%', margin: '0 auto', marginTop: 4, height: '510px' }}>
        {/* To-Do List Section */}
        <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', borderRadius: '15px', padding: 2, height: '100%' }}>
          <Typography variant="h6" sx={{fontWeight: 'bold', color: '#1f295a'}}>
            To-Do List
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              borderRadius: '15px',
              height: 'calc(100% - 40px)', 
              backgroundColor: 'white',
              padding: 2,
              overflow: 'hidden',
            }}
          >
            <Box sx={{ 
              flexGrow: 1, 
              overflow: 'auto',
              height: '100%',
              width: '100%'
            }}>
              <TBoard />
            </Box>
          </Box>
        </Grid>

        {/* Schedule Section */}
        <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', borderRadius: '15px', padding: 2, height: '100%' }}>
          <Typography variant="h6" sx={{fontWeight: 'bold', color: '#1f295a'}}>   
            Schedule
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              borderRadius: '15px',
              height: 'calc(100% - 40px)', 
              backgroundColor: 'white',
              padding: 2,
              overflow: 'hidden',
            }}
          >
            <Box sx={{ 
              flexGrow: 1, 
              overflow: 'auto',
              height: '100%',
              width: '100%'
            }}>
              <CalendarBoardView />
            </Box>
          </Box>
        </Grid>

        {/* Timer Section */}
        <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', borderRadius: '15px', padding: 2, height: '100%' }}>
          <Typography variant="h6" sx={{fontWeight: 'bold', color: '#1f295a'}}>   
            Timer
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              borderRadius: '15px',
              height: 'calc(100% - 40px)', 
              backgroundColor: 'white',
              padding: 2,
              overflow: 'hidden',
            }}
          >
            <Box sx={{ 
              flexGrow: 1, 
              overflow: 'auto',
              height: '100%',
              width: '100%'
            }}>
              <TimerBoardView />
            </Box>
          </Box>
        </Grid>

        {/* Sticky Notes Section */}
        <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', borderRadius: '15px', padding: 2, height: '100%' }}>
          <Typography variant="h6" sx={{fontWeight: 'bold', color: '#1f295a'}}>   
            Notes
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              borderRadius: '15px',
              height: 'calc(100% - 40px)', 
              backgroundColor: 'white',
              padding: 2,
              overflow: 'hidden',
            }}
          >
            <Box sx={{ 
              flexGrow: 1, 
              overflow: 'auto',
              height: '100%',
              width: '100%'
            }}>
              <NoteBoardView />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HorizontalScrollBox;