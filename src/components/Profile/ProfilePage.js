import React, { useState, useEffect } from 'react';
import Profile from './Profile';
import Login from './Login';

const ProfilePage = ({
  mixpanel
}) => {
  return (
    <div>
      <Login mixpanel={mixpanel}/>
    </div>
  )
}

export default ProfilePage;
