import React, { useState } from 'react';
import ItemCard from './ItemCard';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  columnContainer: ({ firstColumn }) => ({
    paddingLeft: firstColumn ? 10 : 0,
    paddingRight: 10,
  }),
}))

const VerticalContainer = ({
  mixpanel,
  igLoadoutState,
  containerIndex,
  totalContainers,
  toggleIgLoadoutForm,
  colorScheme,
  firstColumn,
  canEdit,
  screenWidth,
  addDescription,
}) => {
  const classes = useStyles({ firstColumn });
  const cards = [];
  if (containerIndex < Object.keys(igLoadoutState.items).length) {
    // first card of column might be short, handled here
    cards.push(
      <ItemCard
        mixpanel={mixpanel}
        id={containerIndex}
        key={containerIndex}
        cardInfo={igLoadoutState.items[containerIndex]}
        shortCard={containerIndex % 2 === 0}
        toggleIgLoadoutForm={toggleIgLoadoutForm}
        color={colorScheme[containerIndex % 4]}
        firstCard={true}
        canEdit={canEdit}
        screenWidth={screenWidth}
        igLoadoutState={igLoadoutState}
        addDescription={addDescription}
      />
    )
  }
  for (
    let i = containerIndex + totalContainers;
    i < Object.keys(igLoadoutState.items).length;
    i += totalContainers
  ) {
    cards.push(
      <ItemCard
        mixpanel={mixpanel}
        id={i}
        key={i}
        cardInfo={igLoadoutState.items[i]}
        shortCard={false}
        toggleIgLoadoutForm={toggleIgLoadoutForm}
        color={colorScheme[i % 4]}
        firstCard={false}
        canEdit={canEdit}
        screenWidth={screenWidth}
        igLoadoutState={igLoadoutState}
        addDescription={addDescription}
      />
    )
  }
  if (containerIndex === Object.keys(igLoadoutState.items).length % totalContainers) {
    // if all cards are out, add blank 'add' card
    cards.push(
      <ItemCard
        mixpanel={mixpanel}
        id={Object.keys(igLoadoutState.items).length}
        key={Object.keys(igLoadoutState.items).length}
        cardInfo={null}
        shortCard={false}
        toggleIgLoadoutForm={toggleIgLoadoutForm}
        color={colorScheme[Object.keys(igLoadoutState.items).length % 4]}
        firstCard={false}
        canEdit={canEdit}
        screenWidth={screenWidth}
        igLoadoutState={igLoadoutState}
        addDescription={addDescription}
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
