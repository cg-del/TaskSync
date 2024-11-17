// src/Components_V2/Landing.jsx
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios'; 
import PropTypes from 'prop-types';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext'; 
import logo from '../assets/logo.png';

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
    segment: 'sticky-notes',
    title: 'Sticky Notes',
    icon: <StickyNote2Icon />,
  },
  {
    segment: 'to-do-list',
    title: 'To-do List',
    icon: <ListAltIcon />,
  },
  {
    segment: 'timers',
    title: 'Timer',
    icon: <AccessTimeIcon />,
  },
  {
    segment: 'calendar',
    title: 'Calendar',
    icon: <CalendarTodayIcon />,
  },
  {
    segment: 'logout',
    title: 'Logout',
    icon: <LogoutIcon />,
  },
];

function DemoPageContent({ activeSegment, user }) {
  console.log('Rendering content for segment:', activeSegment); // Debugging statement

  let content;
  const greeting = user ? `Hello, ${user.username}!` : 'Hello!'; 
  switch (activeSegment) {
    case 'to-do-list':
      content = <Task user={user} />; // Pass user to Task component
      break;
    case 'sticky-notes':
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
        <Typography variant="h3">
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

function Sidebar({ onNavigate, activeSegment }) {
  return (
    <Box sx={{ 
      maxWidth: '180px', 
      minWidth: '180px',
      borderRight: '1px solid #ccc', 
      padding: 2, 
      backgroundColor: '#f5f5f5', 
      height: '100vh'
    }}>
      {NAVIGATION.map((item) => (
        <Box
          key={item.segment}
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            cursor: 'pointer', 
            padding: 1, 
            backgroundColor: activeSegment === item.segment ? '#e0e0e0' : 'transparent', // Highlight active segment
            '&:hover': { backgroundColor: '#e0e0e0' } 
          }}
          onClick={() => onNavigate(item.segment)}
        >
          {item.icon}
          <Typography variant="body1" sx={{ marginLeft: 1, fontWeight: 'bold' }}>
            {item.title}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

function DashboardLayoutBranding() {
  const navigate = useNavigate();
  const [activeSegment, setActiveSegment] = useState('board');
  const { user, setUser } = useUser(); // Access user directly from UserContext

  // Redirect to login if there is no user
  useEffect(() => {
    if (!user) {
      navigate('/login'); // Redirect to the login page if no user is found
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/user');
        setUser(response.data); // Set user data in context
      } catch (error) {
        console.error('Error fetching user data:', error.response ? error.response.data : error.message);
      }
    };

    fetchUserData();
  }, [setUser]);

  const handleNavigation = (segment) => {
    console.log('Navigating to:', segment); // Debugging statement
    if (segment === 'logout') {
      setUser(null); // Clear user data
      navigate('/'); // Redirect to the login page
    } else {
      setActiveSegment(segment); // Set active segment based on navigation
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar onNavigate={handleNavigation} activeSegment={activeSegment} />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
          <img src={logo} alt="sync" style={{ height: '40px', marginRight: '10px' }} />
          <Typography variant="h6">TaskSync</Typography>
        </Box>
        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
          <DemoPageContent activeSegment={activeSegment} user={user} />
        </Box>
      </Box>
    </Box>
  );
}

DashboardLayoutBranding.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutBranding;