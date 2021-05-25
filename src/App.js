
import './App.css';
import MenuBar from './components/MenuBar.js';
import IgLoadout from './components/igLoadout';
import FloatingNav from './components/FloatingNav';
import React, { useState, createRef } from "react";
import ReactGA from 'react-ga';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import useWindowDimensions from './useWindowDimensions';
import IgLoadoutForm from './components/igLoadoutForm'

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});
const axiosInstanceGoogle = axios.create({
  baseURL: 'https://www.googleapis.com/customsearch',
  params: {
    key: `${process.env.REACT_APP_GOOGLE_KEY}`,
    cx: `${process.env.REACT_APP_GOOGLE_CX}`,
  }
})

const TRACKING_ID = "UA-193462319-2";
ReactGA.initialize(TRACKING_ID);
ReactGA.pageview(window.location.pathname + window.location.search);
const mixpanel = require('mixpanel-browser');
mixpanel.init("fbbc7fb17f489f12483171381e8da3d2");

const App = () => {
  const loadoutsId = useLocation().pathname.substring(1);
  const capture = createRef(null);
  const [igLoadoutIdState, setIgLoadoutIdState] = useState('');
  const [igLoadoutFormOpen, setIgLoadoutFormState] = useState(false);
  const [numMods, updateNumMods] = useState(3);
  const { height, width } = useWindowDimensions();
  const [colorScheme, setColorScheme] = useState({
    0: 'white',
    1: 'white',
    2: 'white',
  })
  const [igLoadoutState, setIgLoadoutState] = useState({});
  const [activeIgLoadoutCard, setActiveIgLoadoutCard] = useState(0);
  const [googleResults, setGoogleResults] = useState(null);
  const [displayState, setDisplayState] = useState(
    //Gun Details
    //Overlay Loadout
    //igLoadout
    //Make Loadout
    'Make Loadout'
  );
  const addIgLoadout = (item) => {
    setIgLoadoutState({
      ...igLoadoutState,
      [Object.keys(igLoadoutState).length]: {},
    });
    setActiveIgLoadoutCard(Object.keys(igLoadoutState).length);
    toggleIgLoadoutForm(Object.keys(igLoadoutState).length);
  }
  const editIgLoadout = ({productLink, imageLink, productName}) => {
    setIgLoadoutState({
      ...igLoadoutState,
      [activeIgLoadoutCard]: {
        ...igLoadoutState[activeIgLoadoutCard],
        productLink: productLink || igLoadoutState[activeIgLoadoutCard].productLink,
        imageLink: imageLink || igLoadoutState[activeIgLoadoutCard].imageLink,
        productName: productName || igLoadoutState[activeIgLoadoutCard].productName,
      },
    });
  }
  const deleteIgLoadout = () => {
    const newLoadout = {};
    for (let i = 0; i < Object.keys(igLoadoutState).length; i++) {
      if (i < activeIgLoadoutCard){
        newLoadout[i] = igLoadoutState[i];
      } else if (i > activeIgLoadoutCard) {
        newLoadout[i-1] = igLoadoutState[i];
      }
    }
    console.log('deleteIgLoadout newLoadout', newLoadout);
    setIgLoadoutState(newLoadout);
  }
  const queryGoogle = (text) => {
    if (!text) {
      setGoogleResults(null);
    } else {
      axiosInstanceGoogle.get(`v1?&q=${text}&num=10`)
      .then(response => {
        if (response.data.items) {
          setGoogleResults(response.data.items);
        }
      })
    }
  }
  const toggleIgLoadoutForm = (id) => {
    setActiveIgLoadoutCard(id);
    setIgLoadoutFormState(!igLoadoutFormOpen);
  };
  const closeIgLoadoutForm = () => {
    setIgLoadoutFormState(!igLoadoutFormOpen);
    setIdFormOpen(false);
  }

  const setDisplay = (mode) => {
    console.log('setDisplay', mode);
    mixpanel.track(
      'Action',
      {"toggle": `setDisplay`}
    );
    setDisplayState(mode)
  }

  const getLoadout = () => {
    setIgLoadoutIdState(loadoutsId);
    axiosInstance.get(`/${loadoutsId}`)
    .then(response => {
      if (response.data.items) {
        updateNumMods(Object.keys(response.data.items).length - 1)
        console.log('updateNumMods', numMods)
        setIgLoadoutState(response.data.items);
      }
    })
  }
  if (loadoutsId.length > 0 && igLoadoutIdState !== loadoutsId) {
    setDisplayState('igLoadout');
    getLoadout();
  }
  const [takenId, setTakenId] = useState('');
  const [idFormOpen, setIdFormOpen] = useState(false);
  const submitLoadout = (id) => {
    console.log('submitLoadout', id);
    axiosInstance.get(`/${id}`)
    .then(response => {
      if (response._id === id) {
        setTakenId(id);
      } else {
        console.log('submitLoadout post', id, igLoadoutState);
        axiosInstance.post(`/make`, {
          _id: id,
          items: igLoadoutState,
        })
        .then(response => {
          setIgLoadoutIdState(id);
          window.location.assign(`${process.env.REACT_APP_URL}/${id}`);
        })
      }
    })
  }

  return (
    <div className="App" >
      <MenuBar
        numMods={numMods}
        updateNumMods={updateNumMods}
        setDisplay={setDisplay}
        displayState={displayState}
        submitLoadout={submitLoadout}
        setIdFormOpen={setIdFormOpen}
        toggleIgLoadoutForm={toggleIgLoadoutForm}
        mixpanel={mixpanel}
      />
    { displayState === 'igLoadout' &&
      <div ref={capture}>
        <IgLoadout
          igLoadoutState={igLoadoutState}
          setIgLoadoutState={setIgLoadoutState}
          numCards={numMods}
          colorScheme={colorScheme}
          displayState={displayState}
          screenWidth={width}
          height={height}
        />
    </div> }
    { displayState === 'Make Loadout' &&
      <div ref={capture}>
        <IgLoadout
          igLoadoutState={igLoadoutState}
          setIgLoadoutState={setIgLoadoutState}
          numCards={numMods}
          colorScheme={colorScheme}
          toggleIgLoadoutForm={toggleIgLoadoutForm}
          displayState={displayState}
          screenWidth={width}
        />
        <IgLoadoutForm
          igLoadoutFormOpen={igLoadoutFormOpen}
          toggleIgLoadoutForm={toggleIgLoadoutForm}
          mixpanel={mixpanel}
          queryGoogle={queryGoogle}
          googleResults={googleResults}
          addIgLoadout={addIgLoadout}
          idFormOpen={idFormOpen}
          setIdFormOpen={setIdFormOpen}
          submitLoadout={submitLoadout}
          igLoadoutState={igLoadoutState}
          activeIgLoadoutCard={activeIgLoadoutCard}
          editIgLoadout={editIgLoadout}
          deleteIgLoadout={deleteIgLoadout}
          closeIgLoadoutForm={closeIgLoadoutForm}
        />
      </div>
    }
    <FloatingNav
      addIgLoadout={addIgLoadout}
      setIdFormOpen={setIdFormOpen}
      toggleIgLoadoutForm={toggleIgLoadoutForm}
      />
    </div>

  );
}

export default App;
