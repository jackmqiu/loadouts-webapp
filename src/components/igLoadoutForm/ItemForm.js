import Modal from '@material-ui/core/Modal';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ItemForm = ({igLoadoutFormOpen, toggleIgLoadoutForm}) => {
  const classes = useStyles();

  return (

      <Modal
        open={igLoadoutFormOpen}
        onClose={toggleIgLoadoutForm}
      >
      <h1>
        modal
        </h1>
      </Modal>

  );
}

export default ItemForm;
