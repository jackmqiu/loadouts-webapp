
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Color from 'color';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import SearchIcon from '@material-ui/icons/Search';

const heightGuide = {
  1: 0.95,
  2: 0.9,
  3: 0.85,
}

const useStyles = makeStyles(() => ({

  card: ({ color, height, screenWidth, rows }) => ({
    width: '100%',
    height: screenWidth*height/12*heightGuide[rows],
    borderRadius: 8,
    boxShadow: 'none',
    // position: 'relative',
    backgroundColor: color,
    // '&:hover': {
    //   boxShadow: `0 6px 12px 0 ${Color('#fff')
    //     .rotate(-12)
    //     .darken(0.2)
    //     .fade(0.5)}`,
    // },
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
  icon: {
    marginTop: '50%'
  }
}));

const LoadoutCard = ({
  itemDetails,
  color,
  toggleIgLoadoutForm,
  id,
  displayState,
  height,
  screenWidth,
  rows,
}) => {
  console.log(rows)
  const classes = useStyles({color, height, screenWidth, rows});
  return (
    <div>
      { (itemDetails && displayState === 'igLoadout') &&
        <Card className={classes.card} onClick={()=> {window.open(itemDetails.productLink, '_blank')}}>
          <CardActionArea className={classes.cardActionArea}>
            <img className={classes.modImg} src={itemDetails.imageLink} />
          </CardActionArea>
        </Card>
      }
      { (itemDetails && displayState === 'Make Loadout') &&
        <Card className={classes.card} onClick={() => toggleIgLoadoutForm(id)}>
          <CardActionArea className={classes.cardActionArea}>
            <img className={classes.modImg} src={itemDetails.imageLink} />
          </CardActionArea>
        </Card>
      }
      {
        !itemDetails &&
        <Card className={classes.card} onClick={() => toggleIgLoadoutForm(id)}>
          <SearchIcon className={classes.icon} fontSize='large'/>
        </Card>
      }
    </div>
  );
};

export default LoadoutCard;
