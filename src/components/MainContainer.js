import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SideContainer from './SideContainer.js';
import Grid from '@material-ui/core/Grid';
import Image from '../Img/Loadout.jpeg';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '960px',
    height: '600px',
    backgroundImage: `url(${Image})`,
    backgroundSize: '960px 600px',
    backgroundRepeat: 'no-repeat',
  },

  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function MainContainer({loadoutState, toggleDrawer}) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
    <Grid container spacing={3}>
      <Grid item xs={3}>
        <SideContainer loadoutState={loadoutState} toggleDrawer={toggleDrawer}/>
      </Grid>
      <Grid item xs={9}>

      </Grid>
    </Grid>
    </Paper>
  );
}
