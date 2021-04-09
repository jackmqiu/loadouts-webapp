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
import {
  ak47,
  nineteenEleven,
  mac10,
  mp5,
  mp7,
  krissVector,
  fnScar,
  m4,
  m16,
  ar15,
  glock,
  sig,
  beretta,
  desertEagle,
  aap01,
  grip,
  light,
  magazine,
  rail,
  scope,
  stock,
  trigger,
} from '../../Img';

const gunImageTable = {
  'AK-47': ak47,
  '1911': nineteenEleven,
  'MAC-10': mac10,
  MP5: mp5,
  MP7: mp7,
  'KRISS Vector': krissVector,
  'AK-47': ak47,
  'FN-SCAR': fnScar,
  M4: m4,
  M16: m16,
  'AR-15': ar15,
  Glock: glock,
  Sig: sig,
  Beretta: beretta,
  'Desert Eagle': desertEagle,
  'AAP-01': aap01,
  Grip: grip,
  Light: light,
  Magazine: magazine,
  Rail: rail,
  Optic: scope,
  Stock: stock,
  Trigger: trigger,
}

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

const ModCard = ({ partName, openModal, closeModal }) => {
  const classes = useStyles();
  const mediaStyles = useFourThreeCardMediaStyles();
  return (
    <CardActionArea onclassName={classes.actionArea}>
      <Card className={classes.card} onClick={openModal}>
        <CardMedia classes={mediaStyles} image={gunImageTable[partName]} />
        <CardContent className={classes.content}>
          <Typography className={classes.title} variant={'h2'}>
            {partName}
          </Typography>
          <Typography className={classes.subtitle}>{}</Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
};

export default ModCard;
