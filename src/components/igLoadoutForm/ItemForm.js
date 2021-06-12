import {
  Modal,
  TextField,
  Paper,
  Button,
  GridList,
  GridListTile,
  GridListTileBar,
  Typography,
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
  deleteIgLoadoutItem,
  closeIgLoadoutForm,
}) => {
  const classes = useStyles();
  const [searchText, setSearchText] = useState('');
  const [productNameText, setProductNameText] = useState(igLoadoutState.items[activeIgLoadoutCard] && igLoadoutState.items[activeIgLoadoutCard].productName);
  const [imageLink, setImageLink] = useState(igLoadoutState.items[activeIgLoadoutCard] && igLoadoutState.items[activeIgLoadoutCard].imageLink);
  const [productLink, setProductLink] = useState(igLoadoutState.items[activeIgLoadoutCard] && igLoadoutState.items[activeIgLoadoutCard].productLink);
  const [hasSubmitted, toggleHasSubmitted] = useState(false);

  const handleSearchTextChange = (event) => {
    toggleHasSubmitted(false);
    setSearchText(event.target.value);
  };
  const handleProductNameTextChange = (event) => {
    toggleHasSubmitted(false);
    setProductNameText(event.target.value);
  };
  const handleImageLinkTextChange = (event) => {
    toggleHasSubmitted(false);
    setImageLink(event.target.value);
  }
  const handleProductLinkTextChange = (event) => {
    toggleHasSubmitted(false);
    setProductLink(event.target.value);
  }
  const handleSearchSubmit = (event) => {
    if (event.key === 'Enter') {
      mixpanel.track(
        'Action',
        {"submitSearch": searchText}
      );
      queryGoogle(event.target.value);
      event.preventDefault();
    }
  }
  const handleTextFieldSubmit = (event) => {
    if (event.key === 'Enter') {
      mixpanel.track(
        'Action',
        {"submitLoadout": `${productNameText}, ${productLink}, ${imageLink}`}
      );
      handleSubmitLoadout();
      event.preventDefault();
    }
  }
  const handleSubmitLoadout = () => {
    if (igLoadoutState.items[activeIgLoadoutCard] &&
    (productNameText || igLoadoutState.items[activeIgLoadoutCard].productName) &&
    (productLink || igLoadoutState.items[activeIgLoadoutCard].productLink) &&
    (imageLink || igLoadoutState.items[activeIgLoadoutCard].imageLink)) {
      console.log('handleSubmit', igLoadoutState.items[activeIgLoadoutCard], productNameText, productLink, imageLink)
      editIgLoadout({
        productName: productNameText || igLoadoutState.items[activeIgLoadoutCard].productName,
        productLink: productLink || igLoadoutState.items[activeIgLoadoutCard].productLink,
        imageLink: imageLink || igLoadoutState.items[activeIgLoadoutCard].imageLink,
      });
      toggleHasSubmitted(false);
      toggleIgLoadoutForm();
      //clear fields
      setImageLink('');
      setProductNameText('');
      setProductLink('');
    } else if (!igLoadoutState.items[activeIgLoadoutCard] && productNameText && productLink && imageLink) {
      editIgLoadout({
        productName: productNameText,
        productLink: productLink,
        imageLink: imageLink,
      });
      toggleIgLoadoutForm();

    } else {
      toggleHasSubmitted(true);
    }
  }
  const handleSelect = (item, id) => {
    editIgLoadout({
      productLink: item.link,
      imageLink: item.pagemap.cse_image[0].src || item.pagemap.cse_thumbnail[0].src,
      productName: item.title,
    })
    queryGoogle(0);
    toggleIgLoadoutForm();
  }
  const handleDeleteCard = (item) => {
    toggleIgLoadoutForm();
    deleteIgLoadoutItem();
  }
  return (

      <Modal
        open={igLoadoutFormOpen}
        onClose={closeIgLoadoutForm}
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
            <Typography variant='h5'>Search</Typography>
            <TextField className={classes.textField} label="Search" variant="outlined" onChange={handleSearchTextChange} onKeyPress={handleSearchSubmit}/>
            { googleResults &&
              <GridList className={classes.grid}>
                {
                  googleResults.map((item, i) =>
                    <GridListTile id={i} onClick={() => {handleSelect(item, i)}}>
                      { item.pagemap && item.pagemap.cse_thumbnail &&
                        <img alt='' src={item.pagemap.cse_thumbnail[0].src}/>
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
            }
            <Typography variant='h5'>Custom</Typography>
            <TextField error={hasSubmitted && !productNameText} helperText={hasSubmitted && !productNameText && 'Add Item Name'} fullWidth={true} defaultValue={igLoadoutState.items[activeIgLoadoutCard] && igLoadoutState.items[activeIgLoadoutCard].productName} className={classes.textField} label="Product" variant="outlined" onChange={handleProductNameTextChange} onKeyPress={handleTextFieldSubmit}/>
            <TextField error={hasSubmitted && !imageLink} helperText={hasSubmitted && !imageLink && 'Add Image Link'} fullWidth={true} defaultValue={igLoadoutState.items[activeIgLoadoutCard] && igLoadoutState.items[activeIgLoadoutCard].imageLink} className={classes.textField} label="Image URL" variant="outlined" onChange={handleImageLinkTextChange} onKeyPress={handleTextFieldSubmit}/>
            <TextField error={hasSubmitted && !productLink} helperText={hasSubmitted && !productLink && 'Add Item Link'} fullWidth={true} defaultValue={igLoadoutState.items[activeIgLoadoutCard] && igLoadoutState.items[activeIgLoadoutCard].productLink} className={classes.textField} label="Product URL" variant="outlined" onChange={handleProductLinkTextChange} onKeyPress={handleTextFieldSubmit}/>
            <Button variant='contained' color='primary' onClick={() => {handleSubmitLoadout()}}>Submit</Button>
            <Button variant='contained' color='secondary' onClick={() => {handleDeleteCard()}}>Delete</Button>
          </div>
        }
        </Paper>
      </Modal>

  );
}

export default ItemForm;
