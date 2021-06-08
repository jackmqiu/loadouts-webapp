import React, { useState } from 'react';
import VerticalContainer from './VerticalContainer';
import ItemCard from './ItemCard';
import Grid from '@material-ui/core/grid';

const ItemList = ({
  igLoadoutState,
  toggleIgLoadoutForm,
  colorScheme,
}) => {
  return (
    <Grid container>
      <Grid item xs={6}>
      <VerticalContainer
        igLoadoutState={igLoadoutState}
        containerIndex={0}
        totalContainers={2}
        toggleIgLoadoutForm={toggleIgLoadoutForm}
        colorScheme={colorScheme}
      />
      </Grid>
      <Grid item xs={6}>
      <VerticalContainer
        igLoadoutState={igLoadoutState}
        containerIndex={1}
        totalContainers={2}
        toggleIgLoadoutForm={toggleIgLoadoutForm}
        colorScheme={colorScheme}
      />
      </Grid>
    </Grid>
  )
}

export default ItemList;
