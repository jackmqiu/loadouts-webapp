
import './App.css';
import MenuBar from './components/MenuBar.js';
import IgLoadout from './components/igLoadout';
import React, { useState, useEffect, createRef, useRef } from "react";
import { makeStyles } from '@material-ui/core/styles';
import ReactGA from 'react-ga';
import { Column, Row, Item } from '@mui-treasury/components/flex';
import ImageUploading from 'react-images-uploading';
import { useScreenshot, createFileName } from 'use-react-screenshot';
import { useLocation } from "react-router-dom";
import axios from 'axios';

import {
  Select,
  Button,
  NativeSelect,
  FormControl,
  FormHelperText,
  InputLabel,
  Drawer,
  Typography,
} from '@material-ui/core';

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

const useStyles = makeStyles({
  mainContainer: {
    width: '900px',
    height: '600px',
    overflow: 'auto',
  },
  singleGunDetailsContainer: {
  },
  button: {
    margin: 5,
  },
  exportButton: {

  },
});

const App = () => {
  const loadoutsId = useLocation().pathname.substring(1);
  const classes = useStyles();
  const capture = createRef(null);
  const [image, takeScreenshot] = useScreenshot();
  const [backImage, uploadBackImage] = useState(null);
  const [images, setImages] = useState([]);
  const [igLoadoutIdState, setIgLoadoutIdState] = useState('');
  const [igLoadoutFormOpen, setIgLoadoutFormState] = useState(false);
  const [numMods, updateNumMods] = useState(3);
  const { height, width } = useWindowDimensions();
  const [colorScheme, setColorScheme] = useState({
    0: 'white',
    1: 'white',
    2: 'white',
  })
  const [loadoutState, setLoadoutState] = useState({
    primary: {
      gunName: 'AR-15',
      class: 'Rifle',
      manufacturer: 'G&G',
      gunCustomField: 'Vfc hk416',
    },
    secondary: {
      gunName: '1911',
      class: 'Pistol',
      manufacturer: 'Action Army',
      gunCustomField: '',
    },
  });
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
      [activeIgLoadoutCard]: {
        productLink: item.link,
        imageLink: item.pagemap.cse_image[0].src || item.pagemap.cse_thumbnail[0].src,
        productName: item.title,
      },
    });
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
  const [drawerState, toggleDrawerState] = useState({
    open: false,
    weaponSelection: 'primary',
  });
  const toggleDrawer = (weaponSelection) => {
    mixpanel.track(
      'Action',
      {"toggle": "toggleDrawer"}
    );
    toggleDrawerState({
      open: !drawerState.open,
      weaponSelection: weaponSelection, //primary or secondary
    });
  };
  const setDisplay = (mode) => {
    console.log('setDisplay', mode);
    mixpanel.track(
      'Action',
      {"toggle": `setDisplay`}
    );
    setDisplayState(mode)
  }
  const getImage = () => {
    mixpanel.track(
      'Download',
      {"download": "downloadLoadout"}
    );
    takeScreenshot(capture.current).then(download);
  }

  const download = (image, { name = "my_loadout1", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };
  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };
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
        getImage={getImage}
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
        />
      </div>
    }
    </div>

  );
}

export default App;
