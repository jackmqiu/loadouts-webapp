import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
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
  },
  Loadouts: {
    margin: 2,
  }
}

const Profile = ({
  mixpanel,
  loggedInUser,
  setLoggedInUser
}) => {
  const handleLogout = () => {
    axiosInstance.post('/logout')
    .then((res) => {
      if (res.data.success) {
        setLoggedInUser({});
        localStorage.clear();
      }
    }) 
  }
  const userLoadouts = [];
  loggedInUser?.loadouts?.forEach((loadout) => {
    userLoadouts.push(
      <Link
        href={`/${loadout._id}`}
      >
        <Paper sx={styles.Loadouts}>
          {loadout.title}
        </Paper>
      </Link>
    )
  })

  useEffect(() => {
    axiosInstance.get('/users/find', {
      params: {
        email: loggedInUser.email,
      }
    })
    .then((res) => {
      if (res.data) {
        setLoggedInUser(res.data);
      }
    })
  }, [])
  return (
    <div>
      Profile
      <Box>{loggedInUser.username}</Box>
      <Box>{loggedInUser.email}</Box>
      <Box>
        <Typography> Loadouts </Typography>
        <Stack>
        {
          userLoadouts
        }
        </Stack>
      </Box>
      <Button onClick={() => {handleLogout()}} sx={styles.Login} variant='contained' color='primary'> Log Out </Button>
    </div>
  )
}

export default Profile;
