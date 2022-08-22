import React, { useState, useCallback } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { makeStyles } from '@mui/styles';
import { Link, useHistory } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { hashtagTable, categoriesList } from '../../constants';
const useStyles = makeStyles((theme) => ({
  modal: {
    marginRight: 'auto',
    marginLeft: 'auto',
    maxWidth: 600,
    minWidth: 120,
    maxHeight: 800,
    padding: 20,
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  formTitle: {
    marginLeft: '10%',
    paddingTop: 30,
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
}));

const styles = {
  chips: {
    marginRight: 4,
    marginBottom: 5,
  },
  select: {
    margin: '0px 5px 0px 5px',
  },
  nextButton: {
    marginBottom: 30,
  },
}

const MetadataForm = ({
  mixpanel,
  igLoadoutState,
  toggleNewLoadoutFormOpen,
  newLoadoutFormOpen,
  loadoutHashtags,
  setLoadoutHashtags,
  updateLoadoutMetadata,
  loadoutCategory,
  setLoadoutCategory,
}) => {
  const classes = useStyles();
  const [loadoutNameText, setNameText] = useState(igLoadoutState.title);
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
        // color={loadoutHashtagsObject[key] ? 'primary' : ''}
        label={`#${key}`}
        onClick={() => {toggleLoadoutHashtags(key)}}
        sx={styles.chips}
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
      <div className={classes.fieldsContainer}>
        <FormControl variant="outlined" margin="dense" sx={styles.select}>
          <InputLabel>Category</InputLabel>
          <Select
            value={loadoutCategory}
            onChange={handleSelect}
            label="Category"
          >
            { categoryChoices }
          </Select>
        </FormControl>
        <TextField autoFocus={true} sx={styles.select} value={loadoutNameText}  margin="dense" label="Loadout Title" variant="outlined" onChange={handleTextChange} onKeyPress={handleSubmitTitle} />
      </div>
      <div className={classes.chipsContainer}>
        {chips}
      </div>
      <div className={classes.chipsContainer}>
        <Link to='/make' style={{ textDecoration: 'none' }}>
          <Button sx={ styles.nextButton } variant='contained' color='primary' onClick={handleLoadoutMetadataSubmit}>Set</Button>
        </Link>
      </div>
    </div>
  )
};

export default MetadataForm;
