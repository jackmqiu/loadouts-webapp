import {
  Modal,
  TextField,
  Paper,
  Button,
  GridList,
  GridListTile,
  GridListTileBar,
} from '@material-ui/core';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  grid: {
    margin: 1,
    backgroundColor: 'gray',
    width: '100%',
  },
  modal: {
    minWidth: 120,
    maxHeight: 800,
    padding: 20,
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  formTitle: {
    margin: 2,
  },
  select: {
    margin: '0px 5px 0px 5px',
  },
  textField: {
    marginBottom: 10,
    marginLeft: 5,
  },
}));

const ItemForm = ({
  igLoadoutFormOpen,
  toggleIgLoadoutForm,
  mixpanel,
  googleResults,
  queryGoogle,
}) => {
  const classes = useStyles();
  const [formType, setFormType] = useState(true); // true is Search
  const [itemText, setItemText] = useState('');
  const handleTextChange = (event) => {
    setItemText(event.target.value);
  };
  const handleItemSubmit = (event) => {
    if (event.key === 'Enter') {
      mixpanel.track(
        'Action',
        {"submitItem": `${event.target.value}`}
      );
      queryGoogle(event.target.value);
      // toggleIgLoadoutForm();
      event.preventDefault();
    }
  }
  console.log('googleResults', googleResults)
  return (

      <Modal
        open={igLoadoutFormOpen}
        onClose={toggleIgLoadoutForm}
        className={classes.modal}
      >
        <Paper>
          <Button variant='contained' color='primary' onClick={() => setFormType(!formType)}>{formType ? 'Link' : 'Search'}</Button>
            <TextField className={classes.textField} label="Product" variant="outlined" onChange={handleTextChange} onKeyPress={handleItemSubmit}/>
            { googleResults && googleResults.map((item) => {
              <div>
              <h1>item</h1>
                <img href={item.pagemap.cse_thumbnail[0].src}/>
                </div>
              })}
          <GridList className={classes.grid}>
            {
              googleResults && googleResults.map((item) =>
                <GridListTile >
                  <img src={item.pagemap.cse_thumbnail[0].src}/>
                  <GridListTileBar
                   title={item.title}
                   titlePosition="top"
                   className={classes.titleBar}
                  />
                </GridListTile>
              )
            }
          </GridList>
        </Paper>
      </Modal>

  );
}

export default ItemForm;
