import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import SelectPercentage from './SelectPercentage';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function DialogButton() {
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return <>
    <Button 
        variant="contained" onClick={handleClickOpen}>
        Manual Controls
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        
      >
        <DialogTitle>{"Manually Control the Window"}</DialogTitle>
        <DialogContent sx={{padding: '24px'}}>
          <DialogContentText id="alert-dialog-slide-description">
            Adjust the window opening percentage by dragging the slider below.
            To confirm the new setting, click on "Save" on the bottom right.
          </DialogContentText>
          <SelectPercentage />
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={handleClose}>Dismiss</Button>
          <Button variant='contained' onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
  </>
}

export default DialogButton