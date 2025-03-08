import AddCircleIcon from '@mui/icons-material/AddCircle';
import '../../src/App.css' 
import axios from 'axios';

import * as React from 'react';
import PropTypes from 'prop-types';
import { DialogsProvider, useDialogs } from '@toolpad/core/useDialogs';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Alert from '@mui/material/Alert';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

function MyCustomDialog({ open, onClose, payload }) {
    return (
      <Dialog fullWidth open={open} onClose={() => onClose()}>
        <DialogTitle>Custom Error Handler</DialogTitle>
        <DialogContent>
          <Alert severity="error">
            {`An error occurred while deleting item "${payload.id}":`}
            <pre>{payload.error}</pre>
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose()}>Close me</Button>
        </DialogActions>
      </Dialog>
    );
  }
  
  MyCustomDialog.propTypes = {
    /**
     * A function to call when the dialog should be closed. If the dialog has a return
     * value, it should be passed as an argument to this function. You should use the promise
     * that is returned to show a loading state while the dialog is performing async actions
     * on close.
     * @param result The result to return from the dialog.
     * @returns A promise that resolves when the dialog can be fully closed.
     */
    onClose: PropTypes.func.isRequired,
    /**
     * Whether the dialog is open.
     */
    open: PropTypes.bool.isRequired,
    /**
     * The payload that was passed when the dialog was opened.
     */
    payload: PropTypes.shape({
      error: PropTypes.string,
      id: PropTypes.string,
    }).isRequired,
  };
  


const addAccount = async (accountId) =>{
    const  userObject = await axios.get("http://localhost:8000/userInfo", {withCredentials:true}); 
    const username = userObject.data.username; 
    console.log(username, accountId)
    await axios.put("http://localhost:8000/user/addAccount", {
        username: username, 
        accountId: accountId, 
    })

    return; 
}
function ButtonContent({refresh}) {
    const dialogs = useDialogs();
    const [isAdding, setIsAdding] = React.useState(false);
  
    const handleDelete = async () => {
      const id = await dialogs.prompt('Enter the ID of your bank account.', {
        okText: 'Add',
        cancelText: 'Cancel',
      });
  
      if (id) {
        const addConfirmed = await dialogs.confirm(
          `Are you sure you want to add "${id}"?`,
        );
        if (addConfirmed) {
          try {
            setIsAdding(true);
            await addAccount(id);
            dialogs.alert('Added!');
            refresh();
          } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            await dialogs.open(MyCustomDialog, { id, error: message });
          } finally {
            setIsAdding(false);
          }
        }
      }
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', gap: 16 }}>
          <Button id = "addAccount-btn" variant="contained" loading={isAdding} onClick={handleDelete}>
            Add New Bank <AddCircleIcon/> 
          </Button>
        </div>
      </div>
    );
  }

function AddAccountBtn({refresh}){
    return <>
        <DialogsProvider>
            <ButtonContent refresh = {refresh}/>
        </DialogsProvider>
    </>
    
}

export default AddAccountBtn;