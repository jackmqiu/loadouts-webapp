
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useAuth0 } from "@auth0/auth0-react";

const useStyles = makeStyles(() => ({
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
    paddingBottom: 30,
    marginTop: 40,
  },
  LoginTitle: {
    fontWeight: 'bold',
    marginTop: 45,
    marginBottom: 5,
  },
  TextField: {
    width: '100%',
  },
  Login: {
    width: '100%',
    marginTop: 50,
  }
}))

const Login = ({

}) => {
  const [usernameText, setUsernameText] = useState('');
  const [passwordText, setPasswordText] = useState('');
  const classes = useStyles();
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  console.log(user);

  const handleUsernameTextChange = (event) => {
    setUsernameText(event.target.value);
  };
  const handlePasswordTextChange = (event) => {
    setPasswordText(event.target.value);
  };
  const handleSubmitLogin = (event) => {
    if (event.key === 'Enter') {
      if (usernameText && passwordText) {

      }
      event.preventDefault();
    }
  }
  return (
    <div>
      <Typography color='primary' variant='h5' className={classes.LoginTitle}> Welcome! </Typography>
      <div className={classes.LoginContainer}>
        <TextField autoFocus={true} className={classes.TextField} value={usernameText}  margin="dense" label="Username" variant="outlined" onChange={handleUsernameTextChange} onKeyPress={handleSubmitLogin} />
        <TextField autoFocus={true} className={classes.TextField} value={passwordText}  margin="dense" label="Password" type='password' variant="outlined" onChange={handlePasswordTextChange} onKeyPress={handleSubmitLogin} />
        <Button onClick={() => loginWithRedirect()} className={classes.Login} variant='contained' color='primary'> Log In </Button>
        <Button onClick={() => loginWithRedirect({ screen_hint: "signup" })} className={classes.Login} variant='contained' color='primary'> Sign Up </Button>
      </div>
    </div>
  )
}

export default Login;
