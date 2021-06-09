
import './App.css';
import MenuBar from './components/MenuBar.js';
import IgLoadout from './components/igLoadout';
import FloatingNav from './components/FloatingNav';
import React, { useState, createRef, useEffect } from "react";
import ReactGA from 'react-ga';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import useWindowDimensions from './useWindowDimensions';
import IgLoadoutForm from './components/igLoadoutForm';
import Feed from './components/Feed';
import ItemList from './components/ItemList';
import {
  hashtagTable,
} from './constants';
import {
  Switch,
  Route,
  Link,
} from "react-router-dom";
import {
  NewLoadoutForm
} from './components/Forms';

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
  const { height, width } = useWindowDimensions();
  const [colorScheme, setColorScheme] = useState({
    0: '#FDF0A6',
    1: '#87CEEB',
    2: '#DCDCDB',
  })
  const [igLoadoutState, setIgLoadoutState] = useState({});
  const [activeIgLoadoutCard, setActiveIgLoadoutCard] = useState(0);
  const [googleResults, setGoogleResults] = useState(null);
  const [displayState, setDisplayState] = useState(
    //Gun Details
    //Overlay Loadout
    //igLoadout
    //Make Loadout
    // 'Make Loadout'
    'feed'
  );
  const [loadoutCategory, setLoadoutCategory] = useState(
    process.env.REACT_APP_ENV === 'LOCAL' ? 'airsoft' : window.location.host.split('.')[0]
  );
  const [feedLoadouts, setFeedLoadouts] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(window.pageYOffset);
  const [floatingNavDisplay, setFloatingNavDisplay] = useState(true);
  const [loadoutName, setLoadoutName] = useState('New Loadout');
  const [loadoutHashtags, setLoadoutHashtags] = useState(hashtagTable);
  const [newLoadoutFormOpen, setNewLoadoutFormOpen] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.onscroll = () => {
        if (window.pageYOffset > scrollPosition) {
          setFloatingNavDisplay(false);
        }
        if (window.pageYOffset < scrollPosition) {
          setFloatingNavDisplay(true);
        }
        setScrollPosition(window.pageYOffset);
      }
    }
  });
  const toggleNewLoadoutFormOpen = () => {
    setNewLoadoutFormOpen(!newLoadoutFormOpen);
  };
  const setLoadoutMetadata = (name, hashtags) => {
    setLoadoutName(name);
    setLoadoutHashtags(hashtags);
  }
  const addIgLoadoutItem = (item) => {
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
  const deleteIgLoadoutItem = () => {
    const newLoadout = {};
    for (let i = 0; i < Object.keys(igLoadoutState).length; i++) {
      if (i < activeIgLoadoutCard){
        newLoadout[i] = igLoadoutState[i];
      } else if (i > activeIgLoadoutCard) {
        newLoadout[i-1] = igLoadoutState[i];
      }
    }
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
    mixpanel.track(
      'Action',
      {"toggle": `setDisplay`}
    );
    setDisplayState(mode)
  }
  const getFeed = () => {
    console.log('getFeed')
    // axiosInstance.get(`/feed/${loadoutCategory}`)
    axiosInstance.get('/feed/airsoft')
    .then(response => {
      if (response.data[0]) {
        setFeedLoadouts(response.data);
      }
    })
  }
  useEffect(() => { // getting feed on ComponentDidMount
    getFeed();
  }, []);
  const getLoadout = () => {
    setIgLoadoutIdState(loadoutsId);
    axiosInstance.get(`/${loadoutsId}`)
    .then(response => {
      if (response.data.items) {
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
    axiosInstance.get(`/${id}`)
    .then(response => {
      if (response._id === id) {
        setTakenId(id);
      } else {
        axiosInstance.post(`/make`, {
          _id: id,
          category: loadoutCategory,
          items: igLoadoutState,
        })
        .then(response => {
          setIgLoadoutIdState(id);
          window.location.assign(`${window.location.href.slice(0, -4)}${id}`);
        })
      }
    })
  }

  return (
    <div className="App" >
    <Switch>
      <Route path='/make'>
        <ItemList
          igLoadoutState={igLoadoutState}
          addIgLoadoutItem={addIgLoadoutItem}
          toggleIgLoadoutForm={toggleIgLoadoutForm}
          colorScheme={colorScheme}
          loadoutName={loadoutName}
          loadoutHashtags={loadoutHashtags[loadoutCategory]}
          toggleNewLoadoutFormOpen={toggleNewLoadoutFormOpen}
        />
        <IgLoadoutForm
          igLoadoutFormOpen={igLoadoutFormOpen}
          toggleIgLoadoutForm={toggleIgLoadoutForm}
          mixpanel={mixpanel}
          queryGoogle={queryGoogle}
          googleResults={googleResults}
          addIgLoadoutItem={addIgLoadoutItem}
          idFormOpen={idFormOpen}
          setIdFormOpen={setIdFormOpen}
          submitLoadout={submitLoadout}
          igLoadoutState={igLoadoutState}
          activeIgLoadoutCard={activeIgLoadoutCard}
          editIgLoadout={editIgLoadout}
          deleteIgLoadoutItem={deleteIgLoadoutItem}
          closeIgLoadoutForm={closeIgLoadoutForm}
        />
        <NewLoadoutForm
          setLoadoutName={setLoadoutName}
          mixpanel={mixpanel}
          toggleNewLoadoutFormOpen={toggleNewLoadoutFormOpen}
          newLoadoutFormOpen={newLoadoutFormOpen}
          loadoutHashtags={loadoutHashtags}
          setLoadoutHashtags={setLoadoutHashtags}
          loadoutCategory={loadoutCategory}
        />
      </Route>
      <Route path='/:id'>
        <IgLoadout
          igLoadoutState={igLoadoutState}
          setIgLoadoutState={setIgLoadoutState}
          colorScheme={colorScheme}
          displayState={displayState}
          screenWidth={width}
          height={height}
          />
      </Route>
      <Route path='/'>
        <Feed
          feedLoadouts={feedLoadouts}
          setIgLoadoutState={setIgLoadoutState}
          colorScheme={colorScheme}
          displayState={displayState}
          screenWidth={width}
          height={height}
        />
        <NewLoadoutForm
          setLoadoutName={setLoadoutName}
          mixpanel={mixpanel}
          toggleNewLoadoutFormOpen={toggleNewLoadoutFormOpen}
          newLoadoutFormOpen={newLoadoutFormOpen}
          loadoutHashtags={loadoutHashtags}
          setLoadoutHashtags={setLoadoutHashtags}
          loadoutCategory={loadoutCategory}
        />
      </Route>
  </Switch>
      <FloatingNav
        displayState={displayState}
        setDisplayState={setDisplayState}
        igLoadoutState={igLoadoutState}
        addIgLoadoutItem={addIgLoadoutItem}
        setIdFormOpen={setIdFormOpen}
        toggleIgLoadoutForm={toggleIgLoadoutForm}
        floatingNavDisplay={floatingNavDisplay}
        toggleNewLoadoutFormOpen={toggleNewLoadoutFormOpen}
        newLoadoutFormOpen={newLoadoutFormOpen}
      />

    </div>

  );
}

export default App;
