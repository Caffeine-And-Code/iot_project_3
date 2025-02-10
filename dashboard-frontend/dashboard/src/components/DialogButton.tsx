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
import tryToEnterInManual from '../hooks/tryToEnterInManual';
import { useDataContext } from './Layout/DataGetter/DataContext';
import SetWindowPercentage from '../hooks/SetWindowPercentage';
import { useSnackbar } from 'notistack';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function DialogButton() {
  const { enqueueSnackbar } = useSnackbar()
    const [open, setOpen] = React.useState(false);
    const [percentage, setPercentage] = React.useState(0);
    const { arduinoMode } = useDataContext();

    const handlePercentageChange = (value: number) => {
        setPercentage(value);
    }


  const handleClickOpen = async () => {
    const res = await tryToEnterInManual({ arduinoMode: arduinoMode.valueOf() });
    if (res === true) {
      setOpen(true);
      enqueueSnackbar('Entered in Manual Mode', { variant: 'success' });
    } else {
      console.error(res);
      enqueueSnackbar('Failed to enter in Manual Mode: '+res, { variant: 'error' }); 
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    const res = await SetWindowPercentage({ percentage });
    if (res === true) {
      setOpen(false);
      enqueueSnackbar('Window position updated', { variant: 'success' });
    } else {
      console.error(res);
      enqueueSnackbar('Failed to update window position: '+res, { variant: 'error' });
    }
  }

  return <>
    <Button 
        variant="contained" onClick={()=>handleClickOpen()} loading={arduinoMode == -1}>
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
          <SelectPercentage percentage={percentage} setPosition={handlePercentageChange} />
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={handleClose}>Dismiss</Button>
          <Button variant='contained' onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
  </>
}

export default DialogButton