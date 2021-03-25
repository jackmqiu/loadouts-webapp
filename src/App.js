
import './App.css';
import MainContainer from './components/MainContainer.js';
import React, { useState, useEffect } from "react";


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

  return (
    <div className="App" >
      <MainContainer loadoutState={loadoutState}/>
    </div>
  );
}

export default App;
