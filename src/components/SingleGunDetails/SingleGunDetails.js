import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';

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
  }
});

export default function SingleGunDetails ({modsState, toggleSingleGun, toggleDrawer, gun, setMod})  {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };


  const firstRow = [];
  for (let i = 0; i < 4; i++) {
    console.log('firstRow', i, modsState[i]);
    firstRow.push(
      <Grid item xs={3}>
        <ModCard partName={modsState[i+1].category} />
      </Grid>
    )
  }
  const secondRow = [];
  for (let i = 4; i < 8; i++) {
    secondRow.push(
      <Grid item xs={3}>
        <ModCard partName={modsState[i+1].category} />
      </Grid>
    )
  }
  const handleClose = () => {
    setOpen(false);
  };
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

        </Modal>
      </div>

    }
    </div>
  );
}
