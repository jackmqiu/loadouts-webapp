import React from 'react';
import {
  Paper,
  Card,
  CardMedia,
  Typography,
  AppBar,
  Grid,
  Box,
} from '@mui/material'
import { mainUI } from '../../constants';

const styles = {
  root: {
    width: '100%',
    display: 'flex',
    maxWidth: 800,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  categoryCardsContainer: {
    marginTop: 2,
    marginLeft: 1,
    marginRight: 1,
  },
  categoryCard: {
    margin: 0.5,
    borderRadius: 1.5,
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
    marginBottom: 1,
    marginTop: 4,
  },
  sectionTitle: {
    // marginBottom: 10,
  },
}

// const uiObject = mainUI;

const DiscoverPage = ({
  mixpanel,
  discoverUI,
}) => {
  const uiObject = discoverUI;
  const handleClick = (section, key) => {
    mixpanel.track(
      'Navigate',
      {"DiscoverPage": `${uiObject[section].cards[key].link}`}
    );
    window.location.assign(`https://${uiObject[section].cards[key].link}`)
  }
  const gridItems = [];
  Object.keys(uiObject).forEach((section) => {
    if (uiObject[section].show) {
      gridItems.push(
        <Grid item xs={12} sx={styles.sectionTitleContainer}>
          <Typography sx={styles.sectionTitle}>
            {uiObject[section].title}
          </Typography>
        </Grid>
      )
      Object.keys(uiObject[section].cards).forEach((key) => {
        if (uiObject[section].cards[key].show) {
          gridItems.push(
            <Grid item xs={6} >
              <Card elevation={0} sx={styles.categoryCard} onClick={() => {handleClick(section, key)}}>
                <Box sx={styles.cardSpace}>
                  <CardMedia image={uiObject[section].cards[key].imageLink} sx={styles.categoryCardMedia}/>
                  <Typography variant='subtitle1' sx={styles.cardTitle}>
                    {uiObject[section].cards[key].title}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          )
        }
      })
    }
  })
  return (
    <Box sx={styles.root}>
      <AppBar >
        <Typography variant="h6" color="inherit">
          Loadouts.me by Mixellator
        </Typography>
      </AppBar>
      <Grid container sx={styles.categoryCardsContainer}>
        {gridItems}
      </Grid>
    </Box>
  )
}

export default DiscoverPage;
