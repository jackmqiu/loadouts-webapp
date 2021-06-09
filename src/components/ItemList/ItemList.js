import React, { useState } from 'react';
import VerticalContainer from './VerticalContainer';
import ItemCard from './ItemCard';
import Grid from '@material-ui/core/grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  loadoutTitleContainer: {
    height: 120,
  }
}))
const ItemList = ({
  igLoadoutState,
  toggleIgLoadoutForm,
  colorScheme,
  loadoutName,
  loadoutHashtags,
}) => {
  const classes = useStyles();
  let hashtagsString = '';
  Object.keys(loadoutHashtags).forEach((key) => {
    if (loadoutHashtags[key]) {
      hashtagsString = hashtagsString.concat('#', key, ' ');
    }
  })
  return (
    <Grid container>
      <Grid item xs={12} className={classes.loadoutTitleContainer}>
        <Typography variant='h3'>{loadoutName}</Typography>
        <Typography variant='p2'>{hashtagsString}</Typography>
      </Grid>
      <Grid item xs={6}>
      <VerticalContainer
        igLoadoutState={igLoadoutState}
        containerIndex={0}
        totalContainers={2}
        toggleIgLoadoutForm={toggleIgLoadoutForm}
        colorScheme={colorScheme}
      />
      </Grid>
      <Grid item xs={6}>
      <VerticalContainer
        igLoadoutState={igLoadoutState}
        containerIndex={1}
        totalContainers={2}
        toggleIgLoadoutForm={toggleIgLoadoutForm}
        colorScheme={colorScheme}
      />
      </Grid>
    </Grid>
  )
}

export default ItemList;
