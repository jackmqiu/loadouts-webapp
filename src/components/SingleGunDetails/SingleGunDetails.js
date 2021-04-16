import { form, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import ModsList from '../../ModsList.js';
import Image from '../../Img/LoadoutTest.jpg';
import OverlayImage from '../../Img/transparent-background.png';
import ModCard from './ModCard';
import DetailWeaponCard from './DetailWeaponCard';
import LayoutTable from '../../LayoutTable';

const useStyles = makeStyles({
  root: {
    // width: '100%',
    // height: '100%',
    // backgroundImage: `url(${Image})`,
    // backgroundSize: '900px 600px',
    // backgroundRepeat: 'no-repeat',

  },
  grid: {
    margin: 1,
  },
  overlay: {
    width: '100%',

    backgroundSize: '900px 800px',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
  },
  formControl: {
    margin: '1rem',
    minWidth: 120,
  },
});

export default function SingleGunDetails ({modsState, toggleSingleGun, toggleDrawer, gun, setMod, mixpanel, getImage})  {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('');
  const [modText, setModText] = useState('');
  const [modCardSelection, setActiveModCard] = useState(1);
  const [numMods, updateNumMods] = useState(1);
  const handleCategorySelect = (event) => {
    setCategory(event.target.value);
  };
  const handleModelSubmit = (event) => {
    if (event.key === 'Enter') {
      setMod(modCardSelection, category, event.target.value);
      handleClose();
      event.preventDefault();
    }
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

  const modsGridItems = [];
  for (let i = 0; i < numMods; i++) {
    modsGridItems.push(

        <ModCard
          id={i+1}
          partName={modsState[i+1].category}
          modName={modsState[i+1].model}
          openModal={handleOpen}
          closeModal={handleClose}
        />

    )
  }
  // const secondRow = [];
  // for (let i = 4; i < 8; i++) {
  //   secondRow.push(
  //
  //       <ModCard
  //         partName={modsState[i+1].category}
  //         modName={modsState[i+1].model}
  //         openModal={handleOpen}
  //         closeModal={handleClose}
  //         id={i+1}
  //       />
  //
  //   )
  // }
  const modsSelections = [];
  for (let category of ModsList) {
    modsSelections.push(
      <MenuItem value={category} >{category}</MenuItem>
    )
  }
  return (
    <div >
    {
      <div className={classes.root} >
        <div className={classes.overlay} style={{ backgroundImage: `url(${OverlayImage})`}}>
          <Grid container className={classes.grid} spacing={3}>
              {
                modsGridItems
              }
            <Grid item xs={12}>
              <DetailWeaponCard gun={gun} toggleDrawer={toggleDrawer} loadoutGunClass={'primary'}/>
            </Grid>

          </Grid>
        </div>
        <div>
          {
            numMods < 8 &&
            <Button
              variant="contained"
              color="Primary"
              onClick={() => {updateNumMods(numMods+1)}}>Add Mod</Button>
          }
          {
            numMods > 0 &&
            <Button
              variant="contained"
              color="Secondary"
              onClick={() => {updateNumMods(numMods-1)}}>Remove Mod</Button>
          }
          <Button variant="contained" onClick={getImage}>Export</Button>
        </div>
        <Modal
          open={open}
          onClose={handleClose}

        >
          <Paper>
            <form onSubmit={() => {setMod(modCardSelection, category, modText)}}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="select"
                id="select-category"
                value={category}
                onChange={handleCategorySelect}
              >
                {
                  modsSelections
                }
              </Select>
            </FormControl>
            <FormControl>
              <TextField id="standard-basic" label="Model" onChange={handleTextChange} onKeyPress={handleModelSubmit}/>
            </FormControl>
          </form>
          </Paper>
        </Modal>
      </div>

    }
    </div>
  );
}
