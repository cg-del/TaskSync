import React, { useRef } from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useUser } from '../UserContext'; // Import the useUser hook

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
          {[...Array(8)].map((_, index) => (
            <Box
              key={index}
              sx={{
                minWidth: '500px',
                height: '200px',
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
      <Grid container spacing={0.5} sx={{ width: '100%', boxSizing: 'border-box', maxWidth: '100%', margin: '0 auto', marginTop: 4, height: '60vh' }}>
        <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', borderRadius: '15px', padding: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              borderRadius: '15px',
              height: '100%',
              backgroundColor: 'white',
              padding: 2,
            }}
          >
            <Typography variant="h6">
                To-Do List
            </Typography>

                {/*Contents needed*/}




          </Box>
        </Grid>
        <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', borderRadius: '15px', padding: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              borderRadius: '15px',
              height: '100%',
              backgroundColor: 'white',
              padding: 2,
            }}
          >
        <Typography variant="h6">   
            Calendar
        </Typography>


                {/*Contents needed*/}







        
          </Box>
        </Grid>
        <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', borderRadius: '15px', padding: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              borderRadius: '15px',
              height: '100%',
              backgroundColor: 'white',
              padding: 2,
            }}
          >
            <Typography variant="h6">   
                Timer
            </Typography>



                {/*Contents needed*/}









          </Box>
        </Grid>
        <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', borderRadius: '15px', padding: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              borderRadius: '15px',
              height: '100%',
              backgroundColor: 'white',
              padding: 2,
            }}
          >
            <Typography variant="h6">   
                Sticky Notes
            </Typography>


                {/*Contents needed*/}




          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HorizontalScrollBox;