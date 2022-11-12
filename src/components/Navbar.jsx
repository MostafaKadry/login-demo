import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
const Navbar = () => {
  return (
     <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>

          <Typography variant="h6" component="a" href="/" sx={{ flexGrow: 1, textDecoration: 'none', color: '#fff' }}>
            News
          </Typography>
            <Typography variant="div" component="a" sx={{textDecoration: 'none', color: 'inherit'}} href="/login">
          <Button color="inherit">
            Login
            </Button>
            </Typography >
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar;