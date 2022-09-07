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
  let feedClass = useLocation().pathname.split('/')[2];
  if (useLocation().pathname === '/') {
    feedClass = Object.keys(buildClasses)[0];
  }

  Object.keys(buildClasses).forEach((loadoutClass) => {
    buttons.push({
      loadoutClass: loadoutClass,
      color: (loadoutClass === feedClass) ? 'primary' : 'primary',
      match: loadoutClass === feedClass,
    });
  })
  return (
    <Box sx={styles.root}>
    <Box sx={styles.breadcrumbs}>
      {
        buttons.map(({ loadoutClass, color, match }) => {
          if (match) {
            return <Chip sizeSmall={true} sx={styles.chip} label={loadoutClass} color={color} href={`/${loadoutClass}`} onClick={() => { handleClick(loadoutClass) }}/>
          } else {
            return <Link sx={styles.links} color={color} href={`/l/${loadoutClass}`} onClick={() => { handleClick(loadoutClass) }}>
              {loadoutClass}
              </Link>
          }
        }
      )}
    </Box>
    </Box>
  )
}

export default CategoryBar;
