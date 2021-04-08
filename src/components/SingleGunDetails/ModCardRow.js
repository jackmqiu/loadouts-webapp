import React from 'react';
import Color from 'color';
import GoogleFont from 'react-google-font-loader';
import { makeStyles } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { useFourThreeCardMediaStyles } from '@mui-treasury/styles/cardMedia/fourThree';
import ModCard from './ModCard';

const useGridStyles = makeStyles(({ breakpoints }) => ({
  root: {
    [breakpoints.up('md')]: {
      justifyContent: 'center',
    },
  },
}));

const useStyles = makeStyles(() => ({
  actionArea: {
    borderRadius: 16,
    transition: '0.2s',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  card: ({ color }) => ({
    width: 210,
    borderRadius: 8,
    boxShadow: 'none',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    '&:hover': {
      boxShadow: `0 6px 12px 0 ${Color(color)
        .rotate(-12)
        .darken(0.2)
        .fade(0.5)}`,
    },
  }),
  content: ({ color }) => {
    return {
      backgroundColor: 'rgba(120, 128, 69, 0.5)',
      padding: '.5rem .5rem .5rem',
      opacity: .5,
    };
  },
  title: {
    fontSize: '1rem',
    color: '#fff',
    textAlign: 'left',
  },
  subtitle: {
    color: '#fff',
    opacity: 0.87,
    marginTop: '0.5rem',
    fontWeight: 500,
    fontSize: 14,
  },
}));



export const ModCardRow = React.memo(function SolidGameCard() {
  const gridStyles = useGridStyles();
  const styles = useStyles({ color: '#848f64' });
  const styles2 = useStyles({ color: '#848f64' });
  const styles3 = useStyles({ color: '#a4a69c' });
  const styles4 = useStyles({ color: '#848f64' });
  return (
    <>
      <Grid classes={gridStyles} container spacing={4} wrap={'nowrap'}>
        <Grid item>
          <ModCard
            classes={styles}
            partName={'Internals'}
          />
        </Grid>
        <Grid item>
          <ModCard
            classes={styles2}
            partName={'Light'}
          />
        </Grid>
        <Grid item>
          <ModCard
            classes={styles3}
            partName={'Stock'}
            image={'../../Img/AK-47'}
          />
        </Grid>
        <Grid item>
          <ModCard
            classes={styles4}
            partName={'Optic'}
          />
        </Grid>
      </Grid>
    </>
  );
});
export default ModCardRow
