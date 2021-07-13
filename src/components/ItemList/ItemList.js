import React, { useState, useEffect } from 'react';
import VerticalContainer from './VerticalContainer';
import ItemCard from './ItemCard';
import MetadataForm from './MetadataForm';
import Grid from '@material-ui/core/grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';
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
  screenWidth,
  newLoadoutFormOpen,
  loadoutHashtags,
  setLoadoutHashtags,
  updateLoadoutMetadata,
  setLoadoutCategory,
  addDescription,
}) => {
  const classes = useStyles();
  const location = useLocation().pathname;
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
  let titleString = igLoadoutState.title;
  if (titleString.length === 0) {
    if (location === '/make') {
      titleString = 'Untitled';
    } else {
      titleString = 'Not Found';
    }
  }

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.loadoutTitleContainer} onClick={() => { !newLoadoutFormOpen && toggleNewLoadoutFormOpen() }}>
        {newLoadoutFormOpen ?
          <MetadataForm
            mixpanel={mixpanel}
            igLoadoutState={igLoadoutState}
            toggleNewLoadoutFormOpen={toggleNewLoadoutFormOpen}
            newLoadoutFormOpen={newLoadoutFormOpen}
            loadoutHashtags={loadoutHashtags}
            setLoadoutHashtags={setLoadoutHashtags}
            updateLoadoutMetadata={updateLoadoutMetadata}
            loadoutCategory={loadoutCategory}
            setLoadoutCategory={setLoadoutCategory}
          />
          :
          <div>
            <Typography className={classes.loadoutTitle} variant='h4'>{titleString}</Typography>
            <Typography >{hashtagsString}</Typography>
          </div>
        }
      </Grid>
      <Grid item xs={6}>
      <VerticalContainer
        mixpanel={mixpanel}
        igLoadoutState={igLoadoutState}
        containerIndex={0}
        totalContainers={2}
        toggleIgLoadoutForm={toggleIgLoadoutForm}
        colorScheme={colorScheme}
        className={classes.leftVertical}
        firstColumn={true}
        canEdit={canEdit}
        screenWidth={screenWidth}
        addDescription={addDescription}
      />
      </Grid>
      <Grid item xs={6}>
      <VerticalContainer
        mixpanel={mixpanel}
        igLoadoutState={igLoadoutState}
        containerIndex={1}
        totalContainers={2}
        toggleIgLoadoutForm={toggleIgLoadoutForm}
        colorScheme={colorScheme}
        className={classes.rightVertical}
        firstColumn={false}
        canEdit={canEdit}
        screenWidth={screenWidth}
        addDescription={addDescription}
      />
      </Grid>
    </Grid>
  )
}

export default ItemList;
