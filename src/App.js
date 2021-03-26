
import './App.css';
import MainContainer from './components/MainContainer.js';
import React, { useState, useEffect, createRef, useRef } from "react";
import { useScreenshot, createFileName } from 'use-react-screenshot'
import {
  Select,
  Button,
  NativeSelect,
  FormControl,
  FormHelperText,
  InputLabel,
  Drawer,
} from '@material-ui/core';

function App() {
  const capture = createRef(null)
  const [image, takeScreenshot] = useScreenshot()
  const getImage = () => {
    takeScreenshot(capture.current).then(download);
    console.log('image', capture.current);
  }
  const download = (image, { name = "my_loadout1", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };
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
      <div ref={capture}>
        <MainContainer loadoutState={loadoutState} toggleDrawer={toggleDrawer} />
      </div>
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
       <Button variant="contained" onClick={getImage}>Export</Button>
       <img width={100} src={image} alt={'Screenshot'} />
    </div>
  );
}

export default App;
