import { useState } from 'react';
import ReactGA from 'react-ga';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import {
  Select,
  Button,
  NativeSelect,
  FormControl,
  FormHelperText,
  InputLabel,
  Drawer,
  Typography,
  TextField,
} from '@material-ui/core';


const TRACKING_ID = "UA-193462319-2";
ReactGA.initialize(TRACKING_ID);

const useStyles = makeStyles({
  root: {
  },
  formControl: {
    margin: '1rem',
    minWidth: 120,
  },
  formTitle: {
    margin: 2,
  },
  select: {
    margin: '0px 5px 0px 5px',
  },
  textField: {
    marginBottom: 10,
    marginLeft: 5,
  }
});

const DrawerContainer = ({
  mixpanel,
  toggleMoreDrawer,
  moreDrawer,
}) => {

  const classes = useStyles();
  return (
    <Drawer className={classes.root} anchor={'bottom'} open={moreDrawer} onClose={() => {toggleMoreDrawer(false)}}>
      <Typography className={classes.formTitle}> Share </Typography>

    </Drawer>
  )}

  export default DrawerContainer;
