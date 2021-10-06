
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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
    marginLeft: '10%',
    marginRight: '10%',
    paddingBottom: 30,
  },
  LoginTitle: {
    fontWeight: 'bold',
    marginTop: 45,
    marginBottom: 5,
  },
}))

const Login = ({

}) => {
  const [usernameText, setUsernameText] = useState('');
  const [passwordText, setPasswordText] = useState('');
  const classes = useStyles();
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
      <div className={classes.LoginTitle}> Login </div>
      <div className={classes.LoginContainer}>
        <TextField autoFocus={true} className={classes.select} value={usernameText}  margin="dense" label="Username" variant="outlined" onChange={handleUsernameTextChange} onKeyPress={handleSubmitLogin} />
        <TextField autoFocus={true} className={classes.select} value={passwordText}  margin="dense" label="Password" type='password' variant="outlined" onChange={handlePasswordTextChange} onKeyPress={handleSubmitLogin} />
      </div>
    </div>
  )
}

export default Login;
