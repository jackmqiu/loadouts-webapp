
import './App.css';
import MainContainer from './components/MainContainer.js';
import MenuBar from './components/MenuBar.js';
import DrawerContainer from './components/DrawerContainer.js';
import SingleGunDetails from './components/SingleGunDetails';
import IgLoadout from './components/igLoadout';
import React, { useState, useEffect, createRef, useRef } from "react";
import { makeStyles } from '@material-ui/core/styles';
import ReactGA from 'react-ga';
import { Column, Row, Item } from '@mui-treasury/components/flex';
import ImageUploading from 'react-images-uploading';
import { useScreenshot, createFileName } from 'use-react-screenshot';

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
  const classes = useStyles();
  const capture = createRef(null);
  const [image, takeScreenshot] = useScreenshot();
  const [backImage, uploadBackImage] = useState(null);
  const [images, setImages] = useState([]);
  const [numMods, updateNumMods] = useState(5);
  const { height, width } = useWindowDimensions();

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
  const [modsState, setModsState] = useState({
    1: {
      category: 'Internals',
      active: false,
      model: '',
    },
    2: {
      category: 'Light',
      active: false,
      model: '',
    },
    3: {
      category: 'Stock',
      active: false,
      model: '',
    },
    4: {
      category: 'Tracer',
      active: false,
      model: '',
    },
    5: {
      category: 'Rail',
      active: false,
      model: '',
    },
    6: {
      category: 'Select',
      active: false,
      model: '',
    },
    7: {
      category: 'Select',
      active: false,
      model: '',
    },
    8: {
      category: 'Select',
      active: false,
      model: '',
    },
    9: {
      category: 'Select',
      active: false,
      model: '',
    },
  });
  const [igLoadoutState, setIgLoadoutState] = useState({
    0: {
      importance: 5,
      name: 'M4',
      link: 'https://www.vipertech.com.tw/products_pf.php?num=346',
      model: 'Viper Tech RAS GBB M4A1',
      image: 'https://i.imgur.com/7teSCs6.png',
    },
    1: {
      importance: 3,
      name: 'Light',
      link: 'https://www.surefire.com/products/illumination/weapon-lights/m622u-scout-light-weaponlight/',
      model: 'M622U Scout Light',
      image: 'https://i.imgur.com/u8zDTlm.png',
    },
    2: {
      importance: 1,
      name: 'Grip',
      link: 'https://magpul.com/catalog/product/view/id/5443/s/moe-k2-plus-grip-ar15-m4/category/42/?mp_global_color=118',
      model: 'MOE K2',
      image: 'https://i.imgur.com/jd3oJbi.png',
    },
    3: {
      importance: 6,
      name: 'Optic',
      link: 'http://shop.kic.tw/portal_c1_cnt_page.php?owner_num=c1_33589&button_num=c1&folder_id=7631&cnt_id=85926',
      model: 'Hurricane XPS3 Holosight',
      image: 'https://i.imgur.com/KGSsudM.png',
    },
    4: {
      importance: 2,
      name: 'Sling',
      link: 'https://www.vikingtactics.com/product-p/vtac-mk2.htm',
      model: 'VTAC MK2',
      image: 'https://i.imgur.com/q70DxA5.png',
    },
    5: {
      importance: 3,
      name: 'Sling Mount',
      link: 'https://magpul.com/firearm-accessories/slings/mounts/asap-ambidextrous-sling-attachment-point.html?mp_global_color=118',
      model: ' Magpul ASAP Sling Mount',
      image: 'https://i.imgur.com/JB6MJ2M.png',
    },
    6: {
      importance: 7,
      name: 'Rail',
      link: 'https://danieldefense.com/m4a1-fsp-risii-black.html',
      model: 'Daniel Defense FSP RIS II rail',
      image: 'https://i.imgur.com/pVEfOJj.png',
    },
    7: {
      importance: 6,
      name: 'Laser',
      link: 'http://www.fma.hk/la5-c-c-7_57.html',
      model: 'PEQ FMA LA5-C',
      image: 'https://i.imgur.com/0vUHUvr.png',
    },
    8: {
      importance: 1,
      name: 'Fore Grip',
      link: 'https://tangodown.com/tangodown-vertical-fore-grip-stubby/',
      model: 'TangoDown Vertical Fore Grip Stubby',
      image: 'https://i.imgur.com/EPuMD3i.png',
    },
  });
  const setMod = (modField, modCategory, modModel) => {
    if (modCategory && modModel.length > 0) {
      setModsState({
        ...modsState,
        [modField]: {
          category: modCategory,
          active: true,
          model: modModel,
        }
      });
    } else if (modCategory && modModel.length === 0) {
      setModsState({
        ...modsState,
        [modField]: {
          category: modCategory,
          active: false,
          model: modModel,
        }
      })
    }
  };
  const [drawerState, toggleDrawerState] = useState({
    open: false,
    weaponSelection: 'primary',
  });
  const [detailsState, toggleDetailsState] = useState({ //details vs loadouts
    display: true,
  })

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
  const toggleDetails = () => {
    mixpanel.track(
      'Action',
      {"toggle": `toggleDetails`}
    );
    toggleDetailsState({
      display: !detailsState.display
    })
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

  return (
    <div className="App" >
      <MenuBar
        numMods={numMods}
        updateNumMods={updateNumMods}
        toggleDetails={toggleDetails}
        detailsState={detailsState}
        getImage={getImage}
        mixpanel={mixpanel}
      />
    { detailsState.display ?
      <div ref={capture} className={classes.singleGunDetailsContainer}>
        <SingleGunDetails
          modsState={modsState}
          toggleDrawer={toggleDrawer}
          gun={loadoutState.primary}
          setMod={setMod}
          mixpanel={mixpanel}
          getImage={getImage}
          numMods={numMods}
        />
    </div> :
    <IgLoadout
      igLoadoutState={igLoadoutState}
      setIgLoadoutState={setIgLoadoutState}
      numCards={numMods}
    />
}
        {/* <div>
           <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={1}
            dataURLKey="data_url"
           >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              // write your building UI
              <div>
              <div className={classes.mainContainer} ref={capture}>
                <MainContainer loadoutState={loadoutState} toggleDrawer={toggleDrawer} backImage={imageList[0]} />
              </div>
              <div className="upload__image-wrapper">
                <Button
                  className={classes.button}
                  variant='contained'
                  color='Primary'
                  style={isDragging ? { color: 'red' } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Add Your Image
                </Button>
                &nbsp;
                <Button className={classes.button} color='Secondary' variant='contained' onClick={onImageRemoveAll}>Remove Image</Button>
                <Button className={classes.exportButton} variant='contained' onClick={getImage}>
                  Export
                </Button>
              </div>
              </div>
            )}
          </ImageUploading>

          <Typography>
          1. Upload your own picture by clicking Click to Add


          </Typography>
        <Typography>
          2. Click the loadout graphics to edit the backgroundSize
        </Typography>
        <Typography>
          3. Export and enjoy!
        </Typography>
      </div>
    }*/}
    <DrawerContainer
     loadoutState={loadoutState}
     setLoadoutState={setLoadoutState}
     drawerState={drawerState}
     toggleDrawer={toggleDrawer}
     mixpanel={mixpanel}
    />
    </div>

  );
}

export default App;
