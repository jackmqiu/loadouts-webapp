import React from 'react';
import { withStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SideContainer from './SideContainer.js';
import Grid from '@material-ui/core/Grid';
import Image from '../Img/LoadoutTest.jpg';
import OverlayImage from '../Img/transparent-background.png';

const styles = {
  root: {
    width: '900px',
    height: '600px',
    backgroundImage: `url(${Image})`,
    backgroundSize: '900px 600px',
    backgroundRepeat: 'no-repeat',
    overflow: 'auto',
  },
  overlay: {
    width: '100%',
    height: '600px',
    position: 'fixed',
    backgroundRepeat: 'no-repeat',

  }
};

class MainContainer extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    const {loadoutState, toggleDrawer, classes, backImage } = this.props;
    return (
      <div className={classes.root}>
      { backImage ?
        <div className={classes.root} style={{ backgroundImage: `url(${backImage['data_url']})` }}>
          <div className={classes.overlay} style={{ backgroundImage: `url(${OverlayImage})`}}>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <SideContainer loadoutState={loadoutState} toggleDrawer={toggleDrawer}/>
              </Grid>
              <Grid item xs={9}>

              </Grid>
            </Grid>
          </div>
        </div>
        : <div className={classes.root} style={{ backgroundImage: `url(${Image})` }}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <SideContainer loadoutState={loadoutState} toggleDrawer={toggleDrawer}/>
          </Grid>
          <Grid item xs={9}>

          </Grid>
        </Grid>
        </div>
      }
      </div>
    );
  }
}

export default withStyles(styles)(MainContainer);
