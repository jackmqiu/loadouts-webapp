import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth0 } from "@auth0/auth0-react";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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

const Profile = ({
  mixpanel
}) => {
  const { logout } = useAuth0();
  const classes = useStyles();
  return (
    <div>
      Profile

      <Button onClick={() => logout()} className={classes.Login} variant='contained' color='primary'> Log Out </Button>

    </div>
  )
}

export default Profile;
