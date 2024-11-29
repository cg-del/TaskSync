import { Box, Button, IconButton, InputAdornment, List, ListItem, ListItemIcon, ListItemText, MenuItem, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useUser } from '../UserContext';
import logo1 from '../assets/logo2.png'; // Import the logo
// Import icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Import the back icon
import EmailIcon from '@mui/icons-material/Email';
import LockResetIcon from '@mui/icons-material/LockReset';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import WorkIcon from '@mui/icons-material/Work';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Modal from '@mui/material/Modal';
import axios from 'axios'; // Import axios
import { Navigate, useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, setUser } = useUser();
  const [activeSection, setActiveSection] = useState('username');
  const navigate = useNavigate(); // Hook to navigate
  const [isModalOpen, setModalOpen] = useState(false);
  const [editedFields, setEditedFields] = useState({
    username: user?.username || '',
    email: user?.email || '',
    password: '',
    occupation: user?.occupation || '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [occupationError, setOccupationError] = useState('');
  const [usernameSuccess, setUsernameSuccess] = useState('');
  const [emailSuccess, setEmailSuccess] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [occupationSuccess, setOccupationSuccess] = useState('');
  const [openModal, setOpenModal] = useState(false); // State to control modal visibility

  // Add scroll event listener to track active section
  useEffect(() => {
    if (!user) {
      navigate('/404'); // Redirect if user is not available
      return;
    }

    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let currentSection = '';
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      sections.forEach(section => {
        const offset = section.offsetTop;
        const height = section.offsetHeight;

        if (scrollPosition >= offset && scrollPosition <= offset + height) {
          currentSection = section.id;
        }
      });

      if (window.innerHeight + window.scrollY + 100 >= document.documentElement.scrollHeight) {
        setActiveSection('logout');
      } else if (window.scrollY < 100) {
        setActiveSection('username');
      } else if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [user, navigate]); // Add user and navigate as dependencies

  const menuItems = [
    { id: 'username', label: 'Username', icon: <PersonIcon /> },
    { id: 'email', label: 'Email', icon: <EmailIcon /> },
    { id: 'occupation', label: 'Occupation', icon: <WorkIcon /> },
    { id: 'passwordReset', label: 'Password Reset', icon: <LockResetIcon /> },
    { id: 'logout', label: 'Logout', icon: <LogoutIcon /> },
  ];

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const handleUpdateUsername = async () => {
    setUsernameError(''); // Reset error for username
    setUsernameSuccess(''); // Reset success message
    setOpenModal(false); // Close modal if open
    setIsLoading(true);

    try {
      const response = await axios.put(`http://localhost:8080/api/user/putUser?id=${user.userId}`, {
        username: editedFields.username,
        email: user.email,
        password: user.password,
        occupation: user.occupation
      });

      if (response.status === 200) {
        setUser({ ...user, username: editedFields.username });
        setUsernameSuccess('Username updated successfully!'); // Set success message
        setOpenModal(true); // Open the modal
      }
    } catch (error) {
      console.error('Failed to update username:', error);
      setUsernameError('Failed to update username. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateEmail = async () => {
    setEmailError(''); // Reset error for email
    setEmailSuccess(''); // Reset success message
    setOpenModal(false); // Close modal if open
    setIsLoading(true);

    try {
      const response = await axios.put(`http://localhost:8080/api/user/putUser?id=${user.userId}`, {
        username: user.username,
        email: editedFields.email,
        password: user.password,
        occupation: user.occupation
      });

      if (response.status === 200) {
        setUser({ ...user, email: editedFields.email });
        setEmailSuccess('Email updated successfully!'); // Set success message
        setOpenModal(true); // Open the modal
      }
    } catch (error) {
      console.error('Failed to update email:', error);
      setEmailError('Failed to update email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    // Validate password and confirm password
    if (editedFields.newPassword !== editedFields.confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }
  
    const passwordValidation = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordValidation.test(editedFields.newPassword)) {
      setPasswordError('Password must be at least 8 characters long and contain at least one special character.');
      return;
    }
  
    setPasswordError(''); // Reset error for password
    setPasswordSuccess(''); // Reset success message
    setIsLoading(true);
  
    try {
      const response = await axios.put(`http://localhost:8080/api/user/putUser?id=${user.userId}`, {
        username: user.username,
        email: user.email,
        password: editedFields.newPassword,
        occupation: user.occupation
      });
  
      if (response.status === 200) {
        setUser({ ...user, password: editedFields.newPassword }); // Update password in context if needed
        setPasswordSuccess('Password updated successfully!'); // Set success message
  
        // Clear the input fields
        setEditedFields({
          ...editedFields,
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      }
    } catch (error) {
      console.error('Failed to update password:', error);
      setPasswordError('Failed to update password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleUpdateOccupation = async () => {
    setOccupationError(''); // Reset error for occupation
    setOccupationSuccess(''); // Reset success message
    setOpenModal(false); // Close modal if open
    setIsLoading(true);
  
    try {
      const response = await axios.put(`http://localhost:8080/api/user/putUser?id=${user.userId}`, {
        username: user.username,
        email: user.email,
        password: user.password,
        occupation: editedFields.occupation
      });
  
      if (response.status === 200) {
        setUser({ ...user, occupation: editedFields.occupation });
        setOccupationSuccess('Occupation updated successfully!'); // Set success message
        setOpenModal(true); // Open the modal
      }
    } catch (error) {
      console.error('Failed to update occupation:', error);
      setOccupationError('Failed to update occupation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  

  // Add the LogoutConfirmationModal component
  const LogoutConfirmationModal = ({ open, onClose, onConfirm }) => {
    return (
      <Modal open={open} onClose={onClose}>
        <Box sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          bgcolor: 'background.paper', 
          boxShadow: 1,
          p: 1,
          borderRadius: 2,
          width: '400px',
        }}>
          <DialogTitle>Confirm Logout</DialogTitle>
          <Divider />
          <DialogContent>
            <Typography variant="body1">
              Are you sure you want to log out?
            </Typography>
          </DialogContent>
          <DialogActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              color="error"
              onClick={onConfirm}
              sx={{
                borderColor: 'red',
                color: 'red',
                textTransform: 'none',
                marginLeft: 2,
              }}
            >
              Logout
            </Button>
            <Button
              variant="text"
              onClick={onClose}
              sx={{ textTransform: 'none' }}
            >
              Cancel
            </Button>
          </DialogActions>
        </Box>
      </Modal>
    );
  };

  return (
    <Box display="flex" alignItems="center" flexDirection="row" justifyContent="center" backgroundColor="#1f295a" color={'white'}
      sx={{ backgroundImage: 'linear-gradient(45deg, #4259c1, #1f295a)', }}
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
              fontWeight: 'bold',
              userSelect: 'none'  // Make text non-selectable
            }}
          >
            Account Management
          </Typography>
          <List sx={{
            marginTop: 5,
            '& > li': {},
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

        <Box width="400px" flexShrink={0} />

        <Box paddingTop={9} paddingLeft={4} marginTop={12} width={'100%'} color={'black'} display="flex" flexDirection="column" alignItems={'center'}>
          {/* Back Button */}
          <Button 
            color="primary" 
            variant="contained"
            onClick={handleBack} 
            sx={{ 
              position: 'absolute', 
              top: 0, 
              right: 0, 
              marginTop: 2, 
              marginRight: 2, 
              borderRadius: '50%', 
              padding: '30px 0px',
              backgroundColor: 'transparent', 
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)', 
              },
              width: '50px', 
              height: '50px',
            }}
          >
            <ArrowBackIcon sx={{ fontSize: '24px' }} /> 
          </Button>

          <section id="username" style={{ minHeight: '200px', width: '100%', marginBottom: '40px' }}>
            <Box sx={{ 
              height: '300px',
              display: 'flex', 
              boxShadow: '0px 10px 15px 11px rgba(0,0,0,0.1), 0px 10px 15px -3px rgba(0,0,0,0.1)'
            }}>
              <Box sx={{ width: '40%', backgroundColor: '#4259c1', padding: '32px 45px', color: 'white', borderRadius: '10px 0px 0px 10px' }}>
                <Typography variant='h4' sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
                  TaskSync Username
                </Typography>
                <Typography variant='body1' sx={{ fontWeight:'1.5rem', color:'#d0d0d0'}}>
                  Your Username is used to identify your account. Keep it simple and easy to remember.
                </Typography>
              </Box>
              <Box sx={{ width: '60%', backgroundColor: '#d6e1f7', padding: '32px 45px', borderRadius: '0px 10px 10px 0px', display: 'flex', flexDirection: 'column',  }}>
              <Typography variant="h5" color="#1f295a" gutterBottom fontWeight="bold">
                  Username
                </Typography>
                <Typography variant="body1" color="#1f295a" gutterBottom>
                Set your username
                </Typography>
                <TextField
                  value={editedFields.username}
                  onChange={(e) => setEditedFields({ ...editedFields, username: e.target.value })}
                  variant="outlined"
                  size="small"
                  sx={{
                    backgroundColor: 'white',
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: '#4259c1' },
                      '&:hover fieldset': { borderColor: '#1f295a' },
                      '& input': { fontSize: '1rem' },
                    },
                  }}
                />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}> 
                      <Button
                          variant="contained"
                          onClick={handleUpdateUsername}
                          disabled={editedFields.username === user?.username}
                          sx={{
                              backgroundColor: '#4259c1',
                              '&:hover': { backgroundColor: '#1f295a' },
                              textTransform: 'none',
                          }}
                      >
                          Save Changes
                      </Button>
                  </Box>
                {usernameError && (
                  <Typography color="error" variant="caption" sx={{ mt: 1, display: 'block' }}>
                    {usernameError}
                  </Typography>
                )}
                {usernameSuccess && (
                  <Typography color="success" variant="caption" sx={{ mt: 1, display: 'block' }}>
                    {usernameSuccess}
                  </Typography>
                )}
              </Box>
            </Box>
          </section>

          <section id="email" style={{ minHeight: '200px', width: '100%', marginBottom: '40px' }}>
            <Box sx={{ 
              height: '300px',
              display: 'flex', 
              boxShadow: '0px 10px 15px 11px rgba(0,0,0,0.1), 0px 10px 15px -3px rgba(0,0,0,0.1)'
            }}>
              <Box sx={{ width: '40%', backgroundColor: '#4259c1', padding: '32px 45px', color: 'white', borderRadius: '10px 0px 0px 10px' }}>
                <Typography variant='h4' sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
                  Personal Email
                </Typography>
                <Typography variant='body1' sx={{ fontWeight:'1.5rem', color:'#d0d0d0'}}>
                  This information is private and will not be shared with other players. Read the <a href="/privacy" style={{ color: '#ffcc00', textDecoration: 'underline' }}>TaskSync Privacy Notice</a> anytime!
                </Typography>
              </Box>
              <Box sx={{ width: '60%', backgroundColor: '#d6e1f7', padding: '32px 45px', borderRadius: '0px 10px 10px 0px', display: 'flex', flexDirection: 'column',  }}>
              <Typography variant="h5" color="#1f295a" gutterBottom fontWeight="bold">
                  Email 
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  Manage your account email
                </Typography>
                  <TextField
                    value={editedFields.email}
                    onChange={(e) => setEditedFields({ ...editedFields, email: e.target.value })}
                    variant="outlined"
                    size="small"
                    sx={{
                      backgroundColor: 'white',
                      width: '100%',
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#4259c1' },
                        '&:hover fieldset': { borderColor: '#1f295a' },
                        '& input': { fontSize: '1rem'},
                      },
                    }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}> 
                  <Button
                    variant="contained"
                    onClick={handleUpdateEmail}
                    disabled={isLoading || !editedFields.email || editedFields.email === user?.email}
                    sx={{
                    backgroundColor: '#4259c1',
                    '&:hover': { backgroundColor: '#1f295a' },
                    textTransform: 'none',
                  }}
                  >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                  </Box>
                {emailError && (
                  <Typography color="error" variant="caption" sx={{ mt: 1, display: 'block' }}>
                    {emailError}
                  </Typography>
                )}
                {emailSuccess && (
                  <Typography color="success" variant="caption" sx={{ mt: 1, display: 'block' }}>
                    {emailSuccess}
                  </Typography>
                )}
              </Box>
            </Box>
          </section>

          <section id="occupation" style={{ minHeight: '200px', width: '100%', marginBottom: '40px' }}>
            <Box sx={{ 
              height: '300px',
              display: 'flex', 
              boxShadow: '0px 10px 15px 11px rgba(0,0,0,0.1), 0px 10px 15px -3px rgba(0,0,0,0.1)'
            }}>
              <Box sx={{ width: '40%', backgroundColor: '#4259c1', padding: '32px 45px', color: 'white', borderRadius: '10px 0px 0px 10px' }}>
                <Typography variant='h4' sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
                  Your Occupation
                </Typography>
                <Typography variant='body1' sx={{ fontWeight:'1.5rem', color:'#d0d0d0'}}>
                  Set your professional role to help us customize your experience and connect you with like-minded professionals.
                </Typography>
              </Box>
              <Box sx={{ width: '60%', backgroundColor: '#d6e1f7', padding: '32px 45px', borderRadius: '0px 10px 10px 0px', display: 'flex', flexDirection: 'column',  }}>
              <Typography variant="h5" color="#1f295a" gutterBottom fontWeight="bold">
                  Set Occupation
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  Set your professional occupation
                </Typography>
                <TextField
                  select
                  value={editedFields.occupation || user?.occupation}
                  onChange={(e) => setEditedFields({ ...editedFields, occupation: e.target.value })}
                  variant="outlined"
                  size="small"
                  sx={{
                    backgroundColor: 'white',
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: '#4259c1', fontWeight: 'bold' },
                      '&:hover fieldset': { borderColor: '#1f295a' },
                    },
                  }}
                >
                  <MenuItem value=""><em>None</em></MenuItem>
                  <MenuItem value="accountant">Accountant</MenuItem>
                  <MenuItem value="architect">Architect</MenuItem>
                  <MenuItem value="consultant">Consultant</MenuItem>
                  <MenuItem value="designer">Graphic Designer</MenuItem>
                  <MenuItem value="doctor">Doctor</MenuItem>
                  <MenuItem value="electrician">Electrician</MenuItem>
                  <MenuItem value="engineer">Engineer</MenuItem>
                  <MenuItem value="lawyer">Lawyer</MenuItem>
                  <MenuItem value="manager">Project Manager</MenuItem>
                  <MenuItem value="marketing">Marketing Specialist</MenuItem>
                  <MenuItem value="nurse">Nurse</MenuItem>
                  <MenuItem value="pharmacist">Pharmacist</MenuItem>
                  <MenuItem value="plumber">Plumber</MenuItem>
                  <MenuItem value="research_scientist">Research Scientist</MenuItem>
                  <MenuItem value="sales">Sales Representative</MenuItem>
                  <MenuItem value="scientist">Scientist</MenuItem>
                  <MenuItem value="student">Student</MenuItem>
                  <MenuItem value="technician">Technician</MenuItem>
                  <MenuItem value="teacher">Teacher</MenuItem>
                  <MenuItem value="writer">Content Writer</MenuItem>
                </TextField>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}> 
                <Button
                  variant="contained"
                  onClick={handleUpdateOccupation}
                  disabled={editedFields.occupation === user?.occupation}
                  sx={{
                    backgroundColor: '#4259c1',
                    '&:hover': { backgroundColor: '#1f295a' },
                    textTransform: 'none',
                  }}
                >
                  Save Changes
                </Button>
                </Box>
                {occupationError && (
                  <Typography color="error" variant="caption" sx={{ mt: 1, display: 'block' }}>
                    {occupationError}
                  </Typography>
                )}
                {occupationSuccess && (
                  <Typography color="success" variant="caption" sx={{ mt: 1, display: 'block' }}>
                    {occupationSuccess}
                  </Typography>
                )}
              </Box>
            </Box>
          </section>

          <section id="passwordReset" style={{ minHeight: '200px', width: '100%', marginBottom: '40px' }}>
            <Box sx={{ 
              height: '400px',
              display: 'flex', 
              boxShadow: '0px 10px 15px 11px rgba(0,0,0,0.1), 0px 10px 15px -3px rgba(0,0,0,0.1)'
            }}>
              <Box sx={{ width: '40%', backgroundColor: '#4259c1', padding: '32px 45px', color: 'white', borderRadius: '10px 0px 0px 10px' }}>
                <Typography variant='h4' sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
                  Password Security
                </Typography>
                <Typography variant='body1' sx={{ fontWeight:'1.5rem', color:'#d0d0d0'}}>
                  Maintain the security of your account by regularly updating your password. Choose a strong password that's unique to TaskSync.
                </Typography>
              </Box>
              <Box sx={{ width: '60%', backgroundColor: '#d6e1f7', padding: '32px 45px', borderRadius: '0px 10px 10px 0px', display: 'flex', flexDirection: 'column',  }}>
                <Typography variant="h5" color="#1f295a" gutterBottom fontWeight="bold">
                  Password Reset
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  Change or reset your account password
                </Typography>
                <TextField
                  type={showPassword.old ? "text" : "password"}
                  label="Old Password"
                  value={editedFields.oldPassword}
                  onChange={(e) => setEditedFields({ ...editedFields, oldPassword: e.target.value })}
                  variant="outlined"
                  size="small"
                  sx={{ mb: 2, width: '100%',backgroundColor: 'white'}}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword({ ...showPassword, old: !showPassword.old })}>
                          {showPassword.old ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <br></br>
                <TextField
                  type={showPassword.new ? "text" : "password"}
                  label="New Password"
                  value={editedFields.newPassword}
                  onChange={(e) => setEditedFields({ ...editedFields, newPassword: e.target.value })}
                  variant="outlined"
                  size="small"
                  sx={{ mb: 2, width: '100%',backgroundColor: 'white' }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}>
                          {showPassword.new ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <br></br>
                <TextField
                  type={showPassword.confirm ? "text" : "password"}
                  label="Confirm New Password"
                  value={editedFields.confirmPassword}
                  onChange={(e) => setEditedFields({ ...editedFields, confirmPassword: e.target.value })}
                  variant="outlined"
                  size="small"
                  sx={{ width: '100%',backgroundColor: 'white'}}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}>
                          {showPassword.confirm ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Typography variant="caption" color={editedFields.newPassword && /[A-Z]/.test(editedFields.newPassword) ? "green" : "red"}>
                  {editedFields.newPassword && /[A-Z]/.test(editedFields.newPassword)}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}> 
                <Button
                  variant="contained"
                  onClick={handleUpdatePassword}
                  disabled={!editedFields.newPassword || !editedFields.confirmPassword || editedFields.newPassword !== editedFields.confirmPassword} // Disable if either field is empty or if they don't match
                  sx={{
                    backgroundColor: '#4259c1',
                    '&:hover': { backgroundColor: '#1f295a' },
                    textTransform: 'none',
                  }}
                >
                  Save Changes
                </Button>
                </Box>
                {passwordError && (
                  <Typography color="error" variant="caption" sx={{ mt: 1, display: 'block' }}>
                    {passwordError}
                  </Typography>
                )}
                {passwordSuccess && (
                  <Typography color="success" variant="caption" sx={{ mt: 1, display: 'block' }}>
                    {passwordSuccess}
                  </Typography>
                )}
              </Box>
            </Box>
          </section>

          <section id="logout" style={{ minHeight: '200px', width: '100%', marginBottom: '40px' }}>
            <Box sx={{ 
              height: '200px',
              display: 'flex', 
              boxShadow: '0px 10px 15px 11px rgba(0,0,0,0.1), 0px 10px 15px -3px rgba(0,0,0,0.1)'
            }}>
              <Box sx={{ width: '40%', backgroundColor: '#4259c1', padding: '32px 45px', color: 'white', borderRadius: '10px 0px 0px 10px' }}>
                <Typography variant='h4' sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
                  Session Management
                </Typography>
                <Typography variant='body1' sx={{ fontWeight:'1.5rem', color:'#d0d0d0'}}>
                Worried that your account or password has been compromised? You can forcibly log out from all TaskSync apps</Typography>
              </Box>
              <Box sx={{ width: '60%', backgroundColor: '#d6e1f7', padding: '32px 45px', borderRadius: '0px 10px 10px 0px', display:'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={() => setModalOpen(true)}
                  sx={{ 
                    backgroundColor: '#4259c1',
                    '&:hover': {
                      backgroundColor: '#1f295a'
                    },
                    padding: '10px 30px'
                  }}
                >
                  Logout Everywhere
                </Button>
              </Box>
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

      {/* Add the modal to your component */}
      <LogoutConfirmationModal 
        open={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        onConfirm={handleLogout} 
      />
    </Box>
  );
};

export default Profile;