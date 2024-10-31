import * as React from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  InputAdornment,
  Link,
  IconButton,
  Box,
  Typography,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AppProvider } from '@toolpad/core/AppProvider';
import { useTheme } from '@mui/material/styles';

export default function CustomSignUp({ toggleAuth }) {
  const theme = useTheme();
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    occupation: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Signing up with: ${JSON.stringify(formData)}`);
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

          <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
            <InputLabel size="small" htmlFor="outlined-adornment-name">
              Name
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-name"
              label="Name"
              name="name"
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

          <Link href="#" onClick={toggleAuth} variant="body2" sx={{ textAlign: 'center' }}>
            Already have an account? Sign in
          </Link>
        </Box>
      </Box>
    </AppProvider>
  );
}