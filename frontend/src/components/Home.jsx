import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom
import { Container, Typography, Button } from '@mui/material';
import { useUser } from '../UserContext'; // Import useUser to access user context

const Home = () => {
  const { user, setUser } = useUser(); // Get the logged-in user and setUser from context
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  const handleLogout = () => {
    setUser(null); // Clear the user context
    navigate('/login'); // Redirect to the login page
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '20px', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the TaskSync!
      </Typography>
      {user ? ( // Check if user is logged in
        <>
          <Typography variant="h6" gutterBottom>
            Hello, {user.username}!
          </Typography>
          <Link to="/Notes" state={{ user }}>
            <Button variant="contained" color="primary" style={{ margin: '10px' }}>
              Go to StickyNotes
            </Button>
          </Link>
          <Link to="/Task" state={{ user }}>
            <Button variant="contained" color="primary" style={{ margin: '10px' }}>
              Go to Task
            </Button>
          </Link>
          <Link to="/timers" state={{ user }}>
            <Button variant="contained" color="primary" style={{ margin: '10px' }}>
              Go to Timers
            </Button>
          </Link>
          <Link to="/Calendar" state={{ user }}>
            <Button variant="contained" color="primary" style={{ margin: '10px' }}>
              Go to Calendar
            </Button>
          </Link>
          <Button variant="outlined" color="secondary" style={{ margin: '10px' }} onClick={handleLogout}>
            Logout
          </Button>
        </>
      ) : (
        <>
          <Link to="/login">
            <Button variant="outlined" color="secondary" style={{ margin: '10px' }}>
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="outlined" color="secondary" style={{ margin: '10px' }}>
              Sign Up
            </Button>
          </Link>
        </>
      )}
    </Container>
  );
};

export default Home;