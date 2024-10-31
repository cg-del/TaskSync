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

const providers = [{ id: 'credentials', name: 'Email and Password' }];

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
  const [showPassword, setShowPassword] = React.useState(false);

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

function SignUpLink({ toggleAuth }) {
  return (
    <Link href="#" onClick={toggleAuth} variant="body2" sx={{ textAlign: 'center' }}>
      Not registered yet? Create an account
    </Link>
  );
}

export default function SlotsSignIn({ toggleAuth }) {
  const theme = useTheme();
  const [formData, setFormData] = React.useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Signing in with: ${JSON.stringify(formData)}`);
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
            Login
          </Typography>
          <Typography variant="body1" align="left" sx={{ mb: 2 }}>
            Hi, Welcome back
          </Typography>

          <CustomEmailField onChange={handleChange} />
          <CustomPasswordField onChange={handleChange} />

          <CustomButton />

          <SignUpLink toggleAuth={toggleAuth} />
        </Box>
      </Box>
    </AppProvider>
  );
}