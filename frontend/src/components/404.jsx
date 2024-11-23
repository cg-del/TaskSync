import React from 'react';
import Box from '@mui/material/Box';
import NotFoundImage from '../assets/404.svg'; // Ensure 404.svg is in the correct directory

const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'left',
        backgroundColor: '#f9f9f9',
      }}
    >
      {/* SVG Image */}
      <Box
        component="img"
        src={NotFoundImage}
        alt="404 Not Found"
        sx={{
          maxWidth: '250px',
          marginRight: '200px',
        }}
      />

      {/* Text Content */}
      <Box>
        <Box
          component="h1"
          sx={{
            fontSize: '3rem',
            color: '#333',
            margin: 0,
          }}
        >
          404
        </Box>
        <Box
          component="p"
          sx={{
            fontSize: '1.2rem',
            color: '#555',
          }}
        >
          Page Not Found
        </Box>
      </Box>
    </Box>
  );
};

export default NotFound;
