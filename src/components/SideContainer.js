import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import LoadoutContainer from './LoadoutContainer.js';

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary">
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Loadouts
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  leftContainer: {
    padding: theme.spacing(10, 2),
    marginRight: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}));

export default function SideContainer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      <Container component="main" className={classes.main} maxWidth="sm">

      </Container>
      <leftContainer className={classes.leftContainer}>
        <Container maxWidth="sm">
          <Typography variant="body1">Loadout</Typography>
          <LoadoutContainer/>
        </Container>
      </leftContainer>
    </div>
  );
}
