import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
  root: {
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
  igLoadoutState,
  floatingNavDisplay,
}) {
  const classes = useStyles();
  const displayPublish = (displayState === 'Make Loadout' && Object.keys(igLoadoutState).length > 0 && floatingNavDisplay)
  return (
    <div className={classes.root}>
      <Slide direction="up" in={floatingNavDisplay} mountOnEnter unmountOnExit>

      <Fab color="primary" aria-label="add" onClick={addIgLoadout}>
        <AddIcon />
      </Fab>
    </Slide>

    <Slide direction="up" in={displayPublish} mountOnEnter unmountOnExit>

        <Fab variant="extended" onClick={() => {setIdFormOpen(true); toggleIgLoadoutForm();}}>
          Publish
        </Fab>
      </Slide>
    </div>
  );
}
