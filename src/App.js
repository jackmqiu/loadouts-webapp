
import './App.css';
import MainContainer from './components/MainContainer.js';
import React, { useState, useEffect } from "react";
import Drawer from '@material-ui/core/Drawer';


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
    }
  });
  const [drawerState, toggleDrawerState] = useState(false);

  const toggleDrawer = (gun) => {
    toggleDrawerState(!drawerState);
  }
  return (
    <div className="App" >
      <MainContainer loadoutState={loadoutState} toggleDrawer={toggleDrawer}/>
      <Drawer anchor={'bottom'} open={drawerState} onClose={() => {toggleDrawer()}}>
        drawer
      </Drawer>
    </div>
  );
}

export default App;
