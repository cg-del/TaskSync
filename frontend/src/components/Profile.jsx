import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useUser } from '../UserContext';
import logo1 from '../assets/logo2.png'; // Import the logo
// Import icons
import EmailIcon from '@mui/icons-material/Email';
import LockResetIcon from '@mui/icons-material/LockReset';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';

const Profile = () => {
  const { user } = useUser();
  const [activeSection, setActiveSection] = useState('username');

  const handleSectionClick = (section) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Add scroll event listener to track active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let currentSection = '';
      const scrollPosition = window.scrollY + window.innerHeight / 3; // Changed from 100 to 1/3 of viewport

      sections.forEach(section => {
        const offset = section.offsetTop;
        const height = section.offsetHeight;

        // Check if the section is in the current scroll position
        if (scrollPosition >= offset && scrollPosition <= offset + height) {
          currentSection = section.id;
        }
      });

      // If we're near the bottom of the page
      if (window.innerHeight + window.scrollY + 100 >= document.documentElement.scrollHeight) {
        setActiveSection('logout');
      } 
      // If we're at the top
      else if (window.scrollY < 100) {
        setActiveSection('username');
      }
      // If we found a section in view
      else if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'username', label: 'Username', icon: <PersonIcon /> },
    { id: 'email', label: 'Email', icon: <EmailIcon /> },
    { id: 'occupation', label: 'Occupation', icon: <WorkIcon /> },
    { id: 'passwordReset', label: 'Password Reset', icon: <LockResetIcon /> },
    { id: 'logout', label: 'Logout', icon: <LogoutIcon /> },
  ];

  return (
    <Box display="flex" alignItems="center" flexDirection="row" justifyContent="center" backgroundColor="#1f295a" color={'white'}
    sx={{        backgroundImage: 'linear-gradient(45deg, #4259c1, #1f295a)',}}
    >
      <Box sx={{
        width: '80%',
        display: 'flex',
        flexDirection: 'row',
      }}>
        <Box 
          width="400px" 
          p={2} 
          position="fixed" 
          top={0} 
          height="100vh"
          paddingTop={20}
          display="flex"
          flexDirection="column"
          sx={{
            backgroundColor: 'transparent',
          }}
        >
          <Typography 
            variant="h3" 
            color="white" 
            sx={{ 
              fontSize: '4rem',
              fontWeight: 'bold',
              userSelect: 'none'  // Make text non-selectable
            }}
          >
            Account Management
          </Typography>
          <List sx={{
            marginTop: 4,
            '& > li': {
            },
            userSelect: 'none'  // Make list items non-selectable
          }}>
            {menuItems.map((item) => (
              <ListItem 
                key={item.id} 
                sx={{
                  backgroundColor: activeSection === item.id ? '#d0d0d0' : 'transparent',
                  color: activeSection === item.id ? '#1f295a' : 'white',
                  borderRadius: '4px',
                  marginBottom: '8px',
                  userSelect: 'none'  // Make list item non-selectable
                }}
              >
                <ListItemIcon sx={{ 
                  color: activeSection === item.id ? '#1f295a' : 'white',
                  minWidth: '40px'
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.label}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontWeight: activeSection === item.id ? 'bold' : 'normal'
                    }
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Add a spacer box to prevent content overlap */}
        <Box width="400px" flexShrink={0} />

        <Box paddingTop={9} paddingLeft={4} marginTop={12} width={'100%'} color={'black'} display="flex" flexDirection="column" alignItems={'center'}>
          <section id="username" style={{ minHeight: '200px', width: '100%', marginBottom: '40px', }}>
            <Box sx={{ 
              backgroundColor: 'white', 
              padding: '30px', 
              borderRadius: '10px', 
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
              height: '200px',
              
            }}>
              <Typography variant="h5" color="#1f295a" gutterBottom fontWeight="bold">
                Username
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                Manage your account username
              </Typography>
              <Typography variant="subtitle1" color="text.primary">
                Current Username: <Box component="span" fontWeight="medium">{user?.username || 'Not set'}</Box>
              </Typography>
            </Box>
          </section>

          <section id="email" style={{ minHeight: '200px', width: '100%', marginBottom: '40px' }}>
            <Box sx={{ 
              backgroundColor: 'white', 
              padding: '30px', 
              borderRadius: '10px', 
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
              height: '200px',
            }}>              
              <Typography variant="h5" color="#1f295a" gutterBottom fontWeight="bold">
                Email
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                Manage your account email address
              </Typography>
              <Typography variant="subtitle1" color="text.primary">
                Current Email: <Box component="span" fontWeight="medium">{user?.email || 'Not set'}</Box>
              </Typography>
            </Box>
          </section>

          <section id="occupation" style={{ minHeight: '200px', width: '100%', marginBottom: '40px' }}>
            <Box sx={{ 
              backgroundColor: 'white', 
              padding: '30px', 
              borderRadius: '10px', 
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
              height: '200px',
            }}>              
              <Typography variant="h5" color="#1f295a" gutterBottom fontWeight="bold">
                Occupation
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                Set your professional occupation
              </Typography>
              <Typography variant="subtitle1" color="text.primary">
                Current Occupation: <Box component="span" fontWeight="medium">{user?.occupation || 'Not set'}</Box>
              </Typography>
            </Box>
          </section>

          <section id="passwordReset" style={{ minHeight: '200px', width: '100%', marginBottom: '40px' }}>
            <Box sx={{ 
              backgroundColor: 'white', 
              padding: '30px', 
              borderRadius: '10px', 
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
              height: '200px',
            }}>              
              <Typography variant="h5" color="#1f295a" gutterBottom fontWeight="bold">
                Password Reset
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                Change or reset your account password
              </Typography>
              <Typography variant="subtitle1" color="text.primary">
                Securely manage your password settings
              </Typography>
            </Box>
          </section>

          <section id="logout" style={{ minHeight: '100px', width: '100%', marginBottom: '40px' }}>
            <Box sx={{ 
              backgroundColor: 'white', 
              padding: '30px', 
              borderRadius: '10px', 
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
              height: '100px',
            }}>              
              <Typography variant="h5" color="#1f295a" gutterBottom fontWeight="bold">
                Logout
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Securely end your current session
              </Typography>
            </Box>
          </section>
          
          {/* Footer */}
          <Box 
            sx={{ 
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '20px',
              marginTop: '20px',
              borderTop: '1px solid #eee',
              gap: '10px'
            }}
          >
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#f3f3fa',
                opacity: 0.8,
                textAlign: 'center',
                maxWidth: '600px',
                marginBottom: '10px'
              }}
            >
              © 2023-{new Date().getFullYear()} TaskSync Inc. TASKSYNC, TASK MANAGEMENT, PRODUCTIVITY TOOLS, 
              POMODORO TIMER, TASK ANALYTICS, and any associated logos are trademarks, service marks, 
              and/or registered trademarks of TaskSync Productivity Solutions.
            </Typography>
            <img 
              src={logo1} 
              alt="TaskSync Logo" 
              style={{ 
                width: '150px',
                height: 'auto',
              }} 
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;