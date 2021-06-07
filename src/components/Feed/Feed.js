import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import LoadoutGrid from '../igLoadout';

const useStyles = makeStyles(() => ({
  grid: ({screenWidth}) => ({
    margin: 0,
    // backgroundColor: 'gray',
    width: '100%',
    height: screenWidth,
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
}) => {
  const classes = useStyles({ screenWidth });
    // tell React that we want to associate the <input> ref
    // with the `grid` that we created in the constructor
  const loadouts = [];
  for (let i = 0; i < feedLoadouts.length; i++) {
    loadouts.push(
        <LoadoutGrid
          key={i}
          igLoadoutState={feedLoadouts[i].items}
          setIgLoadoutState={setIgLoadoutState}
          colorScheme={colorScheme}
          displayState={displayState}
          screenWidth={screenWidth}
        />
    )
  };
  return (
    <div>
          { loadouts }
    </div>
  );
};

export default Feed;
