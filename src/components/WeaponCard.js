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

const useStyles = makeStyles({
  root: {
    width: 200,
    height: 110,
    backgroundColor: '#141819'
  },
  weaponStatus: {
    fontSize: '0.75rem',
    color: '#4F8A99',
  },
  weaponClass: {
    fontSize: '0.75rem',
    color: '#727676',
  },
  weaponImg: {
    padding: '0px 20px 0px 20px',
    maxWidth: '100%',
    display: 'flex',
  }
});

export default function WeaponCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>

      <Column gap={.5}>
        <Row >
          <Item position='left'>
            <div className={classes.weaponStatus}>Primary Weapon</div>
          </Item>
        </Row>
        <Row gap={'inherit'}>
          <Item positon='left'>
            <div className={classes.weaponClass}>AK-47</div>
          </Item>
        </Row>
        <Row>
          <Item className={classes.weaponImg}>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              image='https://i.imgur.com/tWaWwc1.png'
            />
          </Item>
        </Row>
        <Row position={'bottom'}>
          <Item>
            <div className={classes.weaponClass}>Assault Rifle</div>
          </Item>
          <Item position='right'>
            <div className={classes.weaponClass}>G&G</div>
          </Item>
        </Row>
      </Column>
    </Card>
  );
}
