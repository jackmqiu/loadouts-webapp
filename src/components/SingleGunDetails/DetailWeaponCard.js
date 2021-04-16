import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Color from 'color';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Image from '../../Img/gun_image_1.png';
import { useCoverCardMediaStyles } from '@mui-treasury/styles/cardMedia/cover';
import { Column, Row, Item } from '@mui-treasury/components/flex';
import backgroundImage from '../../Img/dotted_background.png';
import KeyTable from '../../KeyTable.js';
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
} from '../../Img';
import { useWideCardMediaStyles } from '@mui-treasury/styles/cardMedia/wide';

const gunImageTable = {
  'AK-47': ak47,
  '1911': nineteenEleven,
  'MAC-10': mac10,
  MP5: mp5,
  MP7: mp7,
  'KRISS Vector': krissVector,
  'AK-47': ak47,
  'FN-SCAR': fnScar,
  M4: ar15,
  M16: ar15,
  'AR-15': ar15,
  Glock: glock,
  Sig: sig,
  Beretta: beretta,
  'Desert Eagle': desertEagle,
  'AAP-01': aap01,
}

const useStyles = makeStyles(() => ({
  root: {
    width: 'auto',
    height: 210,
    borderRadius: 8,
    boxShadow: 'none',
    position: 'relative',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    '&:hover': {
      boxShadow: `0 6px 12px 0 ${Color(.5)
        .rotate(-12)
        .darken(0.2)
        .fade(0.5)}`,
    },
  },
  weaponStatus: {
    fontSize: '0.75rem',
    color: '#4F8A99',
  },
  weaponClass: {
    fontSize: '1rem',
    color: '#4F8A99',
    height: 20,
    bottom: 0,
    left: 0,
    position: 'absolute',
    margin: 2,
  },
  weaponName: {
    margin: 2,
    fontSize: '1rem',
    color: '#fff',
    height: 20,
    textAlign: 'left',
  },
  weaponItem: {
    display: 'block'
  },
  mediaContainer: {
    height: 150,
  },
  assaultImg: {
    padding: '0px auto 0px auto',
    maxWidth: '60%',
    display: 'flex',
    maxHeight: 150,
  },
  pistolImg: {
    padding: '0px 60px 0px 60px',
    maxWidth: '100%',
    display: 'flex',
    maxHeight: 150,
  },
  smgImg: {
    padding: '0px 60px 0px 60px',
    maxWidth: '100%',
    display: 'flex',
    maxHeight: 150,
  },
}));

export default function WeaponCard({gun, toggleDrawer}) {
  const classes = useStyles();
  const wideCardMediaStyles = useWideCardMediaStyles();

  return (
    <Card className={classes.root} onClick={() => {toggleDrawer('primary')}}>
      <Typography variant={'h2'} className={classes.weaponName}>{gun.gunName}</Typography>
      <div className={classes.mediaContainer}>
        <img src={gunImageTable[gun.gunName]} height='100%'/>
      </div>
        <Typography variant={'h2'} className={classes.weaponClass}>Loadouts.me</Typography>
    </Card>
  );
}
