import React from 'react';
import {
  Paper,
  Card,
  CardMedia,
  Typography,
  AppBar,
  Grid,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { mainUI } from '../../constants';

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    maxWidth: 800,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  categoryCardsContainer: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  categoryCard: {
    margin: 4,
    borderRadius: 14,
    display: 'relative',
  },
  cardSpace: {
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  categoryCardMedia: {
    height: 80,
    width: '100%',
    filter: 'brightness(72%)',
  },
  cardTitle: {
    color: 'white',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  sectionTitleContainer: {
    marginBottom: 10,
    marginTop: 35,
  },
  sectionTitle: {
    // marginBottom: 10,
  },
})

// const uiObject = mainUI;

const HomePage = ({
  mixpanel,
  discoverUI,
}) => {
  const classes = useStyles();
  const uiObject = discoverUI;
  const handleClick = () => {

  }
  const gridItems = [];
  Object.keys(uiObject).forEach((section) => {
    if (uiObject[section].show) {
      gridItems.push(
        <Grid item xs={12} className={classes.sectionTitleContainer}>
          <Typography className={classes.sectionTitle}>
            {uiObject[section].title}
          </Typography>
        </Grid>
      )
      Object.keys(uiObject[section].cards).forEach((key) => {
        if (uiObject[section].cards[key].show) {
          gridItems.push(
            <Grid item xs={6} >
              <Card elevation={0} className={classes.categoryCard} onClick={() => {window.location.assign(`https://${uiObject[section].cards[key].link}`)}}>
                <div className={classes.cardSpace}>
                  <CardMedia image={uiObject[section].cards[key].imageLink} className={classes.categoryCardMedia}/>
                  <Typography variant='subtitle1' className={classes.cardTitle}>
                    {uiObject[section].cards[key].title}
                  </Typography>
                </div>
              </Card>
            </Grid>
          )
        }
      })
    }
  })
  return (
    <div className={classes.root}>
      <AppBar >
        <Typography variant="h6" color="inherit">
          Loadouts.me by Mixellator
        </Typography>
      </AppBar>
      <Grid container className={classes.categoryCardsContainer}>
        {gridItems}
      </Grid>
    </div>
  )
}

export default HomePage;
