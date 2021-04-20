import React, { createRef, useState, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useScreenshot, createFileName } from 'use-react-screenshot'
import { makeStyles } from '@material-ui/core/styles';

import ModCard from './ModCard';
import ModsList from '../../ModsList.js';
import Image from '../../Img/LoadoutTest.jpg';
import OverlayImage from '../../Img/transparent-background.png';
import DetailWeaponCard from './DetailWeaponCard';
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

const ModGrid = ({
  mixpanel,
  modsState,
  handleOpen,
  handleClose,
  gun,
  toggleDrawer,
  numMods,
}) => {
  const classes = useStyles();

    // tell React that we want to associate the <input> ref
    // with the `grid` that we created in the constructor
  const modsGridItems = [];
  let j = 0;
  for (let i = 0; i < numMods+1; i++) {
    if (LayoutTable[numMods][i].type === 'mod') {
      modsGridItems.push(
        <Grid item xs={LayoutTable[numMods][i].gridItemWidth}>
          <ModCard
            id={j+1}
            partName={modsState[j+1].category}
            modName={modsState[j+1].model}
            openModal={handleOpen}
            closeModal={handleClose}
            />
        </Grid>
      )
      j++;
    } else {
      modsGridItems.push(
        <Grid item xs={LayoutTable[numMods][i].gridItemWidth}>
          <DetailWeaponCard gun={gun} toggleDrawer={toggleDrawer} loadoutGunClass={'primary'}/>
        </Grid>
      );
    }
  };
  return (
    <div>
        <Grid container className={classes.grid} spacing={3}>
          { modsGridItems }
        </Grid>
      <div>
      </div>
    </div>
  );
};

export default ModGrid;
