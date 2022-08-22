import React from 'react';
import Chip from '@mui/material/Chip';
import { makeStyles } from '@mui/styles';
import {
  hashtagTable,
  nonCategories,
} from '../../constants';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

const useStyles = makeStyles(theme => ({
  root: {
    overflow: 'hidden',
    height: 50,
  },
  breadcrumbs: {
    marginLeft: 12,
    marginRight: 30,
    paddingTop: 11,
    overflow: 'scroll',
    whiteSpace: 'nowrap',
    height: 50,
    paddingBottom: 10,
  },
  scrollable:{
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    webkitOverflowScrolling: 'touch',
    height: 24,
    width: 400,
  },
}));

const styles = {
  links: {
    marginLeft: 1,
    marginRight: 2,
    fontWeight: 500,
  },
  chip: {
    fontSize: 14,
    fontWeight: 600,
  }
}

const CategoryBar = ({
  mixpanel,
  loadoutCategory,
}) => {
  const handleClick = (category) => {
    mixpanel.track(
      'Navigate',
      {"CategoryBar": `${category}`}
    );
  };
  const buttons = [];
  Object.keys(hashtagTable).forEach((category) => {
    if (!nonCategories[category]) {
      buttons.push({
        category: category,
        color: (category === loadoutCategory) ? 'primary' : 'primary',
        match: category === loadoutCategory,
      });
    }
  })
  const classes = useStyles();
  return (
    <div className={classes.root}>
    <div className={classes.breadcrumbs}>
      {
        buttons.map(({ category, color, match }) => {
          if (match) {
            return <Chip sizeSmall={true} sx={styles.chip} label={category} color={color} href={`/${category}`} onClick={() => { handleClick(category) }}/>
          } else {
            return <Link sx={styles.links} color={color} href={`/${category}`} onClick={() => { handleClick(category) }}>
              {category}
              </Link>
          }
        }
      )}
    </div>
    </div>
  )
}

export default CategoryBar;
