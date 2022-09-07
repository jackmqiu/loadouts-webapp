import React from 'react';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import {
  hashtagTable,
  buildClasses,
  nonCategories,
} from '../../constants';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useLocation } from 'react-router-dom';

const styles = {
  root: {
    overflow: 'hidden',
    height: 50,
  },
  breadcrumbs: {
    marginLeft: 1.5,
    marginRight: 4,
    paddingTop: 1,
    overflow: 'scroll',
    whiteSpace: 'nowrap',
    height: 50,
    paddingBottom: 1,
  },
  scrollable:{
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    webkitOverflowScrolling: 'touch',
    height: 24,
    width: 400,
  },
  links: {
    marginLeft: 1,
    marginRight: 1,
    fontWeight: 500,
  },
  chip: {
    fontSize: 14,
    fontWeight: 600,
  }
}

const CategoryBar = ({
  mixpanel,
}) => {
  const handleClick = (category) => {
    mixpanel.track(
      'Navigate',
      {"CategoryBar": `${category}`}
    );
  };
  const buttons = [];
  let feedCategory = useLocation().pathname.split('/')[2];
  if (useLocation().pathname === '/') {
    feedCategory = Object.keys(buildClasses)[0];
  }

  Object.keys(buildClasses).forEach((category) => {
    buttons.push({
      category: category,
      color: (category === feedCategory) ? 'primary' : 'primary',
      match: category === feedCategory,
    });
  })
  return (
    <Box sx={styles.root}>
    <Box sx={styles.breadcrumbs}>
      {
        buttons.map(({ category, color, match }) => {
          if (match) {
            return <Chip sizeSmall={true} sx={styles.chip} label={category} color={color} href={`/${category}`} onClick={() => { handleClick(category) }}/>
          } else {
            return <Link sx={styles.links} color={color} href={`/l/${category}`} onClick={() => { handleClick(category) }}>
              {category}
              </Link>
          }
        }
      )}
    </Box>
    </Box>
  )
}

export default CategoryBar;
