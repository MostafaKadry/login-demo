import React , {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import {useAuth} from '../contexts/AuthContext.js';
const  Copyright = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mostafakadry.github.io/mostafa-kadry-portfolio/">
        My Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();
const PasswordReset = () => {
 const {resetPassword}=useAuth();
   const {currentUser} = useAuth();
   console.log('currentUser', currentUser &&  currentUser.email);

   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);
   const [msg, setMessage] = useState("");
   const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);        
        try {
            setError("")
            setMessage("")
            setLoading(true)
    console.log({
      email: data.get('email'),
    });
   const user = await resetPassword(data.get('email'));
   console.log(user);
   setMessage("Check your inbox for further instructions.")
          
        } catch(e) {
            console.log(e);
            setError('Faild, Try again');
        }
        setLoading(false)
  }


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
            {error && ( <Stack sx={{ width: '100%',marginTop: 4 }} spacing={2}>
            <Alert severity="error">{error}</Alert>
          </Stack>)}
            {loading && ( <Stack sx={{ width: '100%',marginTop: 4 }} spacing={2}>
            <Alert severity="info">loading...</Alert>
          </Stack>)}
          {
            msg && (
                <Stack sx={{ width: '100%',marginTop: 4 }} spacing={2}>
            <Alert severity="success">{msg}</Alert>
          </Stack>
            )
          }
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
           Reset Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              Reset Password
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/login" variant="body2">
                  Login
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default PasswordReset