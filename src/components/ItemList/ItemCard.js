import React, { useState } from 'react';
import Card from '@mui/material/Card';
import { makeStyles } from '@mui/styles';
import CardActionArea from '@mui/material/CardActionArea';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';

const useStyles = makeStyles(() => ({

  card: ({ color, shortCard, firstCard }) => ({
    width: '100%',
    // height: shortCard ? 265 : 265,
    minHeight: 200,
    // maxHeight: 300,
    borderRadius: 8,
    boxShadow: 'none',
    marginBottom: 10,
    // position: 'relative',
    backgroundColor: '#1b2a4a',
    // '&:hover': {
    //   boxShadow: `0 6px 12px 0 ${Color('#fff')
    //     .rotate(-12)
    //     .darken(0.2)
    //     .alpha(0.5)}`,
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
    margin: 10,
    lineHeight: 1.2,
  },
  addItemText: {
    color: 'white',
    fontWeight: 'bold',
  },
  descriptionInput: {
    color: '#1b2a4a',
    fontWeight: 'bold',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 4,
    marginBottom: 3,
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
    maxHeight: 320,
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
  addDescriptionButton: {
    color: 'white',
    backgroundColor: '#1b2a4a',
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
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
      toggleDescriptionEdit(!descriptionEdit);
      event.preventDefault();
    }
  }
  const handleSubmitDescription = () => {
    addDescription(descriptionText, id);
    toggleDescriptionEdit(!descriptionEdit);
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
          <div className={classes.imageArea}>
            <img alt='' className={classes.modImg} src={cardInfo.imageLink} />
          </div>
          <Typography className={classes.cardSubtitle} variant='subtitle2'>{cardInfo.productLink.split('/')[2]}</Typography>
          <Typography className={classes.cardTitle} variant='subtitle2'>{cardInfo.productName}</Typography>
        </CardActionArea>
      </Card>
    }
    {
      cardInfo && cardInfo.text &&
      <div className={classes.addDescriptionCard}>
        { descriptionEdit ?
          <InputBase
            className={classes.descriptionInput}
            defaultValue={descriptionText}
            multiline={true}
            autoFocus={true}
            onFocus={(e) =>
          		e.currentTarget.setSelectionRange(
          		e.currentTarget.value.length,
          		e.currentTarget.value.length
          	)}
            onChange={handleDescriptionTextChange}
            onKeyPress={handleTextFieldSubmit}
          />
          :
          <div onClick={() => toggleDescriptionEdit(!descriptionEdit)}>
            <Typography className={classes.addDescriptionText} align='left'>
              {cardInfo.text}
            </Typography>
          </div>
        }
      </div>
    }
    { !cardInfo && canEdit && // blank card
      <div>
        { Object.keys(igLoadoutState).length > 0 && //description Add box
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
            { descriptionText.length > 0 &&
              <Button disableRipple={true} disableFocusRipple={true} disableElevation={true} variant='containedSizeSmall' className={classes.addDescriptionButton} onClick={handleSubmitDescription}> Add </Button>
            }
          </div>
        }
        { descriptionText.length < 1 &&
          <Card className={classes.addItemCard} onClick={() => toggleIgLoadoutForm(id)}>
            <CardActionArea className={classes.cardActionArea}>
              <Typography className={classes.addItemText}> Add Item </Typography>
              <AddBoxIcon className={classes.addItemIcon}/>
            </CardActionArea>
          </Card>
        }
      </div>
    }
    </div>
  )
}

export default ItemCard;
