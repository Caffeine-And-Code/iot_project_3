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
import {SetWindowPercentage,tryToEnterInAutomatic} from '../hooks/SetWindowPercentage';
import { useSnackbar } from 'notistack';
import { Grid2 } from '@mui/material';

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
    const { arduinoMode,frontMode } = useDataContext();

    const handlePercentageChange = (value: number) => {
        setPercentage(value);
    }


  const handleClickOpen = async () => {
    if (frontMode == 2)
    {
      setOpen(true);
      enqueueSnackbar("Already in Manual Mode, entered the controls...", {variant: "success"});
      return;
    }

    const res = await tryToEnterInManual({arduinoMode: arduinoMode.valueOf()});
    if (res === true) {
        setOpen(true);
        enqueueSnackbar("Entered in Manual Mode", {variant: "success"});
    } else {
        console.error(res);
        enqueueSnackbar("Failed to enter in Manual Mode: " + res, {variant: "error"});
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

  const handleGoAutomatic = async () => {
    const res = await tryToEnterInAutomatic();
    if (res === true) {
      enqueueSnackbar('Entered in Automatic Mode', { variant: 'success' });
    } else {
      enqueueSnackbar('Failed to enter in Automatic Mode: '+res, { variant: 'error' }); 
    }
  }

  return <>
    <Grid2 container spacing={2} justifyContent='center' alignItems='center'>  
      <Grid2 size={{ xs: 12, sm: 6 }}>
      <Button 
        variant="contained" onClick={()=>handleClickOpen()} loading={arduinoMode == -1}>
        Manual Controls
      </Button>
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
      <Button 
        variant="contained" onClick={handleGoAutomatic} loading={arduinoMode == -1} disabled={frontMode == 1}>
        Automatic Controls
      </Button>
      </Grid2>
    </Grid2>
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