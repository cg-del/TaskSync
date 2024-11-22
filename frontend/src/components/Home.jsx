// src/Components_V2/Landing.jsx
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal'; // Import the Modal component
import Button from '@mui/material/Button'; // Import Button component
import Divider from '@mui/material/Divider'; // Import Divider component
import DialogTitle from '@mui/material/DialogTitle'; // Import DialogTitle component
import DialogContent from '@mui/material/DialogContent'; // Import DialogContent component
import DialogActions from '@mui/material/DialogActions'; // Import DialogActions component
import axios from 'axios'; 
import PropTypes from 'prop-types';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext'; 
import logo1 from '../assets/logo2.png';

import Notes from './StickyNotes';
import Task from './Task';
import TaskCalendar from './TaskCalendar';
import Timer from './Timer';


const NAVIGATION = [
  {
    segment: 'board',
    title: 'Board',
    icon: <DashboardIcon />,
  },
  {
    segment: 'todo List',
    title: 'To-do List',
    icon: <ListAltIcon />,
  },
  {
    segment: 'calendar',
    title: 'Calendar',
    icon: <CalendarTodayIcon />,
  },
  {
    segment: 'timers',
    title: 'Timer',
    icon: <AccessTimeIcon />,
  },
  {
    segment: 'sticky-Notes',
    title: 'Sticky Notes',
    icon: <StickyNote2Icon />,
  },

];

function DemoPageContent({ activeSegment, user }) {
  console.log('Rendering content for segment:', activeSegment); // Debugging statement

  let content;
  const greeting = user ? `Hello, ${user.username}!` : 'Hello!'; 
  switch (activeSegment) {
    case 'todo List':
      content = <Task user={user} />; // Pass user to Task component
      break;
    case 'sticky-Notes':
      content = <Notes user={user} />; // Pass user to Notes component
      break;
    case 'calendar':
      content = <TaskCalendar user={user} />; // Pass user to TaskCalendar component
      break;
    case 'timers':
      content = <Timer user={user} />; // Pass user to Timer component
      break;
    case 'board':
      content = (
        <Typography variant="h3" paddingTop={5} color='#134B70'>
          Welcome to TaskSync Productivity!
          <Typography variant="h6">{greeting}</Typography> 
        </Typography>
      ); // Placeholder for board content
      break;
    default:
      content = <Typography variant="h6">Select a segment to view content.</Typography>;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'left',
        flexGrow: 1,
        overflowY: 'hidden',
        minHeight: '0',
        width: '95%',
        padding: 2,
      }}
    >
      {content}
    </Box>
  );
}

DemoPageContent.propTypes = {
  activeSegment: PropTypes.string.isRequired,
  user: PropTypes.object,
};

function Sidebar({ onNavigate, activeSegment, user }) {
  const greeting = user ? `Hello, ${user.username}!` : 'Hello!'; 
  return (
    <Box sx={{ 
      maxWidth: '320px',  // Increased width
      minWidth: '320px', 
      borderRight: '1px solid #ccc', 
      padding: 2, 
      marginRight: '20px',
      borderRadius: '0px 25px 25px 0px',
      backgroundColor: '#1f295a', // Set to a white background for the sidebar
      height: '95vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between' // Space between items and bottom
    }}>
      <Box>
        <Box 
          sx={{ justifyContent: 'center', alignItems: 'center', padding: 3, cursor: 'pointer'}} 
          onClick={() => onNavigate('board')} // Navigate to the board on click
        >
          <img 
            src={logo1} 
            alt="sync" 
            style={{ 
              width: '200px',  
              maxHeight: '250px', // Set a max height to prevent stretching
              height: 'auto', // Maintain aspect ratio
              marginLeft: '20px' 
            }} 
          />
        </Box>

        
        {NAVIGATION.map((item) => (
            <Box
              key={item.segment}
              sx={{              
                marginTop: 1,
                display: 'flex', 
                alignItems: 'center', 
                cursor: 'pointer', 
                padding: 2, // Increased padding for better layout
                borderRadius: '4px', // Added border radius for rounded corners
                backgroundColor: activeSegment === item.segment ? '#4259c1' : 'transparent', // Light blue for active segment
                color: activeSegment === item.segment ? '#eeeeee' : '#5163aa', // Dark text for active segment, gray for others
                '&:hover': { backgroundColor: '#6577C5', color: '#eeeeee' } // Transparent light blue on hover
              }}
              onClick={() => onNavigate(item.segment)}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 1 , marginLeft: 4 }}> {/* Separate Box for the icon */}
                {item.icon}
              </Box>
              <Typography variant="body1" sx={{ marginLeft: 3, fontWeight: 'bold' }}>
                {item.title}
              </Typography>
            </Box>
        ))}
      </Box>


      {/* Logout Button Section */}
      <Box 
        sx={{ 
          marginTop: 'auto', // Pushes the logout button to the bottom
          display: 'flex', 
          alignItems: 'center', 
          cursor: 'pointer', 
          padding: 2, 
          borderRadius: '4px', 
          color: '#5163aa',
          '&:hover': { backgroundColor: '#6577C5', color: '#eeeeee' } // Hover effect
        }}
        onClick={() => onNavigate('logout')} // Navigate to logout
      >
        <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 1 , marginLeft: 4 }}> {/* Separate Box for the icon */}
          <LogoutIcon />
        </Box>
        <Typography variant="body1" sx={{ marginLeft: 3, fontWeight: 'bold' }}>
          Logout
        </Typography>
      </Box>
    </Box>
  );
}

function DashboardLayoutBranding() {
  const navigate = useNavigate();
  const [activeSegment, setActiveSegment] = useState('board');
  const { user, setUser } = useUser();
  const [isModalOpen, setModalOpen] = useState(false); // State for modal visibility

  // Redirect to login if there is no user
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const handleNavigation = (segment) => {
    if (segment === 'logout') {
      setModalOpen(true); // Open the confirmation modal
    } else {
      setActiveSegment(segment);
    }
  };

  // Confirmation Modal Component
  const LogoutConfirmationModal = ({ open, onClose, onConfirm }) => {
    return (
      <Modal open={open} onClose={onClose}>
        <Box sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          bgcolor: 'background.paper', 
          boxShadow: 1, // Adjusted boxShadow to match ModalDialog
          p: 1, // Adjusted padding for consistency
          borderRadius: 2,
          width: '400px', // Set a fixed width similar to ModalDialog
        }}>
          <DialogTitle>Confirm Logout</DialogTitle>
          <Divider />
          <DialogContent>
            <Typography variant="body1"> {/* Added Typography for styling */}
              Are you sure you want to log out?
            </Typography>
          </DialogContent>
          <DialogActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              color="danger"
              onClick={onConfirm}
              sx={{
                borderColor: 'red',
                color: 'red',
                textTransform: 'none',
                marginLeft: 2, // Adjusted margin for consistency
              }}
            >
              Logout
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={onClose}
              sx={{ textTransform: 'none', paddingLeft: 0, paddingRight: 0 }}
            >
              Cancel
            </Button>
          </DialogActions>
        </Box>
      </Modal>
    );
  };

  return (
    <Box sx={{ display: 'flex', height: '98.5vh', backgroundColor: '#d6e1f7', overflow: 'hidden' }}>
      <Sidebar onNavigate={handleNavigation} activeSegment={activeSegment} />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', padding: 3, justifyContent: 'space-between', marginTop: 1 }}>

        <Typography 
          variant="h4" 
          sx={{ 
            marginBottom: '16px', 
            margin: '0 10px', 
            fontWeight: 'bold', 
            color: '#1f295a', // Set the text color
            minWidth: '220px' // Set a minimum width to prevent movement
          }}
        >
          {activeSegment.charAt(0).toUpperCase() + activeSegment.slice(1).replace('-', ' ')} {/* Display selected segment name */}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, justifyContent: 'center', marginRight: 20 }}>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ marginRight: 2, marginLeft: 3, color: '#134B70'}}>
              {new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })} {/* Display current date in "November 21, 2024" format */}
            </Typography>
            <CalendarTodayIcon sx={{ marginRight: 15, color: '#134B70'}} /> {/* Added marginLeft to create space between the calendar icon and the right arrow */}
          </Box>
          

        </Box>
      </Box>

        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
          <DemoPageContent activeSegment={activeSegment} user={user} />
        </Box>
      </Box>
      <LogoutConfirmationModal 
        open={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        onConfirm={handleLogout} 
      />
    </Box>
  );
}

DashboardLayoutBranding.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutBranding;