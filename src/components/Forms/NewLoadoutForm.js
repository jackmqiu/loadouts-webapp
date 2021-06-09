import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  grid: {
    margin: 1,
    backgroundColor: 'gray',
    width: '100%',
  },
  modal: {
    minWidth: 120,
    maxHeight: 800,
    padding: 20,
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  formTitle: {
    margin: 2,
  },
  select: {
    margin: '0px 5px 0px 5px',
  },
  textField: {
    marginBottom: 10,
    marginLeft: 5,
  },
  card: {
    display: 'block',
  }
}));

const NewLoadoutForm = ({
  setLoadoutMetadata,
  mixpanel,
  toggleNewLoadoutFormOpen,
  newLoadoutFormOpen,
  loadoutHashtags,
  setLoadoutHashtags,
  loadoutCategory,
}) => {
  const classes = useStyles();
  const [loadoutNameText, setNameText] = useState('');
  const handleTextChange = (event) => {
    setNameText(event.target.value.toLowerCase());
  };
  //loadout Name
  //chips
  const handleItemSubmit = (event) => {
    if (event.key === 'Enter') {
      mixpanel.track(
        'Action',
        {"submitLoadoutName": `${event.target.value}`}
      );
      setLoadoutMetadata(event.target.value);
      event.preventDefault();
    }
  }
  const chips = [];
  const loadoutHashtagsObject = loadoutHashtags[loadoutCategory]
  const categoryHashtags = Object.keys(loadoutHashtagsObject);
  const toggleLoadoutHashtags = (key) => {
    setLoadoutHashtags({
      ...loadoutHashtags,
      [loadoutCategory]: {
        ...loadoutHashtagsObject,
        [key]: !loadoutHashtagsObject[key],
      }
    });
  }
  categoryHashtags.forEach((key) => {
    chips.push(
      <Chip
        color={loadoutHashtagsObject[key] ? 'secondary' : ''}
        label={`#${key}`}
        onClick={() => {toggleLoadoutHashtags(key)}}
      >
        #{'key'}
      </Chip>
    );
  })

  return (
    <div>
      {
        newLoadoutFormOpen &&
        <Modal
          open={newLoadoutFormOpen}
          onClose={toggleNewLoadoutFormOpen}
          className={classes.modal}
        >
          <Paper className={classes.card}>
            <Typography variant='h6' className={classes.formTitle}>New Loadout</Typography>
            <Divider/>
            <Typography variant='h6' className={classes.fieldTitle}> Loadout Name </Typography>
            <TextField value={loadoutNameText} label="Product" variant="outlined" onChange={handleTextChange} onKeyPress={handleItemSubmit}/>
            <div>
              {chips}
            </div>
            <Link to='/make'>
              <Button variant='contained' color='primary' onClick={() => {toggleNewLoadoutFormOpen()}}>Add Items</Button>
            </Link>
          </Paper>
        </Modal>
      }
    </div>
  )
};

export { NewLoadoutForm };
