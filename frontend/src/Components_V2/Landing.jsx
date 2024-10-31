import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import logo from '../assets/logo.png';
import { useState } from 'react';
import DataGridDemo from './Task';
import SimplePaper from './StickyNotes';

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
    segment: 'timer',
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

function DemoPageContent({ pathname, activeSegment }) {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        textAlign: 'left',
        padding: 4,
      }}
    >
      <Typography>Task Board</Typography>
      <Box sx={{ mt: 2 }}>
        {/* Render DataGridDemo only if the active segment is 'to-do-list' */}
        {activeSegment === 'to-do-list' && <DataGridDemo />}
        {/* Render SimplePaper only if the active segment is 'sticky-notes' */}
        {activeSegment === 'sticky-notes' && <SimplePaper />} 
      </Box>
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
  activeSegment: PropTypes.string.isRequired, // Pass activeSegment as a prop
};

function DashboardLayoutBranding(props) {
  const { window } = props;
  const router = useDemoRouter('/dashboard');
  const [activeSegment, setActiveSegment] = useState('board'); // Default active segment

  const demoWindow = window !== undefined ? window() : undefined;

  const handleNavigation = (segment) => {
    setActiveSegment(segment); // Set the active segment
    router.navigate(segment); // Navigate to the selected segment
  };

  return (
    <AppProvider
      navigation={NAVIGATION.map((item) => ({
        ...item,
        title: (
          <Typography
            sx={{
              color: activeSegment === item.segment ? 'black' : 'inherit', // Change color to black if active
              fontWeight: activeSegment === item.segment ? 'bold' : 'normal', // Make it bold if active
              cursor: 'pointer', // Change cursor to pointer
            }}
            onClick={() => handleNavigation(item.segment)} // Handle click
          >
            {item.title}
          </Typography>
        ),
      }))}
      branding={{
        logo: <img src={logo} alt="sync" />,
        title: <Typography sx={{ color: 'primary', fontWeight: 'bold' }}>TaskSync</Typography>,
      }}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        {/* Pass activeSegment to DemoPageContent */}
        <DemoPageContent pathname={router.pathname} activeSegment={activeSegment} />
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutBranding.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutBranding;
