
import './App.css';
import MainContainer from './components/MainContainer.js';
import MenuBar from './components/MenuBar.js';
import DrawerContainer from './components/DrawerContainer.js';
import React, { useState, useEffect, createRef, useRef } from "react";
import ImageUploader from 'react-images-upload';
import ImageUploading from 'react-images-uploading';


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
  const capture = createRef(null);
  const [image, takeScreenshot] = useScreenshot();
  const [backImage, uploadBackImage] = useState(null);
  const [images, setImages] = useState([]);
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
  const getImage = () => {
    takeScreenshot(capture.current).then(download);
    console.log('image', capture.current);
  }
  const onDrop = (picture) => {
    uploadBackImage(picture);
  }
  const download = (image, { name = "my_loadout1", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
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
      <MenuBar/>
       <DrawerContainer
        setClass={setClass}
        setGun={setGun}
        loadoutState={loadoutState}
        drawerState={drawerState}
        toggleDrawer={toggleDrawer}
      />
       <Button variant="contained" onClick={getImage}>Export</Button>
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
          <div ref={capture}>
            <MainContainer loadoutState={loadoutState} toggleDrawer={toggleDrawer} backImage={imageList[0]} />
          </div>
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            &nbsp;
            <button onClick={onImageRemoveAll}>Remove all images</button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          </div>
        )}
      </ImageUploading>
    </div>

  );
}

export default App;
