// src/Components_V2/Landing.jsx
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext'; // Import the UserContext
import logo from '../assets/logo.png';
import axios from 'axios'; // Ensure axios is imported

import Notes from '../Components_V2/StickyNotes'; // Import Notes component
import Task from '../Components_V2/Task'; // Import Task component
import TaskCalendar from '../Components_V2/TaskCalendar'; // Import TaskCalendar component
import Timer from '../components/Timer'; // Import Timer component

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
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

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
      
      content = <Typography variant="h3">
      Welcome to TaskSync Productivity!
        <Typography variant="h6">{greeting}</Typography> 
      </Typography>; // Placeholder for board content
      break;
    default:
      content = <Typography variant="h6">Select a segment to view content.</Typography>;
  }

  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        textAlign: 'left',
        padding: 4,
        height: '100%', // Ensure content fills the available height
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

function Sidebar({ onNavigate }) {
  return (
    <Box sx={{ width: '200px', borderRight: '1px solid #ccc', padding: 2 }}>
      {NAVIGATION.map((item) => (
        <Box
          key={item.segment}
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: 1 }}
          onClick={() => onNavigate(item.segment)}
        >
          {item.icon}
          <Typography variant="body1" sx={{ marginLeft: 1 }}>
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
    setActiveSegment(segment); // Set active segment based on navigation
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar onNavigate={handleNavigation} />
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
          <img src={logo} alt="sync" style={{ height: '40px', marginRight: '10px' }} />
          <Typography variant="h6">TaskSync</Typography>
        </Box>
        <DemoPageContent activeSegment={activeSegment} user={user} /> {/* Pass user to DemoPageContent */}
      </Box>
    </Box>
  );
}

DashboardLayoutBranding.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutBranding;