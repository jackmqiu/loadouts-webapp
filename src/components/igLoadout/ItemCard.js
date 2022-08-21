
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import SearchIcon from '@material-ui/icons/Search';
import Chip from "@material-ui/core/Chip";
import { useCoverCardMediaStyles } from '@mui-treasury/styles/cardMedia/cover';
import CardMedia from '@material-ui/core/CardMedia';
import { gunTagsFixture } from "../../constants/tags";
import tagsFixture from '../../constants/tags';
import tagClassColors from '../../constants/tags/tagColors';

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
    textAlign: 'left',
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
  },
  chipContainer: {
    // position: "absolute",
    marginTop: -50,
    bottom: 1,
    marginLeft: 10,
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
  const mediaStyles = useCoverCardMediaStyles({ bgPosition: 'top' });
  const classes = useStyles({color, height, screenWidth, rows});
  const tags = [];
  if (itemDetails?.tags) {
    itemDetails?.tags?.forEach((tag) => {
      const processedTag = tag && tag.toLowerCase().replaceAll('-', '');
      if (tagsFixture[processedTag]){
        console.log(tagClassColors[tagsFixture[processedTag]?.class]);
        tags.push(
          <Chip 
            label={tagsFixture[processedTag]?.text} 
            sx={{backgroundColor:`#${tagClassColors[tagsFixture[processedTag]?.class]}` || "#E82020"}} 
            className={classes.tagChip}>
          </Chip>
        )
      }
    })
  }
  if (tags.length > 0) {console.log('tags', tags)}
    return (
          <Card className={classes.card} >
              <img alt='' className={classes.modImg} src={itemDetails?.imageLink || "https://i.imgur.com/Z7e0jjRm.jpg"} />
              <div className={classes.chipContainer}>
                {tags}
              </div>
          </Card>
    );
};

export default LoadoutCard;
