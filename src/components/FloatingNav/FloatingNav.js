import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';

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
  igLoadoutState
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Fab color="primary" aria-label="add" onClick={addIgLoadout}>
        <AddIcon />
      </Fab>
      { false &&
        <Fab color="secondary" aria-label="edit">
        <EditIcon />
        </Fab>
      }
      {
        displayState === 'Make Loadout' && Object.keys(igLoadoutState).length > 0 &&
        <Fab variant="extended" onClick={() => {setIdFormOpen(true); toggleIgLoadoutForm();}}>
          Publish
        </Fab>
      }
      { false &&
        <Fab disabled aria-label="like">
        <FavoriteIcon />
        </Fab>
      }
    </div>
  );
}
