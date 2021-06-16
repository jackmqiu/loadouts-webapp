import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import HomeIcon from '@material-ui/icons/Home';
import Slide from '@material-ui/core/Slide';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import { Link, useLocation, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  rootNav: {
    '& > *': {
      margin: theme.spacing(1),
    },
    position: 'fixed',
    bottom: 5,
    left: 5,
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function FloatingNav({
  addIgLoadout,
  setIdFormOpen,
  toggleIgLoadoutForm,
  displayState,
  setDisplayState,
  igLoadoutState,
  floatingNavDisplay,
  toggleNewLoadoutFormOpen,
  newLoadoutFormOpen,
}) {
  const classes = useStyles();
  const location = useLocation().pathname;
  const displayPublish = (location === '/make' && Object.keys(igLoadoutState).length > 0 && floatingNavDisplay);
  const displayDiscover = (location !== '/discover');
  const history = useHistory();
  const handleDiscoverClick = useCallback(() => history.push('/discover'), [history]);
  return (
    <div className={classes.rootNav}>
      {/*
        <Slide direction="right" in={displayState === 'Make Loadout' && floatingNavDisplay} mountOnEnter unmountOnExit>
        <Fab color="primary" aria-label="add" onClick={() => { setDisplayState('feed')}}>
        <HomeIcon />
        </Fab>
        </Slide>
      */}

        <Slide direction="up" in={floatingNavDisplay && location !== '/make' && !newLoadoutFormOpen} mountOnEnter unmountOnExit>
          <Fab color="primary" aria-label="add" onClick={() => {toggleNewLoadoutFormOpen()}}>
            <AddIcon />
          </Fab>
        </Slide>


      <Slide direction="up" in={displayPublish} mountOnEnter unmountOnExit>
        <Fab variant="extended" onClick={() => {setIdFormOpen(true); toggleIgLoadoutForm();}}>
          Publish
        </Fab>
      </Slide>

      <Slide direction="up" in={floatingNavDisplay && displayDiscover} mountOnEnter unmountOnExit>
        <Fab variant="extended" onClick={handleDiscoverClick}>
          <ViewCarouselIcon />
        </Fab>
      </Slide>

    </div>
  );
}
