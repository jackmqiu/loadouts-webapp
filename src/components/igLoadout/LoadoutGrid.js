import React, { createRef, useState, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useScreenshot, createFileName } from 'use-react-screenshot'
import { makeStyles } from '@material-ui/core/styles';

import LoadoutCard from './LoadoutCard';
import LayoutTable from '../../LayoutTable';

const useStyles = makeStyles({
  grid: {
    margin: 1,
    backgroundColor: 'gray',
    width: '100%',
  },
  button: {
    margin: 5,
  },
});

const LoadoutGrid = ({
  mixpanel,
  igLoadoutState,
  handleOpen,
  handleClose,
  setIgLoadoutState,
  numCards,
  colorScheme,
}) => {
  const classes = useStyles();

    // tell React that we want to associate the <input> ref
    // with the `grid` that we created in the constructor
  const loadoutGridItems = [];
  let j = 0;
  for (let i = 0; i < numCards+1; i++) {
    loadoutGridItems.push(
      <Grid item xs={LayoutTable[numCards][i].gridItemWidth}>
        <LoadoutCard
          id={i}
          itemDetails={igLoadoutState[i]}
          openModal={handleOpen}
          closeModal={handleClose}
          color={colorScheme[i%2]}
        />
      </Grid>
    )
  };
  return (
    <div>
        <Grid container className={classes.grid} spacing={3}>
          { loadoutGridItems }
        </Grid>
      <div>
      </div>
    </div>
  );
};

export default LoadoutGrid;
