import React from 'react';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import LoadoutGrid from '../igLoadout';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 600,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: 100,
  },
  grid: ({limitedScreenWidth}) => ({
    margin: 0,
    // backgroundColor: 'gray',
    width: '100%',
    height: limitedScreenWidth,
  }),
  button: {
    margin: 5,
  },
}));

const Feed = ({
  mixpanel,
  feedLoadouts,
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
  addComment,
  sendLike,
}) => {
  let limitedScreenWidth = 600;
  if (screenWidth < limitedScreenWidth) {
    limitedScreenWidth = screenWidth;
  }
  const classes = useStyles({ limitedScreenWidth });
    // tell React that we want to associate the <input> ref
    // with the `grid` that we created in the constructor
  const loadouts = [];
  for (let i = 0; i < feedLoadouts.length; i++) {
    loadouts.push(
        <LoadoutGrid
          key={i}
          igLoadoutState={feedLoadouts[i]}
          setIgLoadoutState={setIgLoadoutState}
          colorScheme={colorScheme}
          displayState={displayState}
          screenWidth={limitedScreenWidth}
          scrollToTop={scrollToTop}
          toggleMoreDrawer={toggleMoreDrawer}
          addComment={addComment}
          sendLike={sendLike}
          mixpanel={mixpanel}
        />
    )
  };
  return (
    <div className={classes.root}>
      { loadouts }
    </div>
  );
};

export default Feed;
