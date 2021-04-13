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

import ModsList from '../../ModsList.js';
import Image from '../../Img/LoadoutTest.jpg';
import OverlayImage from '../../Img/transparent-background.png';
import ModCard from './ModCard';
import DetailWeaponCard from './DetailWeaponCard';

const useStyles = makeStyles({
  root: {
    // width: '100%',
    // height: '100%',
    // backgroundImage: `url(${Image})`,
    // backgroundSize: '900px 600px',
    // backgroundRepeat: 'no-repeat',
    margin: '20 0 20 0',
  },
  overlay: {
    width: '100%',
    height: '600px',
    backgroundSize: '900px 600px',
    backgroundRepeat: 'no-repeat',

    display: 'flex',
  },
  formControl: {
    margin: '1rem',
    minWidth: 120,
  },
});

export default function SingleGunDetails ({modsState, toggleSingleGun, toggleDrawer, gun, setMod})  {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('');
  const [modText, setModText] = useState('');
  const [modCardSelection, setActiveModCard] = useState(1);
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
    console.log('handleOpen', modCardID);
    setActiveModCard(modCardID);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const firstRow = [];
  for (let i = 0; i < 4; i++) {
    firstRow.push(
      <Grid item xs={3}>
        <ModCard
          id={i+1}
          partName={modsState[i+1].category}
          openModal={handleOpen}
          closeModal={handleClose}
        />
      </Grid>
    )
  }
  const secondRow = [];
  for (let i = 4; i < 8; i++) {
    secondRow.push(
      <Grid item xs={3}>
        <ModCard
          partName={modsState[i+1].category}
          openModal={handleOpen}
          closeModal={handleClose}
          id={i}
        />
      </Grid>
    )
  }
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
          <Grid container spacing={3}>
              {
                firstRow
              }
            <Grid item xs={12}>
              <DetailWeaponCard gun={gun} toggleDrawer={toggleDrawer} loadoutGunClass={'primary'}/>
            </Grid>
            {
              secondRow
            }
          </Grid>
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
