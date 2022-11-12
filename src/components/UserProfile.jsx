import React, {useState} from 'react'
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'; 
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useAuth} from '../contexts/AuthContext.js';
import {Link} from "react-router-dom";
const UserProfile = () => {
   const {currentUser, logout} = useAuth();
   console.log(currentUser);
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const back=async (to)=> {
        try {
          setLoading(true);
          setError("");
           await logout()
           navigate("/login")
          } catch (error) {
            console.log(error);
            setError("error");
          }
          setLoading(false)
          return;
    }
    const handleRedirect = () => {
      navigate("/UpdateProfile");
      return
    }
  return (
    <Stack width={"400px"} m="3rem auto">
      {!currentUser && (
        <>
        <Typography component="h3">
          If you try to reach to your account <Link to="/login">Login in</Link>
        </Typography>
        <Typography component="h3">
          If you havn't an account <Link to="/register">Register new account</Link>
        </Typography>
        
        </>
      )}
              {error && ( <Stack sx={{ width: '100%',marginTop: 4 }} spacing={2}>
            <Alert severity="error">{error}</Alert>
          </Stack>)}
            {loading && ( <Stack sx={{ width: '100%',marginTop: 4 }} spacing={2}>
            <Alert severity="info">loading...</Alert>
          </Stack>)}
{currentUser && <Card sx={{ minWidth: 275 }}>
        <CardActions>
        <Button size="small" onClick={()=> back("/")}>{<ArrowBackIcon/>} </Button>
      </CardActions>
      <CardContent>
        {currentUser.reloadUserInfo && (
            <Avatar sx={{ m: '0px auto 16px auto', bgcolor: 'secondary.main' }}>
            <img src={currentUser.photoURL? currentUser.photoURL : currentUser.reloadUserInfo.providerUserInfo[0].photoUrl} alt="profile"/>
          </Avatar>
        )}
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
       <strong> Email: </strong>  {currentUser.email? currentUser.email : currentUser.reloadUserInfo.providerUserInfo[0].email}
        </Typography>
      {currentUser.displayName && (<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
       <strong> Name: </strong>  {currentUser.displayName}
        </Typography>    )}  
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
              onClick={handleRedirect}
            >
              Update Profile
            </Button>

      </CardContent>

    </Card>}
    </Stack>
      )
}
export default UserProfile