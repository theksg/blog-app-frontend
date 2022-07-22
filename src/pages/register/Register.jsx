import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./register.css"
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../context/Context";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link className="link" to="/home">
        TheKSG                        
      </Link>
        {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Register() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {dispatch,isFetching}=useContext(Context)



  const handleSubmit = async(event) => {
    event.preventDefault();
    dispatch({type:"LOGIN_START"})
    try{
      const res= await axios.post("/auth/register",{
        username,
        email,
        password
      })

      if(res?.data){
        dispatch({type:"LOGIN_SUCCESS",payload:res.data})
        window.location.replace("/settings");
      }
    }
    catch(err){
      dispatch({type:"LOGIN_FAILURE"})
      if('username' in err.response.data.keyPattern)
        alert(`Account for username ${err.response.data.keyValue.username} already exists`)
      else if('email' in err.response.data.keyPattern)
        alert(`Account for email ${err.response.data.keyValue.email} already exists`)
      else if('emailPattern' in err.response.data.keyPattern)
        alert(`Invalid e-mail address added`)
    }
  };

  return (
    <div className="loginWrapper">
      <div className="login">

    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
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
              type="email"
              autoFocus
              value={email}
              onChange={event=>setEmail(event.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              type="text"
              value={username}
              onChange={event=>setUsername(event.target.value)}
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
              value={password}
              onChange={event=>setPassword(event.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isFetching}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
              <Link className="linkGeneral" to="/login">
                  Forgot Password                       
              </Link>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item>
              <Link className="linkGeneral" to="/login">
              {"Already have an account? Sign In"}                        
              </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    </div>
    </div>
  );
}