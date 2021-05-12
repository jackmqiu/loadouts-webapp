import React, { createRef, useState, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useScreenshot, createFileName } from 'use-react-screenshot'
import { makeStyles } from '@material-ui/core/styles';

import LoadoutCard from './LoadoutCard';
import IgLayoutTable from '../../IgLayoutTable';

const useStyles = makeStyles(() => ({
  grid: ({screenWidth}) => ({
    margin: 0,
    backgroundColor: 'gray',
    width: '100%',
    height: screenWidth,
  }),
  button: {
    margin: 5,
  },
}));

const LoadoutGrid = ({
  mixpanel,
  igLoadoutState,
  handleOpen,
  handleClose,
  setIgLoadoutState,
  numCards,
  colorScheme,
  toggleIgLoadoutForm,
  displayState,
  screenWidth,
}) => {
  const classes = useStyles({ screenWidth });

    // tell React that we want to associate the <input> ref
    // with the `grid` that we created in the constructor
  const loadoutGridItems = [];
  for (let i = 0; i < numCards + 1; i++) {
    loadoutGridItems.push(
      <Grid item xs={IgLayoutTable[numCards][i].gridItemWidth}>
        <LoadoutCard
          id={i}
          height={IgLayoutTable[numCards][i].gridItemHeight}
          itemDetails={igLoadoutState[i]}
          openModal={handleOpen}
          closeModal={handleClose}
          color={colorScheme[i%2]}
          toggleIgLoadoutForm={toggleIgLoadoutForm}
          displayState={displayState}
          screenWidth={screenWidth}
          rows={IgLayoutTable[numCards].rows}
        />
      </Grid>
    )
  };
  return (
    <div>
        <Grid container className={classes.grid} spacing={2}>
          { loadoutGridItems }
        </Grid>
      <div>
      </div>
    </div>
  );
};

export default LoadoutGrid;
