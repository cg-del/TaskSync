import React from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import todolistGif from '../assets/todolist.gif';
import stickynoteGif from '../assets/stickynote.gif';
import timerGif from '../assets/timer.gif';
import calendarGif from '../assets/calendar.gif';
import logo from '../assets/logo.png';

const carouselItems = [
  {
    title: "Sticky Notes",
    description: "Quickly jot down your thoughts and ideas with our sticky notes feature.",
    image: stickynoteGif, 
  },
  {
    title: "To-Do List",
    description: "Organize your tasks and check them off as you complete them.",
    image: todolistGif, 
  },
  {
    title: "Task Calendar",
    description: "Plan your schedule and never miss a deadline with our task calendar.",
    image: calendarGif, 
  },
  {
    title: "Timer",
    description: "Boost your productivity with our built-in timer to manage your work sessions.",
    image: timerGif, 
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
        alignItems: 'center',
        height: 'maxContent',
        padding: 3,
      }}
    >
      <Grid container spacing={4} sx={{ maxWidth: '1200px' }}>
        <Grid item xs={12} md={6}>
          <Box 
            sx={{ 
              textAlign: 'center', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '100%'
            }}
          >
            <img src={logo} alt="Logo" style={{ width: '200px', height: '200px' }} />
            <Typography variant="h5" component="p" sx={{ mb: 4 }}>
              Manage your tasks efficiently and effortlessly.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
              <Button
                component={RouterLink}
                to="/login"
                variant="contained"
                color="primary"
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
                size="large"
                fullWidth
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Slider {...settings} style={{ width: '100%', borderRadius: '8px' }}>
            {carouselItems.map((item, index) => (
              <Box key={index} sx={{ padding: 2 }}>
                <img src={item.image} alt={item.title} style={{ width: '90%', borderRadius: '10px', margin: '10px' }} />
                <Typography variant="h4" component="h2" sx={{ mt: 2 }}>
                  {item.title}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
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