import React, { useState, useEffect } from 'react';
import VerticalContainer from './VerticalContainer';
import ItemCard from './ItemCard';
import Grid from '@material-ui/core/grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {
  hashtagTable,
} from '../../constants';

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
const ItemList = ({
  mixpanel,
  igLoadoutState,
  toggleIgLoadoutForm,
  colorScheme,
  toggleNewLoadoutFormOpen,
  canEdit,
  loadoutCategory,
}) => {
  const classes = useStyles();
  useEffect(() => {
    mixpanel.track(
      'Navigate',
      {"ItemList": `${igLoadoutState.title}`}
    );
  }, [])
  let hashtagsString = '';
  let hashtags = igLoadoutState.hashtags || hashtagTable[loadoutCategory];
  Object.keys(hashtags).forEach((key) => {
    if (hashtags[key]) {
      hashtagsString = hashtagsString.concat('#', key, ' ');
    }
  })

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.loadoutTitleContainer} onClick={() => { toggleNewLoadoutFormOpen() }}>
        <Typography className={classes.loadoutTitle} variant='h4'>{igLoadoutState.title}</Typography>
        <Typography variant='p2'>{hashtagsString}</Typography>
      </Grid>
      <Grid item xs={6}>
      <VerticalContainer
        igLoadoutState={igLoadoutState}
        containerIndex={0}
        totalContainers={2}
        toggleIgLoadoutForm={toggleIgLoadoutForm}
        colorScheme={colorScheme}
        className={classes.leftVertical}
        firstColumn={true}
        canEdit={canEdit}
      />
      </Grid>
      <Grid item xs={6}>
      <VerticalContainer
        igLoadoutState={igLoadoutState}
        containerIndex={1}
        totalContainers={2}
        toggleIgLoadoutForm={toggleIgLoadoutForm}
        colorScheme={colorScheme}
        className={classes.rightVertical}
        firstColumn={false}
        canEdit={canEdit}
      />
      </Grid>
    </Grid>
  )
}

export default ItemList;
