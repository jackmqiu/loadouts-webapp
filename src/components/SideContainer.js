import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Link from '@material-ui/core/Link';
import WeaponCard from './WeaponCard.js';
import ModCard from './ModCard.js';
import { Column, Row, Item } from '@mui-treasury/components/flex';

const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
    // flexDirection: 'column',
    // minHeight: '100vh',
    paddingLeft: 60,
  },
  main: {
    // marginTop: theme.spacing(8),
    // marginBottom: theme.spacing(2),
  },
  loadoutTitle: {
    color: '#4F8A99',
    padding: '5px 0 25px 0',
    // fontFamily: 'Raleway',
  }
}));


export default function SideContainer({loadoutState, toggleDrawer}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Column>
        <Item className={classes.loadoutTitle}>
          <Typography variant="h4">

          </Typography>
        </Item>
        <WeaponCard gun={loadoutState.primary} weaponSelection={'primary'} toggleDrawer={toggleDrawer}/>
        <WeaponCard gun={loadoutState.secondary} weaponSelection={'secondary'} toggleDrawer={toggleDrawer}/>
      </Column>
    </div>
  );
}
