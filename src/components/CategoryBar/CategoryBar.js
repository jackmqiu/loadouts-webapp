import React from 'react';
import Chip from '@material-ui/core/chip';
import { makeStyles } from '@material-ui/core/styles';
import {
  hashtagTable
} from '../../constants';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
  root: {
    overflow: 'hidden',
    height: 40,
  },
  breadcrumbs: {
    marginLeft: 12,
    marginRight: 30,
    paddingTop: 9,
    overflow: 'scroll',
    whiteSpace: 'nowrap',
    height: 50,
  },
  scrollable:{
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    webkitOverflowScrolling: 'touch',
    height: 24,
    width: 400,
  }
}));


const CategoryBar = ({
  mixpanel,
  loadoutCategory,
}) => {
  const handleClick = (category) => {
    mixpanel.track(
      'Action',
      {"changeCategory": `${category}`}
    );
  };
  const buttons = [];
  Object.keys(hashtagTable).forEach((category) => {
    console.log('category, loadoutCategory', category, loadoutCategory);
    buttons.push({
      category: category,
      color: (category === loadoutCategory) ? 'textPrimary' : 'inherit',
    });
  })
  const classes = useStyles();
  return (
    <div className={classes.root}>
    <div className={classes.breadcrumbs}>
      <Breadcrumbs aria-label="breadcrumb" className={classes.scrollable}>
      {
        buttons.map(({ category, color }) => {
        return <Link color={color} href={`http://${category}.loadouts.me`} onClick={() => { handleClick(category) }}>
          {category}
          </Link>
        }
      )}
      </Breadcrumbs>
    </div>
    </div>
  )
}

export default CategoryBar;
