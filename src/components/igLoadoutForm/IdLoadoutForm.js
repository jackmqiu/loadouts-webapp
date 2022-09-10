import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';

const styles = {
  paper: {
    position: 'absolute',
    width: 400,
    border: '2px solid #000',
  },
  grid: {
    margin: 1,
    backgroundColor: 'gray',
    width: '100%',
  },
  modal: {
    marginRight: 'auto',
    marginLeft: 'auto',
    maxWidth: 600,
    minWidth: 120,
    padding: 3,
    marginBottom: '10%',
  },
  formTitle: {
    marginLeft: '10%',
    paddingTop: 4,
    paddingBottom: 1,
  },
  select: {
    margin: '0px 5px 0px 5px',
  },
  textField: {
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
    padding: 0,
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
  guideText: {
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: 0.5,
  },
  buttonContainer: {
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
    marginBottom: 4,
  },
  nextButton: {
    marginBottom: 4,
    marginRight: 1,
  },
  searchButton: {
    padding: 0,
  },
};

const IdLoadoutForm = ({
  mixpanel,
  submitLoadout,
  title,
}) => {
  const [itemText, setItemText] = useState(title.replace(' ', '').concat(Math.floor(Math.random()*8999 + 1000)));
  const handleTextChange = (event) => {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
      setItemText(event.target.value.toLowerCase());
    }
  };
  const handleItemSubmit = (event) => {
    if (event.key === 'Enter') {
      mixpanel.track(
        'Action',
        {"submitLoadoutName": `${event.target.value}`}
      );
      submitLoadout(event.target.value);
      event.preventDefault();
    }
  }
  const handleClick = () => {
    submitLoadout(itemText);
  }
  return (
    <div>
      <Box sx={styles.fieldsContainer}>
        <Typography variant='h5' sx={styles.formTitle}> Your LoadoutID</Typography>
        <TextField disabled sx={styles.textField} value={itemText} variant="outlined" onChange={handleTextChange} onKeyPress={handleItemSubmit}/>
        <Typography sx={styles.guideText} variant='subtitle2'>{`Your loadout will be available at loadouts.me/${itemText}`}</Typography>
      </Box>
      <Box sx={styles.buttonContainer}>
        <Button variant='contained' color='primary' sx={styles.nextButton} onClick={handleClick}> Submit </Button>
      </Box>
    </div>
  )
}

export default IdLoadoutForm;
