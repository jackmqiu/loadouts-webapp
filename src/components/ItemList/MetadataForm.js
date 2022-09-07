import React, { useState, useCallback } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import { Link, useHistory } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { hashtagTable, categoriesList, buildClasses } from '../../constants';

const styles = {
  modal: {
    marginRight: 'auto',
    marginLeft: 'auto',
    maxWidth: 600,
    minWidth: 120,
    maxHeight: 800,
    padding: 3,
  },
  formTitle: {
    marginLeft: '10%',
    paddingTop: 4,
  },
  textField: {
    marginBottom: 1,
    marginLeft: 0.5,
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
    paddingTop: 4,
    paddingBottom: 4,
  },
  chipsContainer: {
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
    marginBottom: 4,
  },
  chips: {
    marginRight: 1,
    marginBottom: 1,
  },
  select: {
    margin: '5px 5px 5px 5px',
  },
  nextButton: {
    marginBottom: 1,
  },
};

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
  loggedInUser,
}) => {
  const [loadoutNameText, setNameText] = useState(igLoadoutState.title);
  const [loadoutClass, setLoadoutClass] = useState(Object.keys(buildClasses)[1]);
  const history = useHistory();
  const directToMakeLoadout = useCallback(() => history.push('/make'), [history]);
  const handleTextChange = (event) => {
    setNameText(event.target.value);
  };
  const handleSelect = (event) => {
    setLoadoutCategory(event.target.value);
    setLoadoutHashtags(hashtagTable);
  }
  const handleClassSelect = (event) => {
    setLoadoutClass(event.target.value);
  }
  //loadout Name
  //chips
  const handleLoadoutMetadataSubmit = () => {
    mixpanel.track(
      'Action',
      {"handleMetadataSubmit": `${loadoutNameText}`}
    );
    updateLoadoutMetadata({
      loadoutName: loadoutNameText,
      loadoutClass: loadoutClass,
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
        color={loadoutHashtagsObject[key] ? 'primary' : 'secondary'}
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
  const classChoices = [];
  Object.keys(buildClasses).forEach((key) => {
    if (key !== 'all') {
      classChoices.push(
        <MenuItem value={key}>{ key }</MenuItem>
      )
    }
  })
  return (
    <div>
      <Box sx={styles.fieldsContainer}>
        <FormControl disabled variant="outlined" margin="dense" sx={styles.select}>
          <InputLabel>Category</InputLabel>
          <Select
            value={loadoutCategory}
            onChange={handleSelect}
            label="Category"
          >
            { categoryChoices }
          </Select>
        </FormControl>
        <FormControl variant="outlined" margin="dense" sx={styles.select}>
          <InputLabel>Class</InputLabel>
          <Select
              value={loadoutClass}
              onChange={handleClassSelect}
              label="Class"
            >
              { classChoices }
          </Select>
        </FormControl>
        <TextField autoFocus={true} sx={styles.select} value={loadoutNameText}  margin="dense" label="Loadout Title" variant="outlined" onChange={handleTextChange} onKeyPress={handleSubmitTitle} />
        { loggedInUser?.username && 
          <TextField sx={styles.select} value={loggedInUser?.username}  margin="dense" label="Username" disabled />
        }
      </Box>
      <Box sx={styles.chipsContainer}>
        {chips}
      </Box>
      <Box sx={styles.chipsContainer}>
        <Link to='/make' style={{ textDecoration: 'none' }}>
          <Button sx={ styles.nextButton } variant='contained' color='primary' onClick={handleLoadoutMetadataSubmit}>Set</Button>
        </Link>
      </Box>
    </div>
  )
};

export default MetadataForm;
