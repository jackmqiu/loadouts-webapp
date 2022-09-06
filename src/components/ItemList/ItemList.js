import React, { useState, useEffect } from 'react';
import VerticalContainer from './VerticalContainer';
import ItemCard from './ItemCard';
import MetadataForm from './MetadataForm';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { useLocation } from 'react-router-dom';
import {
  hashtagTable,
} from '../../constants';

const styles = {
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
    paddingBottom: 5,
  },
  loadoutTitle: {
    fontWeight: 'bold',
    marginTop: 6,
    marginBottom: 1,
  },
}

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
  loggedInUser,
}) => {
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
    <Grid container sx={styles.root}>
      <Grid item xs={12} sx={styles.loadoutTitleContainer} onClick={() => { !newLoadoutFormOpen && toggleNewLoadoutFormOpen() }}>
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
            loggedInUser={loggedInUser}
          />
          :
          <div>
            <Typography sx={styles.loadoutTitle} variant='h4'>{titleString}</Typography>
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
