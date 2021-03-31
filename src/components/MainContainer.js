import React from 'react';
import { withStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SideContainer from './SideContainer.js';
import Grid from '@material-ui/core/Grid';
import Image from '../Img/LoadoutTest.jpeg';

const styles = {
  root: {
    width: '960px',
    height: '600px',
    backgroundImage: `url(${Image})`,
    backgroundSize: '960px 600px',
    backgroundRepeat: 'no-repeat',
  },
};

class MainContainer extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    const {loadoutState, toggleDrawer, classes, backImage } = this.props;
    console.log('backImage', backImage);
    return (
      <div>
      { backImage ?
        <div className={classes.root} style={{ backgroundImage: `url(${backImage['data_url']})` }}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <SideContainer loadoutState={loadoutState} toggleDrawer={toggleDrawer}/>
          </Grid>
          <Grid item xs={9}>

          </Grid>
        </Grid>
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
