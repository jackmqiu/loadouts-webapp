import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import ItemCard from './ItemCard';
import IgLayoutTable from '../../IgLayoutTable';
import { gridLayoutTable, heightGuide } from '../../constants';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(() => ({
  grid: ({screenWidth}) => ({
    margin: 0,
    // backgroundColor: 'black',
    // backgroundImage: 'linear-gradient(to bottom, #FDF0A6, #87CEEB)',
    width: '95%',
    marginLeft: '2.5%',
    marginRight: '2.5%',
    height: screenWidth*.95,
    borderRadius: 0,
    flexGrow: 1,
  }),
  gridItem: {
    display: 'flex',
  },
  button: {
    margin: 5,
  },
  loadoutCaption: {
    width: '90%',
    marginRight: '5%',
    textAlign: 'left',
    marginLeft: '5%',
    marginBottom: '5%',
  },
  captionTitle: {
    fontWeight: 550,
  },
  moreButton: {
    marginTop: -5,
    padding: 5,
  },
  moreIcon: {
    float: 'right',
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
  toggleMoreDrawer,
}) => {
  const classes = useStyles({ screenWidth });
  let numCards = Object.keys(igLoadoutState.items).length;
  if (igLoadoutState.itemKeyTable) {
    numCards = Object.keys(igLoadoutState.itemKeyTable).length;
  }
  let numDisplayCards = numCards;
  if (numCards > 6) { // keep it to 2 rows
    numDisplayCards = 6;
  }
  const populateSubItems = (subGridIndex) => {
    const loadoutGridSubItems = [];
    gridLayoutTable[numDisplayCards][subGridIndex].items.forEach((item, i) => {
      const gridHeight = screenWidth*item.gridItemHeight/12*.95;
      if (igLoadoutState.itemKeyTable) {
        loadoutGridSubItems.push(
          <Grid key={subGridIndex+i} className={classes.gridItem} item xs={item.xs} style={{height: gridHeight}}>
            <ItemCard
              height={item.gridItemHeight}
              itemDetails={igLoadoutState.items[igLoadoutState.itemKeyTable[subGridIndex+i]]}
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
      } else {
        loadoutGridSubItems.push(
          <Grid key={subGridIndex+i} className={classes.gridItem} item xs={item.xs} style={{height: gridHeight}}>
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
      }
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
      const gridHeight = screenWidth*gridLayoutTable[numDisplayCards][i].gridItemHeight/12*.95;
      loadoutGridItems.push(
        <Grid key={i} item xs={gridLayoutTable[numDisplayCards][i].xs} style={{height: gridHeight}}>
          <Grid container spacing={1} style={{height: gridHeight}}>
            {populateSubItems(i, gridHeight)}
          </Grid>
        </Grid>
      )
      i += (gridLayoutTable[numDisplayCards][i].items.length - 1);
    } else {
      const gridHeight = screenWidth*gridLayoutTable[numDisplayCards][i].gridItemHeight/12*.95;
      if (igLoadoutState.itemKeyTable) {
        loadoutGridItems.push(
          <Grid key={i} item xs={gridLayoutTable[numDisplayCards][i].xs} className={classes.gridItem} style={{height: gridHeight}}>
            <ItemCard
              id={i}
              height={gridLayoutTable[numDisplayCards][i].gridItemHeight}
              itemDetails={igLoadoutState.items[igLoadoutState.itemKeyTable[i]]}
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
      } else {
        loadoutGridItems.push(
          <Grid key={i} item xs={gridLayoutTable[numDisplayCards][i].xs} className={classes.gridItem} style={{height: gridHeight}}>
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
    }
  };
  return (
    <div>
      <Link to={`/${igLoadoutState._id}`}>
        <Grid container className={classes.grid} spacing={1}>
          { loadoutGridItems }
        </Grid>
      </Link>
      <Grid container direction='column' className={classes.loadoutCaption}>
        <Grid item xs={11}>
          <Typography color='primary' className={classes.captionTitle} variant="subtitle2">{igLoadoutState.title || 'untitled'}</Typography>
          <Typography variant="caption" color="textSecondary" component="p">
            {numCards} Parts
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <IconButton className={classes.moreButton} onClick={() => {toggleMoreDrawer(igLoadoutState._id)}}>
            <MoreHorizIcon color='primary' className={classes.moreIcon}/>
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default LoadoutGrid;
