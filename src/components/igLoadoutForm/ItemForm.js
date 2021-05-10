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
import NameLoadoutForm from './NameLoadoutForm';

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
  addIgLoadout,
  idFormOpen,
  setIdFormOpen,
  submitLoadout,
  igLoadoutState,
  activeIgLoadoutCard,
  editIgLoadout,
}) => {
  const classes = useStyles();
  const [formType, setFormType] = useState(true); // true is Search
  const [searchText, setSearchText] = useState('');
  const [productNameText, setProductNameText] = useState('');
  const [productLink, setProductLink] = useState('');
  const [imageLink, setImageLink] = useState('');
  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };
  const handleProductNameTextChange = (event) => {
    setProductNameText(event.target.value);
  };
  const handleImageLinkTextChange = (event) => {
    setImageLink(event.target.value);
  }
  const handleProductLinkTextChange = (event) => {
    setProductLink(event.target.value);
  }
  const handleSearchSubmit = (event) => {
    if (event.key === 'Enter') {
      mixpanel.track(
        'Action',
        {"submitSearch": `${event.target.value}`}
      );
      queryGoogle(event.target.value);
      event.preventDefault();
    }
  }
  const handleTextFieldSubmit = (event) => {
    if (event.key === 'Enter') {
      mixpanel.track(
        'Action',
        {"submitEdit": `${event.target.value}`}
      );
      addIgLoadout({
        productName: productNameText,
        productLink: productLink,
        imageLink: imageLink,
      });
      toggleIgLoadoutForm();
      event.preventDefault();
    }
  }
  const handleSelect = (item, id) => {
    addIgLoadout(item, id)
    queryGoogle(0);
    toggleIgLoadoutForm();
  }
  return (

      <Modal
        open={igLoadoutFormOpen}
        onClose={toggleIgLoadoutForm}
        className={classes.modal}
      >
        <Paper>
        { idFormOpen ?
          <NameLoadoutForm
            classes={classes}
            mixpanel={mixpanel}
            submitLoadout={submitLoadout}
          /> :
          <div>
            <TextField className={classes.textField} label="Search" variant="outlined" onChange={handleSearchTextChange} onKeyPress={handleSearchSubmit}/>
            <GridList className={classes.grid}>
              {
                googleResults && googleResults.map((item, i) =>
                  <GridListTile id={i} onClick={() => {handleSelect(item, i)}}>
                    { item.pagemap.cse_thumbnail &&
                      <img src={item.pagemap.cse_thumbnail[0].src}/>
                    }
                    <GridListTileBar
                     title={item.title}
                     titlePosition="top"
                     className={classes.titleBar}
                    />
                  </GridListTile>
                )
              }
            </GridList>
            <TextField fullWidth={true} defaultValue={igLoadoutState[activeIgLoadoutCard] && igLoadoutState[activeIgLoadoutCard].productName} className={classes.textField} label="Product" variant="outlined" onChange={handleProductNameTextChange} onKeyPress={handleTextFieldSubmit}/>
            <TextField fullWidth={true} defaultValue={igLoadoutState[activeIgLoadoutCard] && igLoadoutState[activeIgLoadoutCard].imageLink} className={classes.textField} label="Image URL" variant="outlined" onChange={handleImageLinkTextChange} onKeyPress={handleTextFieldSubmit}/>
            <TextField fullWidth={true} defaultValue={igLoadoutState[activeIgLoadoutCard] && igLoadoutState[activeIgLoadoutCard].productLink} className={classes.textField} label="Product URL" variant="outlined" onChange={handleProductLinkTextChange} onKeyPress={handleTextFieldSubmit}/>
          </div>
        }
        </Paper>
      </Modal>

  );
}

export default ItemForm;
