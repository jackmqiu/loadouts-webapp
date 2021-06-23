import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import AddBoxIcon from '@material-ui/icons/AddBox';

const useStyles = makeStyles(() => ({

  card: ({ color, shortCard, firstCard }) => ({
    width: '100%',
    height: shortCard ? 150 : 270,
    borderRadius: 8,
    boxShadow: 'none',
    marginBottom: 10,
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

const ItemCard = ({
  mixpanel,
  cardInfo,
  shortCard,
  color,
  toggleIgLoadoutForm,
  id,
  firstCard,
  canEdit,
}) => {
  const classes = useStyles({ color, shortCard, firstCard });
  const track = (action) => {
    mixpanel.track(
      'Action',
      {"ItemList-ItemCard": `${action}`}
    );
  }
  return (
    <div>
    { cardInfo && canEdit && // making loadout card
      <Card className={classes.card} onClick={() => {toggleIgLoadoutForm(id); track('edit')}}>
        <CardActionArea className={classes.cardActionArea}>
          <img alt='' className={classes.modImg} src={cardInfo.imageLink} />
        </CardActionArea>
      </Card>
    }
    { cardInfo && !canEdit && // to product link
      <Card className={classes.card} onClick={()=> {window.open(cardInfo.productLink, '_blank'); track(cardInfo.productLink)}}>
        <CardActionArea className={classes.cardActionArea}>
          <img alt='' className={classes.modImg} src={cardInfo.imageLink} />
        </CardActionArea>
      </Card>
    }
    { !cardInfo && canEdit && // blank card
      <Card className={classes.card} onClick={() => toggleIgLoadoutForm(id)}>
        <CardActionArea className={classes.cardActionArea}>
          <AddBoxIcon/>
        </CardActionArea>
      </Card>
    }
    </div>
  )
}

export default ItemCard;
