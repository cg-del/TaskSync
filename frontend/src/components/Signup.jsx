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
import { AppProvider } from '@toolpad/core/AppProvider';
import * as React from 'react';
import axios from 'axios'; // Import axios
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useUser } from '../UserContext'; // Import useUser

export default function CustomSignUp({ toggleAuth }) {
  const theme = useTheme();
  const navigate = useNavigate(); // Initialize useNavigate
  const { setUser } = useUser(); // Get setUser from UserContext
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    username: '',
    email: '',
    password: '',
    occupation: '',
  });
  const [error, setError] = React.useState(''); // State for error message
  const [success, setSuccess] = React.useState(''); // State for success message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Updated handleSubmit to include API call and redirect
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message
    setSuccess(''); // Reset success message
    try {
      const response = await axios.post('http://localhost:8080/api/user/signup', formData);
      console.log('Response data:', response.data); // Log the response data
      setUser(response.data); // Set user data in context
      setSuccess('Signup successful!'); // Set success message
      // Clear input fields
      setFormData({
        username: '',
        email: '',
        password: '',
        occupation: '',
      });
      navigate('/'); // Redirect to home page after successful signup
    } catch (err) {
      console.error('Signup error:', err); // Log the error for debugging
      if (err.response) {
        setError('Signup failed: ' + (err.response.data?.message || 'Server error'));
      } else {
        setError('Signup failed: ' + err.message);
      }
      setSuccess('');
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
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 400,
            padding: 3,
            borderRadius: '8px',
            backgroundColor: 'white',
            border: 'none', // Make border invisible
          }}
        >
          <Typography variant="h4" component="h1" align="left" gutterBottom>
            Sign Up
          </Typography>

          <Typography variant="body1" align="left" sx={{ mb: 2 }}>
            Welcome user!
          </Typography>

          {error && <Typography color="error">{error}</Typography>} {/* Display error message */}
          {success && <Typography color="success">{success}</Typography>} {/* Display success message */}

          <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
            <InputLabel size="small" htmlFor="outlined-adornment-name">
              Name
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-name"
              label="Username"
              name="username"
              type="text"
              size="small"
              required
              onChange={handleChange}
            />
          </FormControl>

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
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <AccountCircle />
                </InputAdornment>
              }
            />
          </FormControl>

          <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
            <InputLabel size="small" htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              size="small"
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
            <InputLabel size="small" htmlFor="outlined-adornment-occupation">
              Occupation
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-occupation"
              label="Occupation"
              name="occupation"
              type="text"
              size="small"
              required
              onChange={handleChange}
            />
          </FormControl>

          <Button
            type="submit"
            variant="contained" // Changed to contained for a solid button
            color="primary" // Set button color to gray
            size="large"
            disableElevation
            fullWidth
            sx={{ my: 2 }}
          >
            Sign Up
          </Button>

          <Link href="/Login" onClick={toggleAuth} variant="body2" sx={{ textAlign: 'center' }}>
            Already have an account? Sign in
          </Link>
        </Box>
      </Box>
    </AppProvider>
  );
}