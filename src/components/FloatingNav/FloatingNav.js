import React, { useCallback, useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import PublishIcon from '@mui/icons-material/Publish';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useLocation, useHistory } from 'react-router-dom';

const styles = {
  rootNav: {
    margin: 2,
    position: 'fixed',
    bottom: 5,
    left: '39%',
  },
  fab: {
    width: 200,
  },
  insideIconButton: {
    width: 10,
    height: 25,
    borderRadius: '50%',
    padding: 0.5,
  },
  button: {
    padding: 1,
  }
};

export default function FloatingNav({
  mixpanel,
  addIgLoadout,
  setIdFormOpen,
  toggleIgLoadoutForm,
  displayState,
  setDisplayState,
  igLoadoutState,
  toggleNewLoadoutFormOpen,
  newLoadoutFormOpen,
}) {
  const location = useLocation().pathname;
  const [floatingNavDisplay, setFloatingNavDisplay] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(window.pageYOffset);
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
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.onscroll = () => {
        if (window.pageYOffset > scrollPosition) {
          setFloatingNavDisplay(false);
        }
        if (window.pageYOffset < scrollPosition) {
          setFloatingNavDisplay(true);
        }
        setScrollPosition(window.pageYOffset);
      }
    }
  });
  return (
    <Box sx={styles.rootNav}>
      <Slide direction="up" in={floatingNavDisplay} mountOnEnter unmountOnExit>
        <Fab variant='extended' aria-label="add" disableRipple={true} sx={styles.fab}>
          <IconButton component="span" disableFocusRipple={true} onClick={() => {handleClick('/')}}>
            <HomeIcon color={(location === '/') ? 'primary' : 'secondary'}/>
          </IconButton>
          { (location !== '/make') ?
            <IconButton disableFocusRipple={true} onClick={() => { toggleNewLoadoutFormOpen(); track('add loadout'); handleClick('/make') }}>
              <AddIcon color={(location === '/make') ? 'primary' : 'secondary'}/>
            </IconButton> :
            <IconButton disableFocusRipple={true} onClick={() => {setIdFormOpen(true); toggleIgLoadoutForm(); track('publish loadout')}}>
              <PublishIcon color={(location === '/make') ? 'highlight' : 'secondary'}/>
            </IconButton>
          }
          <IconButton onClick={() => {handleClick('/discover')}}>
            <ViewCarouselIcon color={(location === '/discover') ? 'primary' : 'secondary'}/>
          </IconButton>
          <IconButton onClick={() => {handleClick('/profile')}}>
            <AccountCircleIcon color={(location === '/profile') ? 'primary' : 'secondary'}/>
          </IconButton>
        </Fab>
      </Slide>
    </Box>
  );
}
