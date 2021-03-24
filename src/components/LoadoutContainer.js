import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

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
}));

export default function LoadoutContainer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      <Container component="main" className={classes.main} maxWidth="sm">
        LoadoutContainer
      </Container>

    </div>
  );
}
