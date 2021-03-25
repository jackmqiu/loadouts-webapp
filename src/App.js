
import './App.css';
import MainContainer from './components/MainContainer.js';
import React, { useState, useEffect } from "react";
import Drawer from '@material-ui/core/Drawer';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

function App() {
  const [loadoutState, setLoadoutState] = useState({
    primary: {
      name: 'AK-47',
      class: 'Assault Rifle',
      manufacturer: 'G&G',
    },
    secondary: {
      name: 'AAP-01',
      class: 'Pistol',
      manufacturer: 'Action Army',
    },
  });
  const [drawerState, toggleDrawerState] = useState({
    open: false,
    weaponSelection: 'primary',
  });

  const toggleDrawer = (weaponSelection) => {
    toggleDrawerState({
      open: !drawerState.open,
      weaponSelection: weaponSelection,
    });
    console.log('toggleDrawer ', weaponSelection, drawerState.weaponSelection);

  };
  const setGun = (weaponSelection, gun) => {
    setLoadoutState({
      ...loadoutState,
      [weaponSelection]: {
        ...loadoutState[weaponSelection],
        name: gun,
      },
    });
  };
  const setClass = (event) => {
    console.log('setClass', event.target.value)
    setLoadoutState({
      ...loadoutState,
      [drawerState.weaponSelection]: {
        ...loadoutState[drawerState.weaponSelection],
        class: event.target.value,
      }
    })
  };
  return (
    <div className="App" >
      <MainContainer loadoutState={loadoutState} toggleDrawer={toggleDrawer}/>
      <Drawer anchor={'bottom'} open={drawerState.open} onClose={() => {toggleDrawer('primary')}}>
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-age-native-simple">Gun</InputLabel>
          <Select
            native
            value={loadoutState[drawerState.weaponSelection].class}
            onChange={setClass}
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
        </FormControl>
      </Drawer>
    </div>
  );
}

export default App;
