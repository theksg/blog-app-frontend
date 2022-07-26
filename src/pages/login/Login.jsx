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
import "./login.css"
import {useRef} from 'react';
import { Context } from '../../context/Context';
import axios from "axios";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link className="link" to="/home">
        TheKSG                        
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {;

  const userRef=useRef(null);
  const passwordRef=useRef(null);
  const {dispatch,isFetching}=React.useContext(Context)

  const handleSubmit =async (event) => {
    event.preventDefault();
    dispatch({type:"LOGIN_START"})

    try{

      const res = await axios.post(window.env.BE_URL +"/auth/login",{
        username:userRef.current.value,
        password:passwordRef.current.value
      })
      dispatch({type:"LOGIN_SUCCESS",payload:res.data})
    }
    catch(error){
      alert("Wrong Credentials Entered!")
      dispatch({type:"LOGIN_FAILURE",})
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address / Username"
              name="email"
              autoComplete="email"
              type="email"
              inputRef={userRef}
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
              inputRef={passwordRef}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isFetching}
            >
              Sign In
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
              <Link className="linkGeneral" to="/register">
              {"Don't have an account? Sign Up"}                        
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