import React, { useState } from 'react';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import CardActionArea from '@mui/material/CardActionArea';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const styles = {
  card: ({ color, shortCard, firstCard }) => ({
    width: '100%',
    // height: shortCard ? 265 : 265,
    minHeight: 200,
    // maxHeight: 300,
    borderRadius: 8,
    boxShadow: 'none',
    marginBottom: 1,
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
    borderRadius: 1,
    border: '3px solid #1b2a4a',
    marginBottom: 1,
    minHeight: 100,
  }),
  addItemCard: ({ color }) => ({
    width: '100%',
    borderRadius: 1,
    backgroundColor: '#1b2a4a',
    boxShadow: 'none',
    minHeight: 50,
    textColor: 'white',
  }),
  addDescriptionText: {
    color: '#1b2a4a',
    fontWeight: 'bold',
    margin: 1,
    lineHeight: 1.2,
  },
  addItemText: {
    color: 'white',
    fontWeight: 'bold',
  },
  descriptionInput: {
    color: '#1b2a4a',
    fontWeight: 'bold',
    marginLeft: 1,
    marginRight: 1,
    marginTop: 0.5,
    marginBottom: "3px",
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
    marginRight: 1,
    marginLeft: 1,
    marginTop: 1,
    marginBottom: 1,
  },
  imageArea: ({ screenWidth }) => ({
    backgroundColor: 'white',
    height: (screenWidth-30)/2,
    maxHeight: 320,
    // marginTop: 5,
    paddingTop: 1,
  }),
  cardSubtitle: {
    height: 20,
    overflow: 'hidden',
    textWrap: 'wrap',
    position: 'absolute',
    bottom: 65,
    left: 0,
    marginRight: 1,
    marginLeft: 1,
  },
  addDescriptionIcon: {
    marginTop: '11%',
    color: '#1b2a4a',
  },
  addDescriptionButton: {
    color: 'white',
    backgroundColor: '#1b2a4a',
    fontWeight: 'bold',
    marginTop: 4,
    marginBottom: 1,
  },
  addItemIcon: {
    // marginTop: '5%',
    color: 'white',
    marginBottom: '10%',
  },
};

const Img = styled('img')(({ theme }) => ({
  marginLeft: 'auto',
  marginRight: 'auto',
  // maxWidth: 135,
  objectFit: 'contain',
  // height: '100%',
  maxWidth: '100%',
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
  // const classes = useStyles({ color, shortCard, firstCard, screenWidth });
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
      <Card sx={styles.card} onClick={() => {toggleIgLoadoutForm(id); track('edit')}}>
        <CardActionArea sx={styles.cardActionArea}>
            <Box sx={styles.imageArea}>
              <Img alt='' src={cardInfo.imageLink} />
            </Box>
          <Typography sx={styles.cardSubtitle} variant='subtitle2'>{cardInfo.productLink.split('/')[2]}</Typography>
          <Typography sx={styles.cardTitle} variant='subtitle2'>{cardInfo.productName}</Typography>
        </CardActionArea>
      </Card>
    }
    { cardInfo && cardInfo.productLink && !canEdit && // to product link
      <Card sx={styles.card} onClick={()=> {window.open(cardInfo.productLink, '_blank'); track(cardInfo.productLink)}}>
        <CardActionArea sx={styles.cardActionArea}>
          <Box sx={styles.imageArea}>
            <Img alt='' src={cardInfo.imageLink} />
          </Box>
          <Typography sx={styles.cardSubtitle} variant='subtitle2'>{cardInfo.productLink.split('/')[2]}</Typography>
          <Typography sx={styles.cardTitle} variant='subtitle2'>{cardInfo.productName}</Typography>
        </CardActionArea>
      </Card>
    }
    {
      cardInfo && cardInfo.text &&
      <div sx={styles.addDescriptionCard}>
        { descriptionEdit ?
          <InputBase
            sx={styles.descriptionInput}
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
            <Typography sx={styles.addDescriptionText} align='left'>
              {cardInfo.text}
            </Typography>
          </div>
        }
      </div>
    }
    { !cardInfo && canEdit && // blank card
      <div>
        { Object.keys(igLoadoutState).length > 0 && //description Add box
          <Box sx={styles.addDescriptionCard} >
            { descriptionEdit ?
              <InputBase
                sx={styles.descriptionInput}
                defaultValue=""
                multiline={true}
                autoFocus={true}
                onChange={handleDescriptionTextChange}
                onKeyPress={handleTextFieldSubmit}
              />
              :
              <CardActionArea sx={styles.cardActionArea} onClick={() => toggleDescriptionEdit(!descriptionEdit)}>
                <Typography sx={styles.addDescriptionText}>
                  Add Description
                </Typography>
                <AddBoxIcon sx={styles.addDescriptionIcon}/>
              </CardActionArea>
            }
            { descriptionText.length > 0 &&
              <Button disableRipple={true} disableFocusRipple={true} disableElevation={true} variant='containedSizeSmall' sx={styles.addDescriptionButton} onClick={handleSubmitDescription}> Add </Button>
            }
          </Box>
        }
        { descriptionText.length < 1 &&
          <Card sx={styles.addItemCard} onClick={() => toggleIgLoadoutForm(id)}>
            <CardActionArea sx={styles.cardActionArea}>
              <Typography sx={styles.addItemText}> Add Item </Typography>
              <AddBoxIcon sx={styles.addItemIcon}/>
            </CardActionArea>
          </Card>
        }
      </div>
    }
    </div>
  )
}

export default ItemCard;
