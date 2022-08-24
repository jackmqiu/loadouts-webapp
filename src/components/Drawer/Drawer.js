import { useState } from 'react';
import ReactGA from 'react-ga';
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import IconButton from '@mui/material/IconButton';
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
} from '@mui/material';


const TRACKING_ID = "UA-193462319-2";
ReactGA.initialize(TRACKING_ID);

const useStyles = makeStyles({
  root: {
    height: 200,
  },
  formTitle: {
    marginTop: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  drawerBody: {
    paddingLeft: '8%',
    paddingRight: '8%',
    marginTop: 50,
    marginBottom: 50,
  },
  textField: {
    marginBottom: 10,
    marginLeft: 5,
  },
  closeButton: {
    position: 'absolute',
    left: 10,
    top: 10,
  },
  copyButton: {
    marginRight: 0,
    marginTop: -4,
  }
});

const DrawerContainer = ({
  mixpanel,
  toggleMoreDrawer,
  moreDrawer,
}) => {

  const classes = useStyles();
  const [copied, setCopied] = useState(false);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(`loadouts.me/${moreDrawer}`);
    setCopied(true);
  };
  return (
    <Drawer
      PaperProps={{ style: {borderTopLeftRadius: 35, borderTopRightRadius: 35 }}}
      className={classes.root}
      anchor={'bottom'}
      open={moreDrawer}
      onClose={() => {toggleMoreDrawer(false)}}
    >
      <IconButton fontSize='large' className={classes.closeButton}>
        <CloseIcon/>
      </IconButton>
      <Typography variant='h6' className={classes.formTitle}> Options </Typography>
      <div>
        <Typography variant='h6' className={classes.drawerBody}>
          <IconButton fontSize='large' className={classes.copyButton} onClick={copyToClipboard}>
            <FileCopyIcon color={copied ? 'secondary' : 'primary'}/>
          </IconButton>
          loadouts.me/{moreDrawer}
        </Typography>
      </div>
    </Drawer>
  )}

  export default DrawerContainer;
