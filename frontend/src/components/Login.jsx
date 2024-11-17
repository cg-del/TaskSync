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
  OutlinedInput,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios'; // Added axios
import React, { useState } from 'react'; // Added useState
import { Link as RouterLink, useNavigate } from 'react-router-dom'; // Added useNavigate
import { useUser } from '../UserContext'; // Added useUser
import logo from '../assets/logo.png'; // Adjusted path to your logo image

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
      color="primary" // Set button color to gray
      size="large"
      disableElevation
      fullWidth
      sx={{ my: 2 }}
    >
      Login
    </Button>
  );
}

function SignUpLink() {
  return (
    <RouterLink to="/Signup" style={{ textAlign: 'center', textDecoration: 'none' }}>
      Not registered yet? Create an account
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
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full viewport height
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit} // Updated to handleSubmit
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: 400,
          padding: 4,
          borderRadius: '12px',
          backgroundColor: 'white',
          boxShadow: 3, // Add shadow for a modern look
        }}
      >
        <img src={logo} alt="Logo" style={{ height: '60px', marginBottom: '20px', alignSelf: 'center' }} />

        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Login
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 2 }}>
          Hi, Welcome back
        </Typography>

        <CustomEmailField onChange={handleChange} />
        <CustomPasswordField onChange={handleChange} />

        <CustomButton />

        {error && <Typography color="error" align="center">{error}</Typography>}
        {success && <Typography color="success" align="center">{success}</Typography>}

        <SignUpLink toggleAuth={toggleAuth} />
      </Box>
    </Box>
  );
}