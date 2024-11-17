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
  Select,
  MenuItem,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import * as React from 'react';
import axios from 'axios'; // Import axios
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useUser } from '../UserContext'; // Import useUser
import { useState } from 'react'; // Ensure useState is imported
import logo from '../assets/logo.png'; // Adjust the path to your logo image

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
  const [confirmPassword, setConfirmPassword] = React.useState(''); // State for confirm password

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'confirmPassword') {
      setConfirmPassword(value); // Update confirm password state
    } else {
      setFormData({ ...formData, [name]: value });
    }
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

    // Validate password and confirm password
    if (formData.password !== confirmPassword) {
      setError('Passwords do not match.'); // Set error message if passwords do not match
      return;
    }

    // Password validation
    const passwordValidation = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/; // At least 8 characters, at least one special character
    if (!passwordValidation.test(formData.password)) {
      setError('Password must be at least 8 characters long and contain at least one special character.'); // Set error message for password validation
      return;
    }

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
      setConfirmPassword(''); // Clear confirm password field
      navigate('/Home'); // Redirect to home page after successful signup
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
            padding: 4, // Increased padding for a modern look
            borderRadius: '12px', // Match the border radius with login
            backgroundColor: 'white',
            boxShadow: 3, // Add shadow for a modern look
          }}
        >
          <img src={logo} alt="Logo" style={{ height: '60px', marginBottom: '20px', alignSelf: 'center' }} />

          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Sign Up
          </Typography>

          <Typography variant="body1" align="center" sx={{ mb: 2 }}>
            Welcome user!
          </Typography>

          {error && <Typography color="error" align="center">{error}</Typography>}
          {success && <Typography color="success" align="center">{success}</Typography>}

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
            <InputLabel size="small" htmlFor="outlined-adornment-confirm-password">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-confirm-password"
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
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
              label="Confirm Password"
            />
          </FormControl>

          <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
            <InputLabel size="small" htmlFor="outlined-adornment-occupation">
              Occupation
            </InputLabel>
            <Select
              id="outlined-adornment-occupation"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              size="small"
              label="Occupation"
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
              {/* Add more options as needed */}
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            color="primary"
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