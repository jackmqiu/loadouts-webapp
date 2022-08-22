
import './App.css';
import React, { useState, createRef, useEffect } from "react";
import ReactGA from 'react-ga';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import { makeStyles } from '@mui/styles';

import useWindowDimensions from './useWindowDimensions';
import IgLoadoutForm from './components/igLoadoutForm';
import Feed from './components/Feed';
import ItemList from './components/ItemList';
import CategoryBar from './components/CategoryBar';
import DiscoverPage from './components/DiscoverPage';
import ProfilePage from './components/Profile';
import {
  hashtagTable,
  cseIDs,
  showHome,
  nonIDpaths,
  categoryByDomain,
} from './constants';
import {
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";
import Form from './components/Forms';
import MenuBar from './components/MenuBar.js';
import IgLoadout from './components/igLoadout';
import FloatingNav from './components/FloatingNav';
import Drawer from './components/Drawer';

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});
const useStyles = makeStyles(({ height }) => ({
  root: {
    backgroundColor: '#ECEFE9',
    minHeight: 700,
  },
}))
const TRACKING_ID = "UA-193462319-2";
ReactGA.initialize(TRACKING_ID);
ReactGA.pageview(window.location.pathname + window.location.search);
const mixpanel = require('mixpanel-browser');
mixpanel.init("fbbc7fb17f489f12483171381e8da3d2");

const App = (props) => {
  const loadoutsId = useLocation().pathname.substring(1);
  const capture = createRef(null);
  const [igLoadoutIdState, setIgLoadoutIdState] = useState('');
  const [igLoadoutFormOpen, setIgLoadoutFormState] = useState(false);
  const { height, width } = useWindowDimensions();
  const [colorScheme, setColorScheme] = useState({
    0: '#F614A0',
    1: '#14AEF6',
    2: '#BDBDBD',
    3: '#DCDCDB',
  })
  const [igLoadoutState, setIgLoadoutState] = useState({
    title: '',
    items: {},
    itemKeyTable: {},
    hashtags: { loadouts: true },
  });
  const [viewLoadoutState, setViewLoadoutState] = useState({
    title: '',
    items: {},
    hashtags: { loadouts: true },
  })
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
    categoryByDomain[window.location.host.split('.')[0]]
  );
  const [feedLoadouts, setFeedLoadouts] = useState([]);
  const [loadoutHashtags, setLoadoutHashtags] = useState(hashtagTable);
  const [newLoadoutFormOpen, setNewLoadoutFormOpen] = useState(false);
  const [discoverUI, setDiscoverUI] = useState({});
  const [moreDrawer, toggleMoreDrawer] = useState(false);


  const classes = useStyles({ height });
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  }
  useEffect(() => {
    if (props.location.pathname === '/') {
      getFeed();
    } else if (!nonIDpaths[props.location.pathname]) {
      setDisplayState('igLoadout');
      getLoadout();
    }
    if (props.location.pathname !== '/') {
      window.scrollTo(0, 0);
    }
  }, [props.location.pathname]);
  useEffect(() => {
    getUI();
  }, [])
  const axiosInstanceGoogle = axios.create({
    baseURL: 'https://www.googleapis.com/customsearch',
    params: {
      key: `${process.env.REACT_APP_GOOGLE_KEY}`,
      cx: `${cseIDs[loadoutCategory]}`,
    }
  })
  //TOGGLES
  const toggleNewLoadoutFormOpen = () => {
    setNewLoadoutFormOpen(!newLoadoutFormOpen);
  };

  const updateLoadoutMetadata = ({ loadoutName }) => {
    setIgLoadoutState({
      ...igLoadoutState,
      title: loadoutName,
      category: loadoutCategory,
      hashtags: loadoutHashtags[loadoutCategory],
    })
  }
  const addIgLoadoutItem = (item) => {
    setIgLoadoutState({
      ...igLoadoutState,
      itemKeyTable: {
        ...igLoadoutState.itemKeyTable,
        [Object.keys[igLoadoutState.itemKeyTable].length]: Object.keys(igLoadoutState.items).length,
      },
      items: {
        ...igLoadoutState.items,
        [Object.keys(igLoadoutState.items).length]: {},
      }
    });
    setActiveIgLoadoutCard(Object.keys(igLoadoutState).length);
    toggleIgLoadoutForm(Object.keys(igLoadoutState).length);
  }
  const editIgLoadout = ({productLink, imageLink, productName, tags}) => {
    setIgLoadoutState({
      ...igLoadoutState,
      itemKeyTable: {
        ...igLoadoutState.itemKeyTable,
        [Object.keys(igLoadoutState.itemKeyTable).length]: activeIgLoadoutCard,
      },
      items: {
        ...igLoadoutState.items,
        [activeIgLoadoutCard]: {
          ...igLoadoutState[activeIgLoadoutCard],
          productLink: productLink || igLoadoutState[activeIgLoadoutCard].productLink,
          imageLink: imageLink || igLoadoutState[activeIgLoadoutCard].imageLink,
          productName: productName || igLoadoutState[activeIgLoadoutCard].productName,
          tags: tags,
        },
      }
    });
  }
  const addDescription = (descriptionText, id) => {
    if (Object.keys(igLoadoutState.items).length === id) {
      setIgLoadoutState({
        ...igLoadoutState,
        items: {
          ...igLoadoutState.items,
          [Object.keys(igLoadoutState.items).length]: {
            text: descriptionText,
          },
        }
      });
      setActiveIgLoadoutCard(Object.keys(igLoadoutState.items).length);
    } else {
      editDescription(descriptionText, id);
    }
  }
  const editDescription = (descriptionText, id) => {
    setIgLoadoutState({
      ...igLoadoutState,
      items: {
        ...igLoadoutState.items,
        [id]: {
          text: descriptionText,
        },
      }
    });
  }
  const addComment = (comment, id) => {
    axiosInstance.put(`/comments/${id}`, {
      name: 'anonymous',
      comment: comment,
      avatar: null,
    })
    .then(response => {
    })
  }
  const sendLike = (id) => {
    axiosInstance.post(`/likes/${id}`)
    .then(response => {

    })
  }
  const deleteIgLoadoutItem = () => {
    const newLoadout = {};
    for (let i = 0; i < Object.keys(igLoadoutState.items).length; i++) {
      if (i < activeIgLoadoutCard){
        newLoadout[i] = igLoadoutState.items[i];
      } else if (i > activeIgLoadoutCard) {
        newLoadout[i-1] = igLoadoutState.items[i];
      }
    }
    setIgLoadoutState({
      ...igLoadoutState,
      items: newLoadout,
    });
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
  };
  const getUI = () => {
    axiosInstance.get(`/ui/discover/${loadoutCategory}`)
    .then(response => {
      setDiscoverUI(response.data.sections);
    })
  };
  const getFeed = () => {
    axiosInstance.get(`/feed/${loadoutCategory}`)
    // axiosInstance.get('/feed/airsoft')
    .then(response => {
      if (response.data[0]) {
        setFeedLoadouts(response.data);
      }
    })
  }

  const getLoadout = () => {
    axiosInstance.get(`/${loadoutsId}`)
    .then(response => {
      console.log('response', response);
      if (typeof(response.data) === 'object') {
        setViewLoadoutState(response.data);
      } else {
        setViewLoadoutState({
          title: 'Not Found',
          items: {},
          hashtags: {},
        })
      }
    })
  }
  // User data
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState(null); // DB data
  const [userMetadata, setUserMetadata] = useState(null); // Auth0 data

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = "loadoutsdotme.us.auth0.com";

      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        });

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const { user_metadata } = await metadataResponse.json();

        setUserMetadata(user_metadata);
      } catch (e) {
        console.log(e.message);
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);

  const getUser = () => {
    axiosInstance.get(`/users/${email}`)
    .then(response => {
      if (typeof(response.data) === 'object') {
          setUserData(response.data)
      } else {
        console.log('user not found')
      }
    })
  }

  const createUser = () => {
    axiosInstance.post(`/users/new`, {
      email: email,
    })
    .then(response => {
      if (typeof(response.data) === 'object') {
        setUserData(response.data)
      } else {
        console.log('user not made')
      }
    })
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
          ...igLoadoutState,
          _id: id,
        })
        .then(response => {
          setIgLoadoutIdState(id);
          console.log('make loaout response', response);
          window.location.assign(`${window.location.href.slice(0, -4)}${id}`);
        })
      }
    })
  }
  return (
    <div className="App">
      <div className={classes.root}>
        <Switch>
          <Route path='/profile'>
            <ProfilePage
              mixpanel={mixpanel}
              userData={userData}
              userMetadata={userMetadata}
              isAuthenticated={isAuthenticated}
              isLoading={isLoading}
            />
          </Route>
          <Route path='/discover'>
            <div>
              <DiscoverPage
                discoverUI={discoverUI}
                mixpanel={mixpanel}
              />
              <Form
                mixpanel={mixpanel}
                igLoadoutState={igLoadoutState}
                toggleNewLoadoutFormOpen={toggleNewLoadoutFormOpen}
                newLoadoutFormOpen={newLoadoutFormOpen}
                loadoutHashtags={loadoutHashtags}
                setLoadoutHashtags={setLoadoutHashtags}
                updateLoadoutMetadata={updateLoadoutMetadata}
                loadoutCategory={loadoutCategory}
                setLoadoutCategory={setLoadoutCategory}
              />
            </div>
          </Route>
          <Route path='/make'>
            <ItemList
              mixpanel={mixpanel}
              igLoadoutState={igLoadoutState}
              addIgLoadoutItem={addIgLoadoutItem}
              toggleIgLoadoutForm={toggleIgLoadoutForm}
              colorScheme={colorScheme}
              toggleNewLoadoutFormOpen={toggleNewLoadoutFormOpen}
              canEdit={true}
              loadoutCategory={loadoutCategory}
              screenWidth={width}
              toggleNewLoadoutFormOpen={toggleNewLoadoutFormOpen}
              newLoadoutFormOpen={newLoadoutFormOpen}
              loadoutHashtags={loadoutHashtags}
              setLoadoutHashtags={setLoadoutHashtags}
              updateLoadoutMetadata={updateLoadoutMetadata}
              setLoadoutCategory={setLoadoutCategory}
              addDescription={addDescription}
              editDescription={editDescription}
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
              height={height}
              width={width}
            />

          </Route>
          <Route path='/:id'>
            <ItemList
              mixpanel={mixpanel}
              igLoadoutState={viewLoadoutState}
              addIgLoadoutItem={addIgLoadoutItem}
              toggleIgLoadoutForm={toggleIgLoadoutForm}
              colorScheme={colorScheme}
              toggleNewLoadoutFormOpen={toggleNewLoadoutFormOpen}
              canEdit={false}
              loadoutCategory={loadoutCategory}
              screenWidth={width}
            />
          </Route>
          <Route path='/'>
            <div>
              <CategoryBar mixpanel={mixpanel} loadoutCategory={loadoutCategory} />
              <Feed
                feedLoadouts={feedLoadouts}
                setIgLoadoutState={setIgLoadoutState}
                colorScheme={colorScheme}
                displayState={displayState}
                screenWidth={width}
                height={height}
                scrollToTop={scrollToTop}
                toggleMoreDrawer={toggleMoreDrawer}
                addComment={addComment}
                sendLike={sendLike}
              />
            </div>
        </Route>
      </Switch>
      <FloatingNav
        mixpanel={mixpanel}
        displayState={displayState}
        setDisplayState={setDisplayState}
        igLoadoutState={igLoadoutState}
        addIgLoadoutItem={addIgLoadoutItem}
        setIdFormOpen={setIdFormOpen}
        toggleIgLoadoutForm={toggleIgLoadoutForm}
        toggleNewLoadoutFormOpen={toggleNewLoadoutFormOpen}
        newLoadoutFormOpen={newLoadoutFormOpen}
      />
      <Drawer
        mixpanel={mixpanel}
        toggleMoreDrawer={toggleMoreDrawer}
        moreDrawer={moreDrawer}
      >
      </Drawer>
    </div>
    </div>

  );
}

export default withRouter(App);
