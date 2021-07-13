
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import SearchIcon from '@material-ui/icons/Search';

const heightGuide = {
  1: 0.95,
  2: 0.9,
  3: 0.85,
}

const useStyles = makeStyles(() => ({

  card: ({ color, height, screenWidth, rows }) => ({
    width: '100%',
    // height: screenWidth*height/12*heightGuide[rows],
    borderRadius: 0,
    boxShadow: 'none',
    // position: 'relative',
    backgroundColor: 'white',
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
  const classes = useStyles({color, height, screenWidth, rows});
  if (itemDetails) {

    return (
          <Card className={classes.card} >
              <img alt='' className={classes.modImg} src={itemDetails.imageLink} />
          </Card>
    );
  } else {
    return (
      <Card className={classes.card} >
        <img alt='' className={classes.modImg} src='https://i.imgur.com/Z7e0jjRm.jpg' />
      </Card>
    )
  }
};

export default LoadoutCard;
