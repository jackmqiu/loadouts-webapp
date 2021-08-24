import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import ItemCard from './ItemCard';
import IgLayoutTable from '../../IgLayoutTable';
import { gridLayoutTable, heightGuide } from '../../constants';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';

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
  gridItem: {
    display: 'flex',
  },
  button: {
    margin: 5,
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
}) => {
  const classes = useStyles({ screenWidth });
  const [commenting, toggleCommenting] = useState(false);
  const [commentText, setCommentText] = useState('');
  const handleCommentTextChange = (event) => {
    setCommentText(event.target.value);
  }
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
    <div>
      <Link to={`/${igLoadoutState._id}`}>
        <Grid container className={classes.grid} spacing={1}>
          { loadoutGridItems }
        </Grid>
      </Link>
      <Grid container className={classes.loadoutCaption}>
        <Grid item xs={8}>
          <Typography color='primary' className={classes.captionTitle} variant="subtitle2">{igLoadoutState.title || 'untitled'}</Typography>
          <Typography variant="caption" color="textSecondary" component="p">
            {numCards} Parts
          </Typography>
        </Grid>
        <Grid item xs={4} className={classes.buttonGroup}>
          <IconButton className={classes.moreButton} onClick={() => {toggleMoreDrawer(igLoadoutState._id)}}>
            <FavoriteBorderIcon fontSize='small' color='primary' className={classes.moreIcon}/>
          </IconButton>
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
