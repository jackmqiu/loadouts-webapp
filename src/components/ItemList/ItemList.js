import React, { useState } from 'react';
import VerticalContainer from './VerticalContainer';
import ItemCard from './ItemCard';
import Grid from '@material-ui/core/grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  gridContainer: {
  },
  loadoutTitleContainer: {
    height: 160,
  },
  loadoutTitle: {
    fontWeight: 'bold',
    marginTop: 45,
    marginBottom: 5,
  },
}))
const ItemList = ({
  igLoadoutState,
  toggleIgLoadoutForm,
  colorScheme,
  loadoutName,
  loadoutHashtags,
  toggleNewLoadoutFormOpen,
  canEdit,
}) => {
  const classes = useStyles();
  let hashtagsString = '';
  Object.keys(loadoutHashtags).forEach((key) => {
    if (loadoutHashtags[key]) {
      hashtagsString = hashtagsString.concat('#', key, ' ');
    }
  })
  return (
    <Grid container className={classes.gridContainer}>
      <Grid item xs={12} className={classes.loadoutTitleContainer} onClick={() => { toggleNewLoadoutFormOpen() }}>
        <Typography className={classes.loadoutTitle} variant='h4'>{loadoutName}</Typography>
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
