import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  barButton: {
    marginLeft: 8,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    marginRight: 20,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  downloadButton: {
    backgroundColor: '#2EFF21',
    marginLeft: 5,
  },
  addModButton: {
    backgroundColor: '#52EDFF',
    marginLeft: 5,
  },
  removeModButton: {
    backgroundColor: '#FF2167',
    marginLeft: 5,
  },
  heart: {
    marginRight: 5,
  }
}));

export default function PrimarySearchAppBar({
  setDisplay,
  displayState,
  getImage,
  numMods,
  updateNumMods,
  mixpanel,
 }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        href="https://www.surveymonkey.com/r/9NNQXNH"
        onClick={() => handleMobileMenuClose()}
      >
          <FavoriteIcon fontSize='small' className={classes.heart} />
          Give Feedback


      </MenuItem>
      <MenuItem onClick={() => {
          setDisplay('Gun Detail');
          handleMobileMenuClose();
        }}>Gun Detail </MenuItem>
      <MenuItem onClick={() => {
          setDisplay('Make Loadout');
          handleMobileMenuClose();
        }}>Make Loadout </MenuItem>
      <MenuItem onClick={() => {
          setDisplay('Overlay Loadout');
          handleMobileMenuClose();
        }}>Overlay Loadout </MenuItem>
    </Menu>
  );

  return (
    <div >
      <AppBar position="static">
        <Toolbar>

          <Typography className={classes.title} variant="h6" noWrap>
            Loadouts by Planet Slayer
          </Typography>
          {
            numMods < 8 && displayState === 'Gun Details' || displayState === 'Make Loadout' &&
            <Button
              className={classes.addModButton}
              variant="contained"
              onClick={() => {
                updateNumMods(numMods+1);
                mixpanel.track(
                  'Action',
                  {"add": numMods+1}
                );
              }}>Add</Button>
          }
          {
            numMods > 0 && displayState === 'Gun Details' || displayState === 'Make Loadout' &&
            <Button
              className={classes.removeModButton}
              variant="contained"
              color="Secondary"
              onClick={() => {
                updateNumMods(numMods-1);
                mixpanel.track(
                  'Action',
                  {"remove": numMods-1}
                );
              }}>Remove</Button>
          }
          {
            displayState === 'Gun Details' || displayState === 'Make Loadout' &&
            <Button className={classes.downloadButton} variant="contained" color="Secondary" onClick={getImage}>
              Save
            </Button>
          }
          <div className={classes.grow} />
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
}
