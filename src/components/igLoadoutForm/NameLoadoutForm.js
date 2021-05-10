import { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';

const NameLoadoutForm = ({classes, mixpanel, submitLoadout}) => {
  const [itemText, setItemText] = useState('');
  const handleTextChange = (event) => {
    setItemText(event.target.value.toLowerCase());
  };
  const handleItemSubmit = (event) => {
    if (event.key === 'Enter') {
      mixpanel.track(
        'Action',
        {"submitLoadoutName": `${event.target.value}`}
      );
      submitLoadout(event.target.value);
      event.preventDefault();
    }
  }
  return (
    <div>
    <Typography variant='h5'> Enter Loadout Id</Typography>
    <TextField value={itemText} label="Product" variant="outlined" onChange={handleTextChange} onKeyPress={handleItemSubmit}/>
    </div>
  )
}

export default NameLoadoutForm;
