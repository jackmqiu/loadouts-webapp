import React, {useState} from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import ItemCard from './ItemCard';
import IgLayoutTable from '../../IgLayoutTable';
import { gridLayoutTable, heightGuide } from '../../constants';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import Box from '@mui/material/Box';

const styles = {
  loadoutGroup: {
    marginTop: '2%',
    marginBottom: '10%',
  },
  button: {
    margin: 5,
  },
  loadoutHeader: {
    width: '90%',
    marginRight: '5%',
    textAlign: 'left',
    marginLeft: '5%',
    marginBottom: 1,
    display: 'flex',
  },
  moreIcon: {
    float: 'right',
  },
  commentRow: {
    display: 'flex',
  },
  gridItem: {
    display: 'flex',
  },
  avatar: {
    width: 30,
    height: 30,
    fontSize: 15,
    marginRight: 2,
  },
  userName: {
    marginTop: "4px",
    fontWeight: 550,
  },
  grid: ({screenWidth}) => ({
    margin: 0,
    // backgroundColor: 'black',
    // backgroundImage: 'linear-gradient(to bottom, #FDF0A6, #87CEEB)',
    width: '95%',
    marginLeft: '2.5%',
    marginRight: '2.5%',
    height: screenWidth*.95,
    borderRadius: 0,
  }),
  loadoutCaption: {
    width: '90%',
    marginRight: '5%',
    textAlign: 'left',
    marginLeft: '5%',
    marginBottom: '5%',
  },
  captionTitle: {
    fontWeight: 550,
  },
  buttonGroup: {
    textAlign: 'right',
    // paddingTop
  },
  moreButton: {
    // marginTop: -5,
    padding: 1,
  },
  commentUser: {
    fontWeight: 600,
    marginRight: 1,
  },
}

const LoadoutGrid = ({
  mixpanel,
  igLoadoutState,
  handleOpen,
  handleClose,
  setIgLoadoutState,
  colorScheme,
  toggleIgLoadoutForm,
  displayState,
  screenWidth,
  scrollToTop,
  toggleMoreDrawer,
  addComment,
  sendLike,
  loggedInUser,
}) => {
  const [commenting, toggleCommenting] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [liked, setLiked] = useState(0);
  const handleCommentTextChange = (event) => {
    setCommentText(event.target.value);
  };
  const handleTextFieldSubmit = (event) => {
    if (event.key === 'Enter') {
      // mixpanel.track(
      //   'Action',
      //   {"submitComment": `${commentText}`}
      // );
      addComment(commentText, igLoadoutState._id);
      toggleCommenting(!commenting);
      event.preventDefault();
    }
  }
  const handleSubmitComment = () => {
    addComment(commentText, igLoadoutState._id);
    toggleCommenting(!commenting);
  }
  let numCards = Object.keys(igLoadoutState.items).length;
  if (igLoadoutState.itemKeyTable) {
    numCards = Object.keys(igLoadoutState.itemKeyTable).length;
  }
  let numDisplayCards = numCards;
  if (numCards > 6) { // keep it to 2 rows
    numDisplayCards = 6;
  }
  const populateSubItems = (subGridIndex) => {
    const loadoutGridSubItems = [];
    gridLayoutTable[numDisplayCards][subGridIndex].items.forEach((item, i) => {
      const gridHeight = screenWidth*item.gridItemHeight/12*.95;
      if (igLoadoutState.itemKeyTable) {
        loadoutGridSubItems.push(
          <Grid key={subGridIndex+i} sx={styles.gridItem} item xs={item.xs} style={{height: gridHeight}}>
            <ItemCard
              height={item.gridItemHeight}
              itemDetails={igLoadoutState.items[igLoadoutState.itemKeyTable[subGridIndex+i]]}
              openModal={handleOpen}
              closeModal={handleClose}
              color={colorScheme[i%2]}
              toggleIgLoadoutForm={toggleIgLoadoutForm}
              displayState={displayState}
              screenWidth={screenWidth}
              rows={IgLayoutTable[numDisplayCards].rows}
            />
          </Grid>
        )
      } else {
        loadoutGridSubItems.push(
          <Grid key={subGridIndex+i} sx={styles.gridItem} item xs={item.xs} style={{height: gridHeight}}>
            <ItemCard
              height={item.gridItemHeight}
              itemDetails={igLoadoutState.items[subGridIndex+i]}
              openModal={handleOpen}
              closeModal={handleClose}
              color={colorScheme[i%2]}
              toggleIgLoadoutForm={toggleIgLoadoutForm}
              displayState={displayState}
              screenWidth={screenWidth}
              rows={IgLayoutTable[numDisplayCards].rows}
            />
          </Grid>
        )
      }
    });
    return loadoutGridSubItems;
  }
  const loadoutGridItems = [];
  // Object.keys(gridLayoutTable[numDisplayCards]).forEach((subGridKey) => {
  //   gridLayoutTable[numDisplayCards][subGridKey]
  // });
  const handleLikeClick = () => {
    setLiked(1);
    sendLike(igLoadoutState._id);
  }


  for (let i = 0; i < numDisplayCards; i++) {
    if (gridLayoutTable[numDisplayCards][i].items) {
      // const loadoutGridSubItems = populateSubItems(i)
      const gridHeight = screenWidth*gridLayoutTable[numDisplayCards][i].gridItemHeight/12*.95;
      loadoutGridItems.push(
        <Grid key={i} item xs={gridLayoutTable[numDisplayCards][i].xs} style={{height: gridHeight}}>
          <Grid container spacing={1} style={{height: gridHeight}}>
            {populateSubItems(i, gridHeight)}
          </Grid>
        </Grid>
      )
      i += (gridLayoutTable[numDisplayCards][i].items.length - 1);
    } else {
      const gridHeight = screenWidth*gridLayoutTable[numDisplayCards][i].gridItemHeight/12*.95;
      if (igLoadoutState.itemKeyTable) {
        loadoutGridItems.push(
          <Grid key={i} item xs={gridLayoutTable[numDisplayCards][i].xs} sx={styles.gridItem} style={{height: gridHeight}}>
            <ItemCard
              id={i}
              height={gridLayoutTable[numDisplayCards][i].gridItemHeight}
              itemDetails={igLoadoutState.items[igLoadoutState.itemKeyTable[i]]}
              openModal={handleOpen}
              closeModal={handleClose}
              color={colorScheme[i%2]}
              toggleIgLoadoutForm={toggleIgLoadoutForm}
              displayState={displayState}
              screenWidth={screenWidth}
              rows={IgLayoutTable[numDisplayCards].rows}
            />
          </Grid>
        )
      } else {
        loadoutGridItems.push(
          <Grid key={i} item xs={gridLayoutTable[numDisplayCards][i].xs} sx={styles.gridItem} style={{height: gridHeight}}>
            <ItemCard
              id={i}
              height={gridLayoutTable[numDisplayCards][i].gridItemHeight}
              itemDetails={igLoadoutState.items[i]}
              openModal={handleOpen}
              closeModal={handleClose}
              color={colorScheme[i%2]}
              toggleIgLoadoutForm={toggleIgLoadoutForm}
              displayState={displayState}
              screenWidth={screenWidth}
              rows={IgLayoutTable[numDisplayCards].rows}
            />
          </Grid>
        )
      }
    }
  };
  const comments = [];
  igLoadoutState.comments && igLoadoutState.comments.map((comment) => {
    comments.push(
      <Box sx={styles.commentRow}>
        <Typography color='primary' sx={styles.commentUser} variant='subtitle2'>{comment.name}</Typography>
        <Typography color='primary' variant='body2'>{comment.comment}</Typography>
      </Box>
    )
  })
  return (
    <Box sx={styles.loadoutGroup}>
      <Box sx={styles.loadoutHeader}>
        <Avatar sx={styles.avatar}>
          <PersonIcon/>
        </Avatar>
        <Typography color='primary' variant="subtitle2" sx={styles.userName}> {igLoadoutState?.username || 'anonymous'} </Typography>
      </Box>
      <Link to={`/${igLoadoutState._id}`}>
        <Grid container sx={styles.grid} spacing={1}>
          { loadoutGridItems }
        </Grid>
      </Link>
      <Grid container sx={styles.loadoutCaption}>
        <Grid item xs={7}>
          <Typography color='primary' sx={styles.captionTitle} variant="subtitle2">{igLoadoutState.title || 'untitled'}</Typography>
          <Typography variant="caption" color="textSecondary" component="p">
            {numCards} Parts
          </Typography>
        </Grid>
        <Grid item xs={5} sx={styles.buttonGroup}>
          { igLoadoutState.likes &&
            <IconButton sx={styles.moreButton}>
              <Typography>{igLoadoutState.likes + liked}</Typography>
            </IconButton>
          }
          { liked ?
            <IconButton sx={styles.moreButton} >
              <FavoriteOutlinedIcon fontSize='small' color='primary' sx={styles.moreIcon}/>
            </IconButton>
            : <IconButton sx={styles.moreButton} onClick={handleLikeClick}>
              <FavoriteBorderIcon fontSize='small' color='primary' sx={styles.moreIcon}/>
            </IconButton>
          }
          <IconButton sx={styles.moreButton} onClick={() => {toggleCommenting(true)}}>
            <ChatBubbleOutlineIcon fontSize='small' color='primary' sx={styles.moreIcon}/>
          </IconButton>
          <IconButton sx={styles.moreButton} onClick={() => {toggleMoreDrawer(igLoadoutState._id)}}>
            <ShareOutlinedIcon fontSize='small' color='primary' sx={styles.moreIcon}/>
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          {
            comments
          }
        </Grid>
        <Grid item xs={12}>
          {
            commenting && <Box sx={styles.commentRow} >
              <InputBase
                defaultValue=""
                multiline={true}
                autoFocus={true}
                onChange={handleCommentTextChange}
                onKeyPress={handleTextFieldSubmit}
              />
            </Box>
          }
          {
            !commenting && commentText && <Box sx={styles.commentRow}>
              <Typography color='primary' sx={styles.commentUser} variant='subtitle2'>{'anonymous'}</Typography>
              <Typography color='primary' variant='body2'>{commentText}</Typography>
            </Box>
          }
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoadoutGrid;
