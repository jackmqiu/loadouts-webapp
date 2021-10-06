
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    display: 'flex',
    maxWidth: 600,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  loadoutTitleContainer: {
    minHeight: 160,
    marginLeft: '10%',
    marginRight: '10%',
    paddingBottom: 30,
  },
  loadoutTitle: {
    fontWeight: 'bold',
    marginTop: 45,
    marginBottom: 5,
  },
}))

const TitleBar = ({

}) => {
  return (
    <div>
      <div className={classes.TopBar}>
      </div>
    </div>
  )
}

export default TitleBar;
