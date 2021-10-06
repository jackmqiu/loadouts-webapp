import React, { useState, useEffect } from 'react';
import Profile from './Profile';
import Login from './Login';
import TitleBar from '../TitleBar';
import Divider from '@material-ui/core/Divider';

const ProfilePage = ({
  mixpanel
}) => {
  return (
    <div>
      <TitleBar mixpanel={mixpanel}/>
      <Divider/>
      <Login mixpanel={mixpanel}/>
    </div>
  )
}

export default ProfilePage;
