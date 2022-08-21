import {
  Modal,
  TextField,
  Paper,
  Button,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import IdLoadoutForm from './IdLoadoutForm';
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

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
    marginRight: 'auto',
    marginLeft: 'auto',
    maxWidth: 600,
    minWidth: 120,
    padding: 20,
    marginBottom: '10%',
  },
  formTitle: {
    marginLeft: '10%',
    paddingTop: 30,
    paddingBottom: 10,
  },
  select: {
    margin: '0px 5px 0px 5px',
  },
  textField: {
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
    padding: 0,
  },
  card: {
    display: 'block',
  },
  select: {
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
  },
  fieldsContainer: {
    paddingTop: 30,
    paddingBottom: 30,
  },
  buttonContainer: {
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
    marginBottom: 30,
  },
  nextButton: {
    marginBottom: 30,
    marginRight: 10,
  },
  searchButton: {
    padding: 0,
  },
  resultsWindow: ({ height }) => ({
    overflow: 'scroll',
    marginBottom: 10,
    height: height*.61,
    marginLeft: 2,
  }),
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
  height,
  width,
}) => {
  const classes = useStyles({ height });
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
      setTimeout(() => {
        document.activeElement.blur();
      }, 0);
    }
  }
  const handleSearchClick = () => {
    queryGoogle(searchText);
    setTimeout(() => {
      document.activeElement.blur();
    }, 0);
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
  let placeholder = 'sling, specna m4, magpul, etc.';
  // if (Object.keys(igLoadoutState.items).length < 1) {
  //   placeholder = 'vfc hk416';
  // }
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
          <IdLoadoutForm
            mixpanel={mixpanel}
            submitLoadout={submitLoadout}
          /> :
          <div>
            <div className={classes.fieldsContainer}>
              <Typography variant='h5' className={classes.formTitle}>Find Item</Typography>
              <TextField
                className={classes.textField}
                margin="dense"
                label="Search"
                variant="outlined"
                autoFocus={true}
                placeholder={placeholder}
                onChange={handleSearchTextChange}
                onKeyPress={handleSearchSubmit}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton className={classes.searchButton} onClick={handleSearchClick}>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              { googleResults &&
                <div className={classes.resultsWindow}>
                  <ImageList className={classes.grid}>
                    {
                      googleResults.map((item, i) =>
                      <ImageListItem key={i} id={i} onClick={() => {handleSelect(item, i)}}>
                        { item.pagemap && item.pagemap.cse_thumbnail &&
                          <img alt='' src={item.pagemap.cse_thumbnail[0].src}/>
                        }
                        <ImageListItemBar
                          title={item.title}
                          titlePosition="top"
                          className={classes.titleBar}
                          />
                      </ImageListItem>
                    )
                  }
                </ImageList>
                </div>
              }
              { !googleResults && igLoadoutState.items[activeIgLoadoutCard] &&
                <div>
                  <Typography variant='h5' className={classes.formTitle}>Customize</Typography>
                  <TextField margin="dense" error={hasSubmitted && !productNameText} helperText={hasSubmitted && !productNameText && 'Add Item Name'} defaultValue={igLoadoutState.items[activeIgLoadoutCard] && igLoadoutState.items[activeIgLoadoutCard].productName} className={classes.textField} label="Product" variant="outlined" onChange={handleProductNameTextChange} onKeyPress={handleTextFieldSubmit}/>
                  <TextField margin="dense" error={hasSubmitted && !imageLink} helperText={hasSubmitted && !imageLink && 'Add Image Link'} defaultValue={igLoadoutState.items[activeIgLoadoutCard] && igLoadoutState.items[activeIgLoadoutCard].imageLink} className={classes.textField} label="Image URL" variant="outlined" onChange={handleImageLinkTextChange} onKeyPress={handleTextFieldSubmit}/>
                  <TextField margin="dense" error={hasSubmitted && !productLink} helperText={hasSubmitted && !productLink && 'Add Item Link'} defaultValue={igLoadoutState.items[activeIgLoadoutCard] && igLoadoutState.items[activeIgLoadoutCard].productLink} className={classes.textField} label="Product URL" variant="outlined" onChange={handleProductLinkTextChange} onKeyPress={handleTextFieldSubmit}/>
                </div>
              }
            </div>
            { !googleResults && igLoadoutState.items[activeIgLoadoutCard] &&
              <div className={classes.buttonContainer}>
                <Button className={classes.nextButton} variant='contained' color='primary' onClick={() => {handleSubmitLoadout()}}>Submit</Button>
                <Button className={classes.nextButton} variant='contained' color='secondary' onClick={() => {handleDeleteCard()}}>Delete</Button>
              </div>
            }
          </div>
        }
        </Paper>
      </Modal>

  );
}

export default ItemForm;
