
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Color from 'color';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles(() => ({

  card: ({ color }) => ({
    width: '100%',
    height: 210,
    borderRadius: 8,
    boxShadow: 'none',
    // position: 'relative',
    backgroundColor: color,
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
  },
  modImg: {
    marginLeft: 'auto',
    marginRight: 'auto',
    // maxWidth: 135,
    objectFit: 'contain',
    height: '100%',
    maxWidth: '100%',
  },
}));

const LoadoutCard = ({ itemDetails, color }) => {
  const classes = useStyles({color});
  return (
      <Card className={classes.card} onClick={()=> {window.open(itemDetails.link, '_blank')}}>

          <CardActionArea className={classes.cardActionArea}>
            <img className={classes.modImg} src={itemDetails.image} />
          </CardActionArea>

      </Card>
  );
};

export default LoadoutCard;
