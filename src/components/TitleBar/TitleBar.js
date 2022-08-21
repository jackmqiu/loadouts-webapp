
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Chip from '@mui/material/Chip';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    display: 'flex',
    // maxWidth: 600,
    marginRight: 'auto',
    marginLeft: 'auto',
    // height: 30,
  },
  // TopBar: {
  //
  //   // minHeight: 160,
  //   // marginLeft: '10%',
  //   // marginRight: '10%',
  //   // paddingBottom: 30,
  // },
  Logo: {
    width: 170,
    marginRight: 50,
  },
  AppLinkChip: {
    height: 40,
    borderRadius: 40,
    fontSize: 16,
    fontWeight: 700,
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 'auto',
    marginRight: 8,
  },
}))

const TitleBar = ({

}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <img className={classes.Logo} src='https://i.imgur.com/vObyeho.png'/>
      <Chip className={classes.AppLinkChip} color='primary' label='App Coming'/>
    </div>
  )
}

export default TitleBar;
