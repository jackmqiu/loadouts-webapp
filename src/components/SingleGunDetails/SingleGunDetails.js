import React from 'react';
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

import ModsList from '../../ModsList';
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
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = React.useState('');
  const handleCategorySelect = (event) => {
    setCategory(event.target.value);
  };
  const handleModelSubmit = (event) => {
    setMod(event.target.id, category, event.target.value);
  }
  const handleOpen = () => {
    console.log('openModal')
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const firstRow = [];
  for (let i = 0; i < 4; i++) {
    console.log('firstRow', i, modsState[i]);
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
        />
      </Grid>
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
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="select"
                id="select-category"
                value={category}
                onChange={handleCategorySelect}
              >
                {
                  ModsList.map((category) => {
                    <MenuItem value={category}>{category}</MenuItem>
                  })
                }
              </Select>
            </FormControl>
          </Paper>
        </Modal>
      </div>

    }
    </div>
  );
}
