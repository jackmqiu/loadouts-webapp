import {
  Modal,
  TextField,
  Paper,
  Button,
} from '@material-ui/core';
import { useState } from 'react';
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

const ItemForm = ({igLoadoutFormOpen, toggleIgLoadoutForm, mixpanel}) => {
  const classes = useStyles();
  const [formType, setFormType] = useState(true); // true is Search
  const [itemText, setItemText] = useState('');
  const handleTextChange = (event) => {
    setItemText(event.target.value);
  };
  const handleItemSubmit = (event) => {
    if (event.key === 'Enter') {
      mixpanel.track(
        'Action',
        {"submitItem": `${event.target.value}`}
      );
      // setLoadoutState({
      //   ...loadoutState,
      //   [drawerState.weaponSelection]: {
      //     ...loadoutState[drawerState.weaponSelection],
      //     gunCustomField: event.target.value,
      //   }
      // });
      toggleIgLoadoutForm();
      event.preventDefault();
    }
  }
  return (

      <Modal
        open={igLoadoutFormOpen}
        onClose={toggleIgLoadoutForm}
      >
        <Paper>
          <Button variant='contained' color='primary' onClick={() => setFormType(!formType)}>{formType ? 'Link' : 'Search'}</Button>
            <TextField label="Product" variant="outlined" onChange={handleTextChange} onKeyPress={handleItemSubmit}/>
          <div>

          </div>
        </Paper>
      </Modal>

  );
}

export default ItemForm;
