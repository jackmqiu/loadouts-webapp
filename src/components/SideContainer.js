import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Link from '@material-ui/core/Link';
import WeaponCard from './WeaponCard.js';
import { Column, Row, Item } from '@mui-treasury/components/flex';
import backgroundImage from '../Img/dotted_background.png';

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
    padding: '5px 0 20px 0',
    // fontFamily: 'Raleway',
  },
  watermark: {
    width: 200,
    height: 30,
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: '200px 200px',
    backgroundColor: 'transparent',
    margin: '15px 5px 5px 5px',
  }
}));


export default function SideContainer({loadoutState, toggleDrawer}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Column>
        <Card className={classes.watermark}>
          <Typography className={classes.loadoutTitle} variant="subtitle2">
            {'loadouts.me'}
          </Typography>
        </Card>
        <WeaponCard gun={loadoutState.primary} loadoutCardClass={'primary'} toggleDrawer={toggleDrawer}/>
        <WeaponCard gun={loadoutState.secondary} loadoutCardClass={'secondary'} toggleDrawer={toggleDrawer}/>
      </Column>
    </div>
  );
}
