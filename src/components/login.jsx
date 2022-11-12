import React , {useState, useEffect} from 'react';
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
import { useNavigate } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
import TwitterIcon from '@mui/icons-material/Twitter';
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
export default function SignIn() {
   const {currentUser, facebooklogin, login, googleLogin, twitterLogin, appleLogin} = useAuth();
   console.log('currentUser', currentUser &&  currentUser);
   const navigate = useNavigate();
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);
   const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);        
        try {
            setError("")
            setLoading(true)
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
   const user = await login(data.get('email'), data.get('password'))
   console.log(user);
        } catch(e) {
            console.log(e);
            setError('Faild, Try again');
        }
        setLoading(false)
  }
  const habdleSocialLogin = async (soccial) => {
      if (soccial === "facebook"){
          try {
       await facebooklogin();
         
          } catch (error) {
          setError(error)
            console.log(error);
          }
      } else if (soccial === "google") {
        try {
          await googleLogin()

        } catch (error) {
          setError(error)
           console.log(error);
        }
      } else if (soccial === "apple"){
try {
  
} catch (error) {
  setError(error)
  console.log(error);
}
      }
      else if (soccial === "twitter"){
       await twitterLogin()
try {
  
} catch (error) {
  setError(error)
  console.log(error);
}
      }
  }
useEffect(() => {
  if(currentUser) return navigate("/userProfile");
}, [currentUser, navigate])
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
            Sign in
          </Typography>
          <Stack sx={{ width: '100%', justifyContent: 'center'}} spacing={2} direction="row">
          <Button onClick={()=> habdleSocialLogin("facebook")}><FacebookIcon /></Button>
          <Button onClick={()=> habdleSocialLogin("google")}><GoogleIcon/></Button>
            <Button onClick={()=> habdleSocialLogin("apple")}><AppleIcon /></Button>
          <Button onClick={()=> habdleSocialLogin("twitter")}><TwitterIcon/></Button>
          

          </Stack>
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/passwordReset" variant="body2">
                  Forgot password?
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