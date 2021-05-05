import { useState } from 'react';
import ReactGA from 'react-ga';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import {
  Select,
  Button,
  NativeSelect,
  FormControl,
  FormHelperText,
  InputLabel,
  Drawer,
  Typography,
  TextField,
} from '@material-ui/core';
import gunTable from '../GunTable.js';
import keyTable from '../KeyTable.js';

const TRACKING_ID = "UA-193462319-2";
ReactGA.initialize(TRACKING_ID);

const useStyles = makeStyles({
  root: {
  },
  formControl: {
    margin: '1rem',
    minWidth: 120,
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

const DrawerContainer = ({
  currentClass,
  currentGun,
  setGun,
  drawerState,
  toggleDrawer,
  loadoutState,
  setLoadoutState,
  mixpanel,
}) => {
  const [selectionState, updateSelectionState] = useState({
    class: 'rifle',
    weaponSelection: '',
  });
  const [gunText, setGunText] = useState('');
  const selectClass = (event) => {
    setLoadoutState({
      ...loadoutState,
      [drawerState.weaponSelection]: {
        ...loadoutState[drawerState.weaponSelection],
        class: keyTable[event.target.value],
      }
    });
  }
  const selectGun = (event) => {
    setLoadoutState({
      ...loadoutState,
      [drawerState.weaponSelection]: {
        ...loadoutState[drawerState.weaponSelection],
        gunName: event.target.value,
      }
    });
    // setLoadoutState({
    //   ...loadoutState,
    //   [drawerState.weaponSelection]: {
    //     ...loadoutState[drawerState.weaponSelection],
    //     class: keyTable[selectionState.class],
    //     gunName: event.target.value,
    //   }
    // });
    // toggleDrawer('primary');
  };
  const handleTextChange = (event) => {
    setGunText(event.target.value);
  }
  const handleGunSubmit = (event) => {
    if (event.key === 'Enter') {
      mixpanel.track(
        'Action',
        {"submitGun": `${selectionState.class} ${selectionState.weaponSelection} ${event.target.value}`}
      );
      setLoadoutState({
        ...loadoutState,
        [drawerState.weaponSelection]: {
          ...loadoutState[drawerState.weaponSelection],
          gunCustomField: event.target.value,
        }
      });
      toggleDrawer('primary');
      event.preventDefault();
    }
  }
  const handleSubmit = () => {
    mixpanel.track(
      'Action',
      {"submitGun": `${selectionState.class} ${selectionState.weaponSelection} ${gunText}`}
    );
    setLoadoutState({
      ...loadoutState,
      [drawerState.weaponSelection]: {
        ...loadoutState[drawerState.weaponSelection],
        gunCustomField: gunText,
      }
    });
    toggleDrawer('primary');
  }
  const classes = useStyles();
  return (
    <Drawer className={classes.root} anchor={'bottom'} open={drawerState.open} onClose={() => {toggleDrawer('primary')}}>
      <Typography className={classes.formTitle}> Gun Selection </Typography>
      <FormControl className={classes.formControl} variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label">Class</InputLabel>
        <Select
          native
          className={classes.select}
          value={keyTable[loadoutState[drawerState.weaponSelection].class]}
          onChange={selectClass}
          label="Class"
          inputProps={{
            name: 'class',
            id: 'outlined-class-native-simple',
          }}
        >

          <option value={'rifle'}>Rifle</option>
          <option value={'smg'}>SMG</option>
          <option value={'pistol'}>Pistol</option>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl} variant="outlined">
        { //Gun selection
          loadoutState[drawerState.weaponSelection].class !== '' &&
          <div>
            <InputLabel id="demo-simple-select-outlined-label">Gun</InputLabel>
            <Select
              native
              className={classes.select}
              value={loadoutState[drawerState.weaponSelection].gunName}
              onChange={selectGun}
              label="Gun"
              inputProps={{
                name: 'gun',
                id: 'outlined-class-native-simple',
              }}
            >
              <option value=""></option>
              {gunTable.classes[keyTable[loadoutState[drawerState.weaponSelection].class]].list.map((gun) =>
                  <option value={gun}>{gun}</option>
              )}

            </Select>
          </div>
        }
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField className={classes.textField} label="Model" variant='outlined' onChange={handleTextChange} onKeyPress={handleGunSubmit}/>
      </FormControl>
      <div className={classes.formControl}>
        {
          loadoutState[drawerState.weaponSelection].class !== '' && loadoutState[drawerState.weaponSelection].gunName &&
          <Button className={classes.textField} variant='contained' color='primary' onClick={handleSubmit}>Submit</Button>
        }
      </div>
    </Drawer>
  )}

  export default DrawerContainer;
