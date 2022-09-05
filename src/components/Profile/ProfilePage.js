import React, { useState, useEffect } from 'react';
import Profile from './Profile';
import Login from './Login';
import TitleBar from '../TitleBar';
import Divider from '@mui/material/Divider';

const ProfilePage = ({
  mixpanel, userData, loggedInUser, setLoggedInUser
}) => {
  return (
    <div>
      <TitleBar mixpanel={mixpanel}/>
      <Divider/>
      {
        loggedInUser?.email ?
        <Profile
          mixpanel={mixpanel}
          userData={userData}
          loggedInUser={loggedInUser}
          setLoggedInUser={setLoggedInUser}
        /> :
        <Login
          mixpanel={mixpanel}
          userData={userData}
          setLoggedInUser={setLoggedInUser}
        />
      }
    </div>
  )
}

export default ProfilePage;
