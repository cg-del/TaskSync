import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios'; // Added axios
import React, { useState } from 'react'; // Added useState
import { Link as RouterLink, useNavigate } from 'react-router-dom'; // Added useNavigate
import { useUser } from '../UserContext'; // Added useUser
import logo1 from '../assets/logo2.png'; // Adjust the path to your logo image
import logo2 from '../assets/logologin.png'; // Adjust the path to your logo image
import Typography from '@mui/material/Typography';
import { AppProvider } from '@toolpad/core/AppProvider';

function CustomEmailField({ onChange }) {
  return (
    <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
      <InputLabel size="small" htmlFor="outlined-adornment-email">
        Email
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-email"
        label="Email"
        name="email"
        type="email"
        size="small"
        required
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <AccountCircle />
          </InputAdornment>
        }
      />
    </FormControl>
  );
}

function CustomPasswordField({ onChange }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
      <InputLabel size="small" htmlFor="outlined-adornment-password">
        Password
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        name="password"
        size="small"
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              size="small"
            >
              {showPassword ? (
                <VisibilityOff fontSize="inherit" />
              ) : (
                <Visibility fontSize="inherit" />
              )}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
    </FormControl>
  );
}

function CustomButton() {
  return (
    <Button
      type="submit"
      variant="contained" // Changed to contained for a solid button
      size="large"
      disableElevation
      fullWidth
      sx={{ my: 2 , color: '#eeeeee', backgroundColor: '#4259c1', fontWeight: 'simi-bold', }}
    >
      Login
    </Button>
  );
}

function SignUpLink() {
  return (
    <RouterLink to="/Signup" style={{ textAlign: 'center', textDecoration: 'none' }}>
      <Typography sx={{}}>
        <span  style = {{color: '#333'}}>Not registered yet?</span> <span style = {{color: '#4259c1'}} >Create an account</span>
      </Typography>
      
    </RouterLink>
  );
}

export default function SlotsSignIn({ toggleAuth }) {
  const theme = useTheme();
  const [formData, setFormData] = useState({ email: '', password: '' }); // Changed to use email and password
  const [error, setError] = useState(''); // Added error state
  const [success, setSuccess] = useState(''); // Added success state
  const { setUser } = useUser(); // Access the context
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => { // Changed to async function
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/user/login', { // API call
        username: formData.email, // Use email as username
        password: formData.password,
      });
      setUser(response.data); // Set user data in context
      setSuccess('Login successful!'); // Set success message
      setError(''); // Clear error message
      console.log('Login successful:', response.data);
      navigate('/Home'); // Redirect to home after successful login
    } catch (err) {
      setError('Login failed: ' + (err.response?.data?.message || 'Unknown error')); // Set error message
      setSuccess(''); // Clear success message
    }
  };

  return (
    <AppProvider theme={theme}>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full viewport height
        backgroundImage: 'linear-gradient(45deg, #4259c1, #1f295a)',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit} // Updated to handleSubmit
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: 700,
          minWidth: 450,
          height: 670,
          padding: 4,
          borderRadius: '12px 0 0 12px',
          backgroundColor: '#d6e1f7',
        }}
      >
        <Box sx={{          
          display: 'flex',
          flexDirection: 'column',
          paddingBottom: 5,
          paddingLeft: 5,
          paddingRight: 5
          }}>
        <img src={logo2} alt="Logo" style={{ height: '120px', marginBottom: '20px', alignSelf: 'center' }} />

        <Box 
          sx={{
           
        }}
        >
          <Typography variant="h4" align="left" sx={{ color: '#1f295a', fontWeight: 'bold'}}>
          Welcome back
          </Typography>

          <Typography align="left" sx={{ mb: 4 }}>
          We are happy to see you again.
          </Typography>
        </Box>
        <Box sx={{
        }}>
          <CustomEmailField onChange={handleChange} />
        </Box>
        <Box sx={{
          marginBottom: 2
        }}>
          <CustomPasswordField onChange={handleChange} />
          </Box>
        <Box sx={{
          marginBottom: 17
        }}>
          <CustomButton />
        </Box>
        {error && <Typography color="error" align="center">{error}</Typography>}
        {success && <Typography color="success" align="center">{success}</Typography>}

        <SignUpLink toggleAuth={toggleAuth} />
      </Box>
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit} // Updated to handleSubmit
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: 700,
          minWidth: 450,
          height: 670,
          padding: 4,
          borderRadius: '0px 12px 12px 0px',
          backgroundColor: '#4259c1',
          justifyContent: 'center'
        }}
      >
      <img src={logo1} alt="Logo" style={{ height: '180px', marginBottom: '40px', alignSelf: 'center', }} />
      </Box>
    </Box>
    </AppProvider>
  );
}