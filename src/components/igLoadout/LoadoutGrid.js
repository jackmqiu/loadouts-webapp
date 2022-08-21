import React, {useState} from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import ItemCard from './ItemCard';
import IgLayoutTable from '../../IgLayoutTable';
import { gridLayoutTable, heightGuide } from '../../constants';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles(() => ({
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
  loadoutGroup: {
    marginTop: '2%',
    marginBottom: '10%',
  },
  gridItem: {
    display: 'flex',
  },
  button: {
    margin: 5,
  },
  loadoutHeader: {
    width: '90%',
    marginRight: '5%',
    textAlign: 'left',
    marginLeft: '5%',
    marginBottom: 5,
    display: 'flex',
  },
  avatar: {
    width: 30,
    height: 30,
    fontSize: 15,
    marginRight: 10,
  },
  userName: {
    marginTop: 4,
    fontWeight: 550,
  },
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
  moreButton: {
    // marginTop: -5,
    padding: 5,
  },
  moreIcon: {
    float: 'right',
  },
  buttonGroup: {
    textAlign: 'right',
    // paddingTop
  },
  commentRow: {
    display: 'flex',
  },
  commentUser: {
    fontWeight: 600,
    marginRight: 5,
  },
}));

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
}) => {
  const classes = useStyles({ screenWidth });
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
          <Grid key={subGridIndex+i} className={classes.gridItem} item xs={item.xs} style={{height: gridHeight}}>
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
          <Grid key={subGridIndex+i} className={classes.gridItem} item xs={item.xs} style={{height: gridHeight}}>
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
          <Grid key={i} item xs={gridLayoutTable[numDisplayCards][i].xs} className={classes.gridItem} style={{height: gridHeight}}>
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
          <Grid key={i} item xs={gridLayoutTable[numDisplayCards][i].xs} className={classes.gridItem} style={{height: gridHeight}}>
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
      <div className={classes.commentRow}>
        <Typography color='primary' className={classes.commentUser} variant='subtitle2'>{comment.name}</Typography>
        <Typography color='primary' variant='body2'>{comment.comment}</Typography>
      </div>
    )
  })
  return (
    <div className={classes.loadoutGroup}>
      <div className={classes.loadoutHeader}>
        <Avatar className={classes.avatar}>
          <PersonIcon/>
        </Avatar>
        <Typography color='primary' variant="subtitle2" className={classes.userName}> anonymous </Typography>
      </div>
      <Link to={`/${igLoadoutState._id}`}>
        <Grid container className={classes.grid} spacing={1}>
          { loadoutGridItems }
        </Grid>
      </Link>
      <Grid container className={classes.loadoutCaption}>
        <Grid item xs={7}>
          <Typography color='primary' className={classes.captionTitle} variant="subtitle2">{igLoadoutState.title || 'untitled'}</Typography>
          <Typography variant="caption" color="textSecondary" component="p">
            {numCards} Parts
          </Typography>
        </Grid>
        <Grid item xs={5} className={classes.buttonGroup}>
          { igLoadoutState.likes &&
            <IconButton className={classes.moreButton}>
              <Typography>{igLoadoutState.likes + liked}</Typography>
            </IconButton>
          }
          { liked ?
            <IconButton className={classes.moreButton} >
              <FavoriteOutlinedIcon fontSize='small' color='primary' className={classes.moreIcon}/>
            </IconButton>
            : <IconButton className={classes.moreButton} onClick={handleLikeClick}>
              <FavoriteBorderIcon fontSize='small' color='primary' className={classes.moreIcon}/>
            </IconButton>
          }
          <IconButton className={classes.moreButton} onClick={() => {toggleCommenting(true)}}>
            <ChatBubbleOutlineIcon fontSize='small' color='primary' className={classes.moreIcon}/>
          </IconButton>
          <IconButton className={classes.moreButton} onClick={() => {toggleMoreDrawer(igLoadoutState._id)}}>
            <ShareOutlinedIcon fontSize='small' color='primary' className={classes.moreIcon}/>
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          {
            comments
          }
        </Grid>
        <Grid item xs={12}>
          {
            commenting && <div className={classes.commentRow} >
              <InputBase
                className={classes.commentInput}
                defaultValue=""
                multiline={true}
                autoFocus={true}
                onChange={handleCommentTextChange}
                onKeyPress={handleTextFieldSubmit}
              />
            </div>
          }
          {
            !commenting && commentText && <div className={classes.commentRow}>
              <Typography color='primary' className={classes.commentUser} variant='subtitle2'>{'anonymous'}</Typography>
              <Typography color='primary' variant='body2'>{commentText}</Typography>
            </div>
          }
        </Grid>
      </Grid>
    </div>
  );
};

export default LoadoutGrid;
