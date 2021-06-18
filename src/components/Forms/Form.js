import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LoadoutMetadataForm from './LoadoutMetadataForm';

const Form = ({
  mixpanel,
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
