
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axiosInstance from '../../API/axiosBase';

const styles = {
  root: {
    width: '100%',
    display: 'flex',
    maxWidth: 600,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  LoginContainer: {
    minHeight: 160,
    marginLeft: '5%',
    marginRight: '5%',
    paddingBottom: 4,
    marginTop: 7,
  },
  LoginTitle: {
    fontWeight: 'bold',
    marginTop: 7,
    marginBottom: 1,
  },
  TextField: {
    width: '100%',
  },
  Login: {
    width: '100%',
    marginTop: 6,
  }
}

const Login = ({
  setLoggedInUser
}) => {
  const [usernameText, setUsernameText] = useState('');
  const [passwordText, setPasswordText] = useState('');
  const [emailText, setEmailText] = useState('');

  const handleUsernameTextChange = (event) => {
    setUsernameText(event.target.value);
  };
  const handlePasswordTextChange = (event) => {
    setPasswordText(event.target.value);
  };
  const handleEmailTextChange = (event) => {
    setEmailText(event.target.value);
  }

  const submitLogin = () => {
    if (emailText && passwordText) {
      axiosInstance.post('/login/password', {
        username: emailText,
        password: passwordText,
      })
      .then((res) => {
        if (res.data.success) {
          setLoggedInUser(res.data.success);
        }
      })
    }
  }

  const handleSubmitLogin = (event) => {
    if (event.key === 'Enter') {
      submitLogin();
      event.preventDefault();
    }
  }

  const submitSignUp = () => {
    if (usernameText && passwordText && emailText) {
      axiosInstance.post('/users/new', {
        username: usernameText,
        password: passwordText,
        email: emailText
      })
      .then((res) => {
        if (res.data.acknowledged) {
          submitLogin();
        }
      })
    }
  }

  const handleSubmitSignUp = (event) => {
    if (event.key === 'Enter') {
      submitSignUp();
      event.preventDefault();
    }
  }

  return (
    <div>
      <Typography color='primary' variant='h5' sx={styles.LoginTitle}> Welcome! </Typography>
      <Box sx={styles.LoginContainer}>
        <TextField autoFocus={true} sx={styles.TextField} value={emailText}  margin="dense" label="Email" variant="outlined" onChange={handleEmailTextChange} onKeyPress={handleSubmitLogin} />
        <TextField autoFocus={true} sx={styles.TextField} value={passwordText}  margin="dense" label="Password" type='password' variant="outlined" onChange={handlePasswordTextChange} onKeyPress={handleSubmitLogin} />
        <TextField autoFocus={true} sx={styles.TextField} value={usernameText}  margin="dense" label="Username (for sign up)" variant="outlined" onChange={handleUsernameTextChange} onKeyPress={handleSubmitSignUp} />
        <Button onClick={() => { submitLogin() }} sx={styles.Login} variant='contained' color='primary'> Log In </Button>
        <Button onClick={() => { submitSignUp() }} sx={styles.Login} variant='contained' color='primary'> Sign Up </Button>
      </Box>
    </div>
  )
}

export default Login;
