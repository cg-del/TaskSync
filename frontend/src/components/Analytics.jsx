import React, { useRef } from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useUser } from '../UserContext'; // Import the useUser hook

import TBoard from '../BoardView/TaskBoardView';
import CalendarBoardView from '../BoardView/CalBoardView';
import TimerBoardView from '../BoardView/TimerBoardView';
import NoteBoardView from '../BoardView/NotesBoardView';

const HorizontalScrollBox = () => {
  const scrollRef1 = useRef(null);
  const { user } = useUser(); // Use the useUser hook to get the current user

  const scrollLeft = (ref) => {
    ref.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = (ref) => {
    ref.current.scrollBy({ left: 200, behavior: 'smooth' });
  };

  return (
    <Box sx={{ width: '100%', margin: 0 }}>
      {/* First Grid */}
      <Box sx={{ display: 'flex', alignItems: 'center', }}>
        <Button onClick={() => scrollLeft(scrollRef1)}>
          <ArrowBackIosIcon />
        </Button>
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
          {[...Array(3)].map((_, index) => (
            <Box
              key={index}
              sx={{
                minWidth: '450px',
                height: '150px',
                backgroundColor: 'white',
                borderRadius: '15px',
                margin: '0 5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {user ? `Box ${index + 1} - ${user.username}` : `Box ${index + 1}`}
            </Box>
          ))}
        </Box>
        <Button onClick={() => scrollRight(scrollRef1)}>
          <ArrowForwardIosIcon />
        </Button>
      </Box>

      {/* Second Grid */}
      <Grid container spacing={0.5} sx={{ width: '100%', boxSizing: 'border-box', maxWidth: '100%', margin: '0 auto', marginTop: 4, height: '500px',  }}>
        <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', borderRadius: '15px', padding: 2, height: '100%',}}>
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
              overflow: 'hidden', // Added overflow hidden
            }}
          >
                {/*Contents needed*/}
                <Box sx={{ 
                  flexGrow: 1, 
                  overflow: 'auto',  // Changed to auto
                  height: '100%',    // Added height 100%
                  width: '100%'      // Added width 100%
                }}>
              <TBoard />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', borderRadius: '15px', padding: 2 , height: '100%',}}>
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
              overflow: 'hidden', // Added overflow hidden
            }}
          >
                {/*Contents needed*/}
                <Box sx={{ 
                  flexGrow: 1, 
                  overflow: 'auto',  // Changed to auto
                  height: '100%',    // Added height 100%
                  width: '100%'      // Added width 100%
                }}>
                  <CalendarBoardView />
                </Box>

          </Box>
        </Grid>

        <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', borderRadius: '15px', padding: 2 , height: '100%',}}>
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
              overflow: 'hidden', // Added overflow hidden
            }}
          >
                {/*Contents needed*/}
                <Box sx={{ 
                  flexGrow: 1, 
                  overflow: 'auto',  // Changed to auto
                  height: '100%',    // Added height 100%
                  width: '100%'      // Added width 100%
                }}>
                  <TimerBoardView />
                </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', borderRadius: '15px', padding: 2 , height: '100%',}}>
            <Typography variant="h6" sx={{fontWeight: 'bold', color: '#1f295a'}}>   
                Sticky Notes
            </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              borderRadius: '15px',
              height: 'calc(100% - 40px)', 
              backgroundColor: 'white',
              padding: 2,
              overflow: 'hidden', // Added overflow hidden
            }}
          >
                {/*Contents needed*/}
                <Box sx={{ 
                  flexGrow: 1, 
                  overflow: 'auto',  // Changed to auto
                  height: '100%',    // Added height 100%
                  width: '100%'      // Added width 100%
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