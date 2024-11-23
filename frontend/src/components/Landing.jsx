import React from 'react';
import { Box, Button, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import logo from '../assets/logo2.png';
import Typography from '@mui/material/Typography';

import timer from '../assets/LandingTimer.png';
import calendar from '../assets/LandingCalendar.png';
import notes from '../assets/LandingNotes.png';
import task from '../assets/LandingTask.png';

const carouselItems = [
  {
    title: "To-do List",
    description: "Organize your tasks and check them off as you complete them",
    image: task, 
  },
  {
    title: "Calendar",
    description: "Plan your schedule and never miss a deadline with our task calendar.",
    image: calendar, 
  },
  {
    title: "Timer",
    description: "Boost your productivity with our built-in timer to manage your study or work sessions.",
    image: timer, 
  },
  {
    title: "Sticky Notes",
    description: "Quickly jot down your thoughts and ideas with our sticky notes feature.",
    image: notes, 
  },

];

export default function Landing() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        height: '98vh', // Full viewport height
        alignItems: 'center',
        backgroundImage: 'linear-gradient(45deg, #4259c1, #1f295a)',
      }}
    >
      <Grid container spacing={4} >
        <Grid item xs={12} md={6}>
          <Box 
            sx={{ 
              textAlign: 'center', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '90%',
              marginLeft: 25,
              mb: 20
            }}
          >
            <img src={logo} alt="Logo" style={{ width: '250px', height: '250px' }} />
            <Typography variant="h5" component="p" sx={{ mt: 2, color: '#eeeeee' }}>
              Start your productivity journey with TaskSync. 
            </Typography>
            <Typography variant="h5" component="p" sx={{ mb: 4, color: '#eeeeee' }}>
              Login or Sign up now!
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '50%' }}>
              <Button
                component={RouterLink}
                to="/login"
                variant="contained"
                sx={{
                  backgroundColor: '#4259c1',
                  color: '#eeeeee' 
                }}
                size="large"
                fullWidth
              >
                Login
              </Button>
              <Button
                component={RouterLink}
                to="/signup"
                variant="outlined"
                color="primary"
                sx={{
                  borderColor: '#eeeeee',
                  color: '#eeeeee' 
                }}
                size="large"
                fullWidth
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Slider {...settings} style={{ width: '50%', borderRadius: '8px', marginLeft: 40}}>
            {carouselItems.map((item, index) => (
              <Box key={index} sx={{ padding: 2 }}>
                <img src={item.image} alt={item.title} style={{ width: '90%', borderRadius: '10px', margin: '10px' }} />
                <Typography variant="h4" component="h2" sx={{ mt: 2, color: '#eeeeee' }}>
                  {item.title}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, color: '#eeeeee'}}>
                  {item.description}
                </Typography>
              </Box>
            ))}
          </Slider>
        </Grid>
      </Grid>
    </Box>
  );
}