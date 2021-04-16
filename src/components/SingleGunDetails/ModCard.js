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
import { Column, Row, Item } from '@mui-treasury/components/flex';

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
  internals,
  receiver,
  tracer,
  barrel,
  sling,
  hpa,
  crate,
  laser,
  optics,
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
  Scope: scope,
  Stock: stock,
  Trigger: trigger,
  Internals: internals,
  Receiver: receiver,
  Tracer: tracer,
  Barrel: barrel,
  Sling: sling,
  HPA: hpa,
  Select: crate,
  Laser: laser,
  Optics: optics,
  Other: crate,
}

const useStyles = makeStyles(() => ({

  card: ({ color }) => ({
    width: '100%',
    height: 210,
    borderRadius: 8,
    margin: '5 0 5 0',
    boxShadow: 'none',
    position: 'relative',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    '&:hover': {
      boxShadow: `0 6px 12px 0 ${Color(color)
        .rotate(-12)
        .darken(0.2)
        .fade(0.5)}`,
    },
  }),
  cardActionArea: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  content: ({ color }) => {
    return {
      backgroundColor: 'rgba(120, 128, 69, 0.5)',
      padding: '.5rem .5rem .5rem .5rem',
      opacity: .5,
      height: 25,
      width: '100%',
      position: 'absolute',
      bottom: 0,
    };
  },
  title: {
    fontSize: '1rem',
    color: '#fff',
    textAlign: 'left',
    margin: 2,
    color: '#e1d862',
  },
  subtitle: {
    color: '#fff',
    opacity: 0.87,
    marginTop: '0.5rem',
    fontWeight: 500,
    fontSize: 14,
  },
  modImgItem: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxHeight: '100%',
    height: 100,
    maxWidth: 135,
    alignItems: 'center',
  },
  modImg: {
    height: 'auto',
    width: '100%',
  },
}));

const ModCard = ({ partName, modName, openModal, closeModal, id }) => {
  const classes = useStyles();
  return (
      <Card className={classes.card} onClick={() => {openModal(id)}}>
        <CardActionArea className={classes.cardActionArea}>
              <Item className={classes.modImgItem}>
                <img className={classes.modImg} component="img" src={gunImageTable[partName]} />
              </Item>
              <Typography className={classes.title} variant={'h3'}>
                {partName}
              </Typography>
          <Item>
            <div className={classes.content}>
              <Typography className={classes.subtitle}>{modName}</Typography>
            </div>
          </Item>
        </CardActionArea>
      </Card>
  );
};

export default ModCard;
