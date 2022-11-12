import React, {useState} from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useAuth} from '../contexts/AuthContext.js';
import { useNavigate } from 'react-router-dom';
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


const UpdateProfile = () => {
 const {currentUser, UpdateEmail, UpdatePassword}=useAuth();
   const navigate = useNavigate();
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);

   const handleSubmit = (event) => {
    event.preventDefault();
    setError("")
    setLoading(true)
    const data = new FormData(event.currentTarget);
    const promises  = [];
    console.log(data);   
    if(data.get('email') !== currentUser.email){
        promises.push(UpdateEmail(data.get('email')))

    }     
    if(data.get('password')){
        if(data.get('password') !== currentUser.password){
      promises.push(UpdatePassword(data.get('password')))
    }
    }
          
    Promise.all(promises).then((r) => 
    {
        console.log(r);
        navigate("/userProfile");
    }
    ).catch((err) => {
        setError("Failed to update your account")
        console.log(err)}
    ).finally(() => {
        setLoading(false)
    })
        
  };

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
        <Box
          sx={{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            W
          </Avatar>
          <Typography component="h1" variant="h5">
            Update your Profile
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
              defaultValue={currentUser && currentUser.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              placeholder='Leave blank to keep Password the same'
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              Update
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/userProfile">
                  Cancel
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

export default UpdateProfile