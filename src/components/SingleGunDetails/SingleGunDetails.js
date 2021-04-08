import React from 'react';
import { withStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Image from '../../Img/LoadoutTest.jpg';
import OverlayImage from '../../Img/transparent-background.png';
import ModCardRow from './ModCardRow';
import WeaponCard from '../WeaponCard';

const styles = {
  root: {
    // width: '900px',
    // height: '600px',
    // backgroundImage: `url(${Image})`,
    // backgroundSize: '900px 600px',
    // backgroundRepeat: 'no-repeat',
    // overflow: 'hidden',
  },
  overlay: {
    width: '100%',
    height: '600px',
    backgroundSize: '900px 600px',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
  }
};

class SingleGunDetails extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    const { toggleSingleGun, classes, toggleDrawer, gun } = this.props;
    return (
      <div >
      {
        <div className={classes.root} >
          <div className={classes.overlay} style={{ backgroundImage: `url(${OverlayImage})`}}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <ModCardRow/>
              </Grid>
              <Grid item xs={3}/>
              <Grid item xs={6}>
                <WeaponCard gun={gun} toggleDrawer={toggleDrawer} loadoutGunClass={'primary'}/>
              </Grid>
              <Grid item xs={3}/>
              <Grid item xs={12}>
                <ModCardRow/>
              </Grid>

            </Grid>
          </div>
        </div>

      }
      </div>
    );
  }
}

export default withStyles(styles)(SingleGunDetails);
