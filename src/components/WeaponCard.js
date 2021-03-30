import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Image from '../Img/gun_image_1.png';
import { useCoverCardMediaStyles } from '@mui-treasury/styles/cardMedia/cover';
import { Column, Row, Item } from '@mui-treasury/components/flex';
import backgroundImage from '../Img/dotted_background.png';
import {
  ak47,
  nineteenEleven,
  mac10,
  mp5,
  mp7,
  krissVector,
  fnScar,
  m4,
  glock,
  sig,
  beretta,
  desertEagle
} from '../Img';
import { useWideCardMediaStyles } from '@mui-treasury/styles/cardMedia/wide';

const gunImageTable = {
  ak47: ak47,
  '1911': nineteenEleven,
  'MAC-10': mac10,
  MP5: mp5,
  MP7: mp7,
  'KRISS Vector': krissVector,
  'AK-47': ak47,
  'SCAR-17': fnScar,
  M4: m4,
  Glock: glock,
  Sig: sig,
  Beretta: beretta,
  'Desert Eagle': desertEagle,
}

const useStyles = makeStyles({
  root: {
    width: 200,
    height: 110,
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: '200px 200px',
    backgroundColor: 'transparent',
    margin: 5,
  },
  weaponStatus: {
    fontSize: '0.75rem',
    color: '#4F8A99',
  },
  weaponClass: {
    fontSize: '0.75rem',
    color: '#727676',
  },
  weaponItem: {
    display: 'block'
  },
  weaponImg: {
    padding: '0px 20px 0px 20px',
    maxWidth: '100%',
    display: 'flex',
    maxHeight: 50,
  },
  pistolImg: {
    padding: '0px 60px 0px 60px',
    maxWidth: '100%',
    display: 'flex',
    maxHeight: 50,
  }

});

export default function WeaponCard({gun, toggleDrawer, weaponSelection}) {
  const classes = useStyles();
  const wideCardMediaStyles = useWideCardMediaStyles();
  console.log('gun.gunimage', gun.gunImage);

  return (
    <Card className={classes.root} onClick={() => {toggleDrawer(weaponSelection)}}>

      <Column gap={.5}>
        <Row >
          <Item position='left'>
            <div className={classes.weaponStatus}>Primary Weapon</div>
          </Item>
        </Row>
        <Row gap={'inherit'}>
          <Item positon='left'>
            <div className={classes.weaponClass}>{gun.gunName}</div>
          </Item>
        </Row>
        <Row>
          <Item className={classes.pistolImg}>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              image={gunImageTable[gun.gunName]}
            />
          </Item>
        </Row>
        <Row position={'bottom'}>
          <Item>
            <div className={classes.weaponClass}>{gun.class}</div>
          </Item>
          <Item position='right'>
            <div className={classes.weaponClass}>{gun.manufacturer}</div>
          </Item>
        </Row>
      </Column>
    </Card>
  );
}
