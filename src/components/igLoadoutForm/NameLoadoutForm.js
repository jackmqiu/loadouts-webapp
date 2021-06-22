import { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/button';

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
    marginRight: 'auto',
    marginLeft: 'auto',
    maxWidth: 600,
    minWidth: 120,
    padding: 20,
    marginBottom: '10%',
  },
  formTitle: {
    marginLeft: '10%',
    paddingTop: 30,
    paddingBottom: 10,
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
    paddingTop: 30,
    paddingBottom: 30,
  },
  buttonContainer: {
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
    marginBottom: 30,
  },
  nextButton: {
    marginBottom: 30,
    marginRight: 10,
  },
  searchButton: {
    padding: 0,
  },
}));

const NameLoadoutForm = ({
  mixpanel,
  submitLoadout
}) => {
  const classes = useStyles();
  const [itemText, setItemText] = useState('');
  const handleTextChange = (event) => {
    setItemText(event.target.value.toLowerCase());
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
      <div className={classes.fieldsContainer}>
        <Typography variant='h5' className={classes.formTitle}> Enter Loadout Id</Typography>
        <TextField className={classes.textField} value={itemText} label="Product" variant="outlined" onChange={handleTextChange} onKeyPress={handleItemSubmit}/>
      </div>
      <div className={classes.buttonContainer}>
        <Button variant='contained' color='primary' className={classes.nextButton} onClick={handleClick}> Submit </Button>
      </div>
    </div>
  )
}

export default NameLoadoutForm;
