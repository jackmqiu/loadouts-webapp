import React, { useRef, useState, useCallback } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import LoadoutGrid from '../igLoadout';
import axiosInstance from '../../API/axiosBase';
import useAxiosFetch from '../../API/useAxiosFetch';
import { useLocation } from 'react-router-dom';
import { buildClasses } from '../../constants';

const styles = {
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
};

const Feed = ({
  mixpanel,
  // feedLoadouts,
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
  loggedInUser,
}) => {
  let limitedScreenWidth = 600;
  if (screenWidth < limitedScreenWidth) {
    limitedScreenWidth = screenWidth;
  }
  const [page, setPage] = useState(0);
  let feedClass = useLocation().pathname.split('/')[2];
  if (useLocation().pathname === '/') {
    feedClass = 'all';
  }
  const { loading, error, feedLoadouts, hasMore } = useAxiosFetch('airsoft', feedClass, page); // for infinite scroll

  const observer = useRef(); // INFINITE SCROLL
  const lastLoadoutElementRef = useCallback(  // (*)
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );
    // tell React that we want to associate the <input> ref
    // with the `grid` that we created in the constructor
  const loadouts = [];
  for (let i = 0; i < feedLoadouts.length; i++) {
    if (i === feedLoadouts.length - 1) {
      loadouts.push(
        <Box key={i} ref={lastLoadoutElementRef}>
          <LoadoutGrid
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
            loggedInUser={loggedInUser}
          />
        </Box>
      )
    } else {
      loadouts.push(
        <Box key={i}>
          <LoadoutGrid
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
        </Box>
    )
    }
  };
  return (
    <Box sx={styles.root}>
      { loadouts }
      <Box>{loading && 'Loading...'}</Box>
      <Box>{error && 'Error'}</Box>
    </Box>
  );
};

export default Feed;
