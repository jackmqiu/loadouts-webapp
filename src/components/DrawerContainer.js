import { useState } from 'react';
import ReactGA from 'react-ga';
import {
  Select,
  Button,
  NativeSelect,
  FormControl,
  FormHelperText,
  InputLabel,
  Drawer,
} from '@material-ui/core';
import gunTable from '../GunTable.js';
import keyTable from '../KeyTable.js';

const TRACKING_ID = "UA-193462319-2";
ReactGA.initialize(TRACKING_ID);

const DrawerContainer = ({
  currentClass,
  currentGun,
  setGun,
  drawerState,
  toggleDrawer,
  loadoutState,
  setLoadoutState,
}) => {
  const [selectionState, updateSelectionState] = useState({
    class: 'assault',
    weaponSelection: '',
  });
  const selectClass = (event) => {
    updateSelectionState({
      ...selectionState,
      class: event.target.value
    })
  }
  const submitSelectionState = (event) => {
    ReactGA.event({
      category: 'Action',
      action: 'inDrawerSubmitSelectionState',
    });
    setLoadoutState({
      ...loadoutState,
      [drawerState.weaponSelection]: {
        ...loadoutState[drawerState.weaponSelection],
        class: keyTable[selectionState.class],
        gunName: event.target.value,
      }
    });
    toggleDrawer('primary');
  };
  return (
    <Drawer anchor={'bottom'} open={drawerState.open} onClose={() => {toggleDrawer('primary')}}>
      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-age-native-simple">Class</InputLabel>
        <Select
          native
          value={selectionState.class}
          onChange={selectClass}
          label="Class"
          inputProps={{
            name: 'class',
            id: 'outlined-class-native-simple',
          }}
        >

          <option value={'assault'}>Assault Rifle</option>
          <option value={'smg'}>SMG</option>
          <option value={'pistol'}>Pistol</option>
        </Select>
        { //Gun selection
          loadoutState[drawerState.weaponSelection].class !== '' &&
          <Select
            native
            value={loadoutState[drawerState.weaponSelection].name}
            onChange={submitSelectionState}
            label="Gun"
            inputProps={{
              name: 'gun',
              id: 'outlined-class-native-simple',
            }}
          >
            <option aria-label="None" value="" />
            {gunTable.classes[selectionState.class].list.map((gun) =>
                <option value={gun}>{gun}</option>
            )}

          </Select>
        }
      </FormControl>
    </Drawer>
  )}

  export default DrawerContainer;
