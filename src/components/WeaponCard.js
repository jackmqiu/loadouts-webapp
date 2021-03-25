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
  },
});

export default function WeaponCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>

      <Column>
        <Row>
          <Item position='left'> Primary Weapon </Item>
        </Row>
        <Row>
          <Item positon='left'> AK-47 </Item>
        </Row>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          image='https://i.imgur.com/P7p7MxW.png'
        />

        <Row>
          <Item> Assault Rifle </Item>
          <Item positon='right'> G & G </Item>
        </Row>
      </Column>
    </Card>
  );
}
