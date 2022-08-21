import React from 'react';
import { makeStyles } from '@mui/styles';
import LoadoutMetadataForm from './LoadoutMetadataForm';

const Form = ({
  mixpanel,
  igLoadoutState,
  toggleNewLoadoutFormOpen,
  newLoadoutFormOpen,
  loadoutHashtags,
  setLoadoutHashtags,
  updateLoadoutMetadata,
  loadoutCategory,
  setLoadoutCategory,
}) => {
  return (
    <div>
    { newLoadoutFormOpen &&
      <LoadoutMetadataForm
        mixpanel={mixpanel}
        igLoadoutState={igLoadoutState}
        toggleNewLoadoutFormOpen={toggleNewLoadoutFormOpen}
        newLoadoutFormOpen={newLoadoutFormOpen}
        loadoutHashtags={loadoutHashtags}
        setLoadoutHashtags={setLoadoutHashtags}
        updateLoadoutMetadata={updateLoadoutMetadata}
        loadoutCategory={loadoutCategory}
        setLoadoutCategory={setLoadoutCategory}
      />
    }
    </div>
  )
};

export default Form;
