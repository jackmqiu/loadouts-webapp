import React, { useState } from 'react';
import ItemCard from './ItemCard';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  columnContainer: ({ firstColumn }) => ({
    paddingLeft: firstColumn ? 10 : 0,
    paddingRight: 10,
  }),
}))

const VerticalContainer = ({
  igLoadoutState,
  containerIndex,
  totalContainers,
  toggleIgLoadoutForm,
  colorScheme,
  firstColumn,
}) => {
  const classes = useStyles({ firstColumn });
  const cards = [];
  if (containerIndex < Object.keys(igLoadoutState).length) {
    cards.push(
      <ItemCard
      id={containerIndex}
      key={containerIndex}
      cardInfo={igLoadoutState[containerIndex]}
      shortCard={containerIndex % 2 === 0}
      toggleIgLoadoutForm={toggleIgLoadoutForm}
      color={colorScheme[containerIndex % 3]}
      />
    )
  }
  for (
    let i = containerIndex + totalContainers;
    i < Object.keys(igLoadoutState).length;
    i += totalContainers
  ) {
    cards.push(
      <ItemCard
        id={i}
        key={i}
        cardInfo={igLoadoutState[i]}
        shortCard={false}
        toggleIgLoadoutForm={toggleIgLoadoutForm}
        color={colorScheme[i % 3]}
      />
    )
  }
  if (containerIndex === Object.keys(igLoadoutState).length % totalContainers) {
    cards.push(
      <ItemCard
        id={Object.keys(igLoadoutState).length}
        key={Object.keys(igLoadoutState).length}
        cardInfo={null}
        shortCard={false}
        toggleIgLoadoutForm={toggleIgLoadoutForm}
        color={colorScheme[Object.keys(igLoadoutState).length % 3]}
      />
    )
  }
  return (
    <div className={classes.columnContainer}>
      {cards}
    </div>
  )
}

export default VerticalContainer;
