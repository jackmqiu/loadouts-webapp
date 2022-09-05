
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

  const handleUsernameTextChange = (event) => {
    setUsernameText(event.target.value);
  };
  const handlePasswordTextChange = (event) => {
    setPasswordText(event.target.value);
  };
  const handleSubmitLogin = (event) => {
    if (event.key === 'Enter') {
      if (usernameText && passwordText) {
        axiosInstance.post('/login/password', {
          username: usernameText,
          password: passwordText,
        })
        .then((res) => {
          if (res.data.success) {
            setLoggedInUser(res.data.success);
          }
        })
      }
      event.preventDefault();
    }
  }

  return (
    <div>
      <Typography color='primary' variant='h5' sx={styles.LoginTitle}> Welcome! </Typography>
      <Box sx={styles.LoginContainer}>
        <TextField autoFocus={true} sx={styles.TextField} value={usernameText}  margin="dense" label="Username" variant="outlined" onChange={handleUsernameTextChange} onKeyPress={handleSubmitLogin} />
        <TextField autoFocus={true} sx={styles.TextField} value={passwordText}  margin="dense" label="Password" type='password' variant="outlined" onChange={handlePasswordTextChange} onKeyPress={handleSubmitLogin} />
        <Button onClick={handleSubmitLogin} sx={styles.Login} variant='contained' color='primary'> Log In / Sign Up </Button>
      </Box>
    </div>
  )
}

export default Login;
