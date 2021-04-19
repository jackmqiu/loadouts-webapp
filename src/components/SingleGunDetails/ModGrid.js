import React, { createRef, withStyles } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useScreenshot, createFileName } from 'use-react-screenshot'

import ModCard from './ModCard';
import ModsList from '../../ModsList.js';
import Image from '../../Img/LoadoutTest.jpg';
import OverlayImage from '../../Img/transparent-background.png';
import DetailWeaponCard from './DetailWeaponCard';
import LayoutTable from '../../LayoutTable';

const styles = {
  grid: {
    margin: 1,
    backgroundImage: `url(${OverlayImage})`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
  },
  button: {
    margin: 5,
  },
};

class ModGrid extends React.Component {
  constructor(props) {
    super(props);
    // create a ref to store the textInput DOM element
    this.state = {
      numMods: 1,
    }
    this.grid = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
    this.updateNumMods = this.updateNumMods.bind(this);
    this.getImage = this.getImage.bind(this);
  }

  focusTextInput() {
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    this.grid.current.focus();
  }

  updateNumMods(update) {
    this.setState({
      numMods: this.state.numMods + update,
    })
  }

  render() {
    const { numMods } = this.state;
    const {
      handleOpen,
      handleClose,
      modsState,
      gun,
      toggleDrawer,
      toggleSingleGun,
      classes,
      mixpanel,
      getImage,
    } = this.props;
    // tell React that we want to associate the <input> ref
    // with the `grid` that we created in the constructor
    const modsGridItems = [];
    let j = 0;
    for (let i = 0; i < numMods+1; i++) {
      if (LayoutTable[numMods][i].type === 'mod') {
        modsGridItems.push(
          <Grid item xs={LayoutTable[numMods][i].gridItemWidth}>
            <ModCard
              id={j+1}
              partName={modsState[j+1].category}
              modName={modsState[j+1].model}
              openModal={handleOpen}
              closeModal={handleClose}
              />
          </Grid>
        )
        j++;
      } else {
        modsGridItems.push(
          <Grid item xs={LayoutTable[numMods][i].gridItemWidth}>
            <DetailWeaponCard gun={gun} toggleDrawer={toggleDrawer} loadoutGunClass={'primary'}/>
          </Grid>
        );
      }
    };
    return (
      <div>
        <Grid container ref={this.grid} className={classes.grid} spacing={3}>
          { modsGridItems }
        </Grid>
        <input
          type="text"
          ref={this.grid} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
        <div>
          {
            numMods < 8 &&
            <Button
              className={classes.button}
              variant="contained"
              color="Primary"
              onClick={() => {this.updateNumMods(1)}}>Add Mod</Button>
          }
          {
            numMods > 0 &&
            <Button
              className={classes.button}
              variant="contained"
              color="Secondary"
              onClick={() => {this.updateNumMods(-1)}}>Remove Mod</Button>
          }
          <Button className={classes.button} variant="contained" onClick={getImage}>Export</Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ModGrid);
