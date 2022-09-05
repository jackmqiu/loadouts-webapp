import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
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
}

const Profile = ({
  mixpanel,
  loggedInUser,
  setLoggedInUser
}) => {
  const handleLogout = () => {
    console.log('handleLogout')
    axiosInstance.post('/logout')
    .then((res) => {
      if (res.data.success) {
        setLoggedInUser({});
      }
    }) 
  }
  return (
    <div>
      Profile
      <Button onClick={() => {handleLogout()}} sx={styles.Login} variant='contained' color='primary'> Log Out </Button>
    </div>
  )
}

export default Profile;
