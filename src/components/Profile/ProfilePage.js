import React, { useState, useEffect } from 'react';
import Profile from './Profile';
import Login from './Login';
import TitleBar from '../TitleBar';
import Divider from '@mui/material/Divider';

const ProfilePage = ({
  mixpanel, userData, userMetadata, isAuthenticated, isLoading
}) => {
  return (
    <div>
      <TitleBar mixpanel={mixpanel}/>
      <Divider/>
      {
        isAuthenticated ?
        <Profile
          mixpanel={mixpanel}
          userData={userData}
          userMetadata={userMetadata}
          isAuthenticated={isAuthenticated}
          isLoading={isLoading}
        /> :
        <Login
          mixpanel={mixpanel}
          userData={userData}
          userMetadata={userMetadata}
          isAuthenticated={isAuthenticated}
          isLoading={isLoading}
        />
      }
    </div>
  )
}

export default ProfilePage;
