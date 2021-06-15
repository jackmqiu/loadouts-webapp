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

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
  },
  categoryCardsContainer: {
    marginTop: 50,
    marginLeft: 5,
    marginRight: 5,
  },
  categoryCard: {
    margin: 4,
    borderRadius: 15,
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
  },
  sectionTitle: {
    marginBottom: 10,
  },
})

const uiObject = {
  top: {
    title: 'Popular Loadouts',
    cards: {
      airsoft: {
        title: 'Airsoft loadouts',
        imageLink: 'https://i.imgur.com/JVzCj3q.jpg',
        link: 'airsoft.loadouts.me',
      },
      guns: {
        title: 'Guns & Gear',
        imageLink: 'https://i.imgur.com/srsd5hR.jpg',
        link: 'guns.loadouts.me',
      },
      cars: {
        title: 'Car builds',
        imageLink: 'https://i.imgur.com/QbLirJy.jpg',
        link: 'cars.loadouts.me',
      },
      skin: {
        title: 'Skincare routine',
        imageLink: 'https://i.imgur.com/0ZDIDGH.jpg',
        link: 'skin.loadouts.me',
      },
      vlogging: {
        title: 'Vlogging setup',
        imageLink: 'https://i.imgur.com/QlVTGWA.jpg',
        link: 'vlogging.loadouts.me',
      },
      crafts: {
        title: 'Craft supplies',
        imageLink: 'https://i.imgur.com/nUh090r.jpg',
        link: 'crafts.loadouts.me',
      }
    }
  }
}


const HomePage = ({

}) => {

  const classes = useStyles();
  const gridItems = [];
  Object.keys(uiObject).forEach((section) => {
    gridItems.push(
      <Grid item xs={12} className={classes.sectionTitleContainer}>
        <Typography variant='subtitle3' className={classes.sectionTitle}>
          {uiObject[section].title}
        </Typography>
      </Grid>
    )
    Object.keys(uiObject[section].cards).forEach((key) => {
      gridItems.push(
        <Grid item xs={6} >
          <Card elevation={0} className={classes.categoryCard}>
            <div className={classes.cardSpace}>
              <CardMedia image={uiObject[section].cards[key].imageLink} className={classes.categoryCardMedia}/>
              <Typography variant='subtitle1' className={classes.cardTitle}>
                {uiObject[section].cards[key].title}
              </Typography>
            </div>
          </Card>
        </Grid>
      )
    })
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
