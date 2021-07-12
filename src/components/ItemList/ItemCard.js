import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles(() => ({

  card: ({ color, shortCard, firstCard }) => ({
    width: '100%',
    // height: shortCard ? 265 : 265,
    minHeight: 200,
    borderRadius: 8,
    boxShadow: 'none',
    marginBottom: 10,
    // position: 'relative',
    backgroundColor: '#1b2a4a',
    // '&:hover': {
    //   boxShadow: `0 6px 12px 0 ${Color('#fff')
    //     .rotate(-12)
    //     .darken(0.2)
    //     .fade(0.5)}`,
    // },
  }),
  addDescriptionCard: ({ color }) => ({
    borderRadius: 8,
    border: 'solid #1b2a4a',
    marginBottom: 10,
    minHeight: 100,
  }),
  addItemCard: ({ color }) => ({
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#1b2a4a',
    boxShadow: 'none',
    minHeight: 50,
    textColor: 'white',
  }),
  addDescriptionText: {
    color: '#1b2a4a',
    fontWeight: 'bold',
  },
  addItemText: {
    color: 'white',
    fontWeight: 'bold',
  },
  descriptionInput: {
    color: '#1b2a4a',
    fontWeight: 'bold',
    margin: 10,
    textWrap: 'wrap',
  },
  cardActionArea: {
    width: '100%',
    height: '100%',
  },
  cardTitle: {
    height: 40,
    overflow: 'hidden',
    textWrap: 'wrap',
    // position: 'absolute',
    // top: 10,
    // left: 0,
    color: 'white',
    fontWeight: 'bold',
    marginRight: 8,
    marginLeft: 8,
    marginTop: 10,
    marginBottom: 10,
  },
  imageArea: ({ screenWidth }) => ({
    backgroundColor: 'white',
    height: (screenWidth-30)/2,
    // marginTop: 5,
    paddingTop: 10,
  }),
  modImg: {
    marginLeft: 'auto',
    marginRight: 'auto',
    // maxWidth: 135,
    objectFit: 'contain',
    // height: '100%',
    maxWidth: '100%',
  },
  cardSubtitle: {
    height: 20,
    overflow: 'hidden',
    textWrap: 'wrap',
    position: 'absolute',
    bottom: 65,
    left: 0,
    marginRight: 10,
    marginLeft: 10,
  },
  addDescriptionIcon: {
    marginTop: '11%',
    color: '#1b2a4a',
  },
  addItemIcon: {
    // marginTop: '5%',
    color: 'white',
    marginBottom: '10%',
  },
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
  screenWidth,
  igLoadoutState,
  addDescription,
}) => {
  const classes = useStyles({ color, shortCard, firstCard, screenWidth });
  const [descriptionEdit, toggleDescriptionEdit] = useState(false);
  const [descriptionText, setDescriptionText] = useState('');
  const handleDescriptionTextChange = (event) => {
    setDescriptionText(event.target.value);
  }
  const handleTextFieldSubmit = (event) => {
    if (event.key === 'Enter') {
      mixpanel.track(
        'Action',
        {"submitDescription": `${descriptionText}`}
      );
      addDescription(descriptionText, id);
      event.preventDefault();
    }
  }
  const track = (action) => {
    mixpanel.track(
      'Action',
      {"ItemList-ItemCard": `${action}`}
    );
  }
  return (
    <div>
    { cardInfo && cardInfo.productLink && canEdit && // making loadout card
      <Card className={classes.card} onClick={() => {toggleIgLoadoutForm(id); track('edit')}}>
        <CardActionArea className={classes.cardActionArea}>
            <div className={classes.imageArea}>
              <img alt='' className={classes.modImg} src={cardInfo.imageLink} />
            </div>
          <Typography className={classes.cardSubtitle} variant='subtitle2'>{cardInfo.productLink.split('/')[2]}</Typography>
          <Typography className={classes.cardTitle} variant='subtitle2'>{cardInfo.productName}</Typography>
        </CardActionArea>
      </Card>
    }
    { cardInfo && cardInfo.productLink && !canEdit && // to product link
      <Card className={classes.card} onClick={()=> {window.open(cardInfo.productLink, '_blank'); track(cardInfo.productLink)}}>
        <CardActionArea className={classes.cardActionArea}>
          <Typography className={classes.cardTitle} variant='subtitle2'>{cardInfo.productName}</Typography>
          <div className={classes.imageArea}>
            <img alt='' className={classes.modImg} src={cardInfo.imageLink} />
          </div>
          <Typography className={classes.cardSubtitle} variant='subtitle2'>{cardInfo.productLink.split('/')[2]}</Typography>
        </CardActionArea>
      </Card>
    }
    {
      cardInfo && cardInfo.text &&
      <div className={classes.addDescriptionCard} >
        <Typography className={classes.descriptionInput} align='left'>
          {cardInfo.text}
        </Typography>
      </div>
    }
    { !cardInfo && canEdit && // blank card
      <div>
        { Object.keys(igLoadoutState).length > 0 &&
          <div className={classes.addDescriptionCard} >
            { descriptionEdit ?
              <InputBase
                className={classes.descriptionInput}
                defaultValue=""
                multiline={true}
                autoFocus={true}
                onChange={handleDescriptionTextChange}
                onKeyPress={handleTextFieldSubmit}
              />
              :
              <CardActionArea className={classes.cardActionArea} onClick={() => toggleDescriptionEdit(!descriptionEdit)}>
                <Typography className={classes.addDescriptionText}>
                  Add Description
                </Typography>
                <AddBoxIcon className={classes.addDescriptionIcon}/>
              </CardActionArea>
            }
          </div>
        }
        <Card className={classes.addItemCard} onClick={() => toggleIgLoadoutForm(id)}>
          <CardActionArea className={classes.cardActionArea}>
            <Typography className={classes.addItemText}> Add Item </Typography>
            <AddBoxIcon className={classes.addItemIcon}/>
          </CardActionArea>
        </Card>
      </div>
    }
    </div>
  )
}

export default ItemCard;
