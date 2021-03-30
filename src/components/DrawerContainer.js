import { useState } from 'react';
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

const DrawerContainer = ({
  currentClass,
  currentGun,
  setClass,
  setGun,
  drawerState,
  toggleDrawer,
  loadoutState,
  setLoadoutState,
}) => {
  console.log('drawer loadoutState[drawerState.weaponSelection]', loadoutState[drawerState.weaponSelection]);
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
    console.log('submitSelectionState', event.target.value);
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
          <option aria-label="None" value="" />
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
