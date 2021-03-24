import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Link from '@material-ui/core/Link';
import WeaponCard from './WeaponCard.js';
import ModCard from './ModCard.js';

const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
    // flexDirection: 'column',
    // minHeight: '100vh',
  },
  main: {
    // marginTop: theme.spacing(8),
    // marginBottom: theme.spacing(2),
  },
  // leftContainer: {
  //   padding: theme.spacing(10, 2),
  //   marginRight: 'auto',
  //   backgroundColor:
  //     theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  // },
}));

export default function SideContainer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      <Typography variant="body1">Loadout</Typography>
      <div>
        <WeaponCard loadoutClass={'primary'}/>
        <WeaponCard loadoutClass={'secondary'}/>
        <ModCard/>
      </div>
    </div>
  );
}
