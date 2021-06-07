import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import ItemCard from './ItemCard';
import IgLayoutTable from '../../IgLayoutTable';

const useStyles = makeStyles(() => ({
  grid: ({screenWidth}) => ({
    margin: 0,
    // backgroundColor: 'black',
    backgroundImage: 'linear-gradient(to bottom, #A7A309, #616A6B)',
    width: '95%',
    marginLeft: '2.5%',
    marginRight: '2.5%',
    height: screenWidth,
    borderRadius: 10,
  }),
  button: {
    margin: 5,
  },
  loadoutCaption: {
    textAlign: 'left',
    marginLeft: '5%',
    marginBottom: '5%',
  }
}));

const LoadoutGrid = ({
  mixpanel,
  igLoadoutState,
  handleOpen,
  handleClose,
  setIgLoadoutState,
  colorScheme,
  toggleIgLoadoutForm,
  displayState,
  screenWidth,
}) => {
  const classes = useStyles({ screenWidth });
  let numCards = Object.keys(igLoadoutState).length;
  if (numCards > 9) { // keep it to 2 rows
    numCards = 9;
  }
  const loadoutGridItems = [];
  for (let i = 0; i < numCards; i++) {
    loadoutGridItems.push(
      <Grid key={i} item xs={IgLayoutTable[numCards][i].gridItemWidth}>
        <ItemCard
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
        <div className={classes.loadoutCaption}>
          <Typography variant="h6">M4 Loadout</Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {numCards} Parts
          </Typography>
        </div>
    </div>
  );
};

export default LoadoutGrid;
