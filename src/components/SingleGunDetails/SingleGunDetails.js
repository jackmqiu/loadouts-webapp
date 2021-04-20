import { form, useState, createRef, useRef } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import ModGrid from './ModGrid';
import ModsList from '../../ModsList.js';
import Image from '../../Img/LoadoutTest.jpg';
import OverlayImage from '../../Img/transparent-background.png';
import ModCard from './ModCard';
import DetailWeaponCard from './DetailWeaponCard';
import LayoutTable from '../../LayoutTable';
import { useScreenshot, createFileName } from 'use-react-screenshot'

const useStyles = makeStyles({
  drawer: {
  },
  formControl: {
    margin: '1rem',
    minWidth: 120,
  },
  button: {
    margin: 5,
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
  }
});

export default function SingleGunDetails ({
  modsState,
  toggleSingleGun,
  toggleDrawer,
  gun,
  setMod,
  mixpanel,
  getImage,
  numMods,
})  {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('');
  const [modText, setModText] = useState('');
  const [modCardSelection, setActiveModCard] = useState(1);
  const capture = createRef(null);

  const handleCategorySelect = (event) => {
    mixpanel.track(
      'Action',
      {"selectModCategory": event.target.value}
    );
    setCategory(event.target.value);
  };
  const handleModelSubmit = (event) => {
    if (event.key === 'Enter') {
      mixpanel.track(
        'Action',
        {"submitMod": `${modCardSelection} ${category} ${event.target.value}`}
      );
      setMod(modCardSelection, category, event.target.value);
      handleClose();
      event.preventDefault();
    }
  }
  const handleSubmit = () => {
    setMod(modCardSelection, category, modText)
    handleClose();
  }
  const handleTextChange = (event) => {
    setModText(event.target.value);
  }
  const handleOpen = (modCardID) => {
    mixpanel.track(
      'Action',
      {"mod": "toggleMod"}
    );
    setActiveModCard(modCardID);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const modsSelections = [];
  for (let category of ModsList) {
    modsSelections.push(
      <MenuItem value={category} >{category}</MenuItem>
    )
  }
  return (
    <div >
    {
      <div className={classes.root}>
        <ModGrid
          modsState={modsState}
          handleOpen={handleOpen}
          handleClose={handleClose}
          gun={gun}
          toggleDrawer={toggleDrawer}
          toggleSingleGun={toggleSingleGun}
          mixpanel={mixpanel}
          numMods={numMods}
        />
      <Drawer
          anchor='top'
          open={open}
          onClose={handleClose}
          className={classes.drawer}
        >
          <FormControl className={classes.formControl} variant="outlined">
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              className={classes.select}
              value={category}
              onChange={handleCategorySelect}
              label='Category'
              inputProps={{
                name: 'class',
                id: 'outlined-class-native-simple',
              }}
            >
              { modsSelections }
            </Select>
          </FormControl>
          <FormControl className={classes.formControl} variant="outlined">
            <TextField className={classes.textField} variant="outlined" id="standard-basic" label="Model" onChange={handleTextChange} onKeyPress={handleModelSubmit}/>
          </FormControl>
          <div className={classes.formControl}>
            {
              category &&
              <Button className={classes.textField} variant='contained' color='primary' onClick={handleSubmit}>Submit</Button>
            }
          </div>

        </Drawer>
      </div>

    }
    </div>
  );
}
