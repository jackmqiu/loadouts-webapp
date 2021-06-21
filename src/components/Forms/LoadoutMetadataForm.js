import React, { useState, useCallback } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { hashtagTable, categoriesList } from '../../constants';
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modal: {
    minWidth: 120,
    maxHeight: 800,
    padding: 20,
  },
  formTitle: {
    marginLeft: '10%',
    paddingTop: 30,
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
  },
  select: {
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
  },
  fieldsContainer: {
    paddingTop: 30,
    paddingBottom: 30,
  },
  chipsContainer: {
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
    marginBottom: 30,
  },
  nextButton: {
    marginBottom: 30,
  },
  chips: {
    marginRight: 4,
    marginBottom: 5,
  },
}));

const LoadoutMetadataForm = ({
  mixpanel,
  toggleNewLoadoutFormOpen,
  newLoadoutFormOpen,
  loadoutHashtags,
  setLoadoutHashtags,
  updateLoadoutMetadata,
  loadoutCategory,
  setLoadoutCategory,
}) => {
  const classes = useStyles();
  const [loadoutNameText, setNameText] = useState('');
  const history = useHistory();
  const directToMakeLoadout = useCallback(() => history.push('/make'), [history]);
  const handleTextChange = (event) => {
    setNameText(event.target.value);
  };
  const handleSelect = (event) => {
    setLoadoutCategory(event.target.value);
    setLoadoutHashtags(hashtagTable);
  }
  //loadout Name
  //chips
  const handleLoadoutMetadataSubmit = () => {
    mixpanel.track(
      'Action',
      {"handleMetadataSubmit": `${loadoutNameText}`}
    );
    updateLoadoutMetadata({
      loadoutName: loadoutNameText
    });
    toggleNewLoadoutFormOpen();
  }
  const handleSubmitTitle = (event) => {
    if (event.key === 'Enter') {
      handleLoadoutMetadataSubmit();
      directToMakeLoadout();
      event.preventDefault();
    }
  }
  const chips = [];
  const loadoutHashtagsObject = loadoutHashtags[loadoutCategory]
  const categoryHashtags = loadoutHashtagsObject ? Object.keys(loadoutHashtagsObject): [];
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
        color={loadoutHashtagsObject[key] ? 'primary' : ''}
        label={`#${key}`}
        onClick={() => {toggleLoadoutHashtags(key)}}
        className={classes.chips}
      >
        #{'key'}
      </Chip>
    );
  })
  const categoryChoices = [];
  Object.keys(categoriesList).forEach((key) => {
    if (categoriesList[key]){
      categoryChoices.push(
        <MenuItem value={key}>{ key }</MenuItem>
      )
    }
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
            <Typography variant='h5' className={classes.formTitle}>New Loadout</Typography>
            <div className={classes.fieldsContainer}>
              <FormControl variant="outlined" margin="dense" className={classes.select}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={loadoutCategory}
                  onChange={handleSelect}
                  label="Category"
                >
                  { categoryChoices }
                </Select>
              </FormControl>
              <TextField className={classes.select} value={loadoutNameText}  margin="dense" label="Loadout Title" variant="outlined" onChange={handleTextChange} onKeyPress={handleSubmitTitle} />
            </div>
            <div className={classes.chipsContainer}>
              {chips}
            </div>
            <div className={classes.chipsContainer}>
              <Link to='/make' style={{ textDecoration: 'none' }}>
                <Button className={ classes.nextButton } variant='contained' color='primary' onClick={handleLoadoutMetadataSubmit}>Create</Button>
              </Link>
            </div>
          </Paper>
        </Modal>
      }
    </div>
  )
};

export default LoadoutMetadataForm;
