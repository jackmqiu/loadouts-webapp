import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import ItemCard from './ItemCard';
import IgLayoutTable from '../../IgLayoutTable';
import { gridLayoutTable } from '../../constants';

const useStyles = makeStyles(() => ({
  grid: ({screenWidth}) => ({
    margin: 0,
    // backgroundColor: 'black',
    backgroundImage: 'linear-gradient(to bottom, #FDF0A6, #87CEEB)',
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
  scrollToTop,
}) => {
  const classes = useStyles({ screenWidth });
  let numCards = Object.keys(igLoadoutState.items).length;
  let numDisplayCards = numCards;
  if (numCards > 6) { // keep it to 2 rows
    numDisplayCards = 6;
  }
  const populateSubItems = (subGridIndex) => {
    const loadoutGridSubItems = [];
    gridLayoutTable[numDisplayCards][subGridIndex].items.forEach((item, i) => {
      loadoutGridSubItems.push(
        <Grid key={subGridIndex+i} item xs={item.xs}>
          <ItemCard
            height={item.gridItemHeight}
            itemDetails={igLoadoutState.items[subGridIndex+i]}
            openModal={handleOpen}
            closeModal={handleClose}
            color={colorScheme[i%2]}
            toggleIgLoadoutForm={toggleIgLoadoutForm}
            displayState={displayState}
            screenWidth={screenWidth}
            rows={IgLayoutTable[numDisplayCards].rows}
          />
        </Grid>
      )
    });
    return loadoutGridSubItems;
  }
  const loadoutGridItems = [];
  // Object.keys(gridLayoutTable[numDisplayCards]).forEach((subGridKey) => {
  //   gridLayoutTable[numDisplayCards][subGridKey]
  // });


  for (let i = 0; i < numDisplayCards; i++) {
    if (gridLayoutTable[numDisplayCards][i].items) {
      // const loadoutGridSubItems = populateSubItems(i)
      loadoutGridItems.push(
        <Grid key={i} item xs={gridLayoutTable[numDisplayCards][i].xs}>
          <Grid container spacing={1}>
            {populateSubItems(i)}
          </Grid>
        </Grid>
      )
      i += (gridLayoutTable[numDisplayCards][i].items.length - 1);
    } else {
      loadoutGridItems.push(
        <Grid key={i} item xs={gridLayoutTable[numDisplayCards][i].xs}>
          <ItemCard
            id={i}
            height={gridLayoutTable[numDisplayCards][i].gridItemHeight}
            itemDetails={igLoadoutState.items[i]}
            openModal={handleOpen}
            closeModal={handleClose}
            color={colorScheme[i%2]}
            toggleIgLoadoutForm={toggleIgLoadoutForm}
            displayState={displayState}
            screenWidth={screenWidth}
            rows={IgLayoutTable[numDisplayCards].rows}
          />
        </Grid>
      )
    }
  };
  return (
    <div>
    <Link to={`/${igLoadoutState._id}`}>
      <Grid container className={classes.grid} spacing={1}>
        { loadoutGridItems }
      </Grid>
    </Link>
      <div className={classes.loadoutCaption}>
        <Typography variant="h6">{igLoadoutState.title || 'untitled'}</Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {numCards} Parts
        </Typography>
      </div>
    </div>
  );
};

export default LoadoutGrid;
