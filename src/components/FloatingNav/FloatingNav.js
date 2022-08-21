import React, { useCallback } from 'react';
import { makeStyles } from '@mui/styles';
import Fab from '@mui/material/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import HomeIcon from '@material-ui/icons/Home';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import PublishIcon from '@material-ui/icons/Publish';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link, useLocation, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  rootNav: {
    '& > *': {
      margin: theme.spacing(1),
    },
    position: 'fixed',
    bottom: 5,
    left: '50%',
    marginLeft: -90,
  },
  fab: {
    width: 200,

  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  insideIconButton: {
    width: 10,
    height: 25,
    borderRadius: '50%',
    padding: 5,
  }
}));

export default function FloatingNav({
  mixpanel,
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
  const handleClick = useCallback((element) => {
    mixpanel.track(
      'Action',
      {"FloatingNav": `${element}`}
    );
    history.push(`${element}`)
  }, [history]);
  const track = (action) => {
    mixpanel.track(
      'Action',
      {"FloatingNav": `${action}`}
    );
  }
  return (
    <div className={classes.rootNav}>
      {/*
        <Slide direction="right" in={displayState === 'Make Loadout' && floatingNavDisplay} mountOnEnter unmountOnExit>
        <Fab color="primary" aria-label="add" onClick={() => { setDisplayState('feed')}}>
        <HomeIcon />
        </Fab>
        </Slide>

        <Slide direction="up" in={floatingNavDisplay && location !== '/make' && !newLoadoutFormOpen} mountOnEnter unmountOnExit>
          <Fab color="primary" aria-label="add" onClick={() => {toggleNewLoadoutFormOpen()}}>
            <AddIcon />
          </Fab>
        </Slide>
      */}

      <Slide direction="up" in={floatingNavDisplay} mountOnEnter unmountOnExit>
        <Fab variant='extended' aria-label="add" disableRipple={true} className={classes.fab}>
          <IconButton component="span" disableFocusRipple={true} className={classes.inside} onClick={() => {handleClick('/')}}>
            <HomeIcon color={(location === '/') ? 'primary' : 'disabled'}/>
          </IconButton>
          { (location !== '/make') ?
            <IconButton className={classes.button} disableFocusRipple={true} onClick={() => { toggleNewLoadoutFormOpen(); track('add loadout'); handleClick('/make') }}>
              <AddIcon color={(location === '/make') ? 'primary' : 'disabled'}/>
            </IconButton> :
            <IconButton className={classes.button} disableFocusRipple={true} onClick={() => {setIdFormOpen(true); toggleIgLoadoutForm(); track('publish loadout')}}>
              <PublishIcon color={(location === '/make') ? 'secondary' : 'disabled'}/>
            </IconButton>
          }
          <IconButton className={classes.button} onClick={() => {handleClick('/discover')}}>
            <ViewCarouselIcon color={(location === '/discover') ? 'primary' : 'disabled'}/>
          </IconButton>
          <IconButton className={classes.button} onClick={() => {handleClick('/profile')}}>
            <AccountCircleIcon color={(location === '/discover') ? 'primary' : 'disabled'}/>
          </IconButton>
        </Fab>
      </Slide>

      {/*
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
      */}
    </div>
  );
}
