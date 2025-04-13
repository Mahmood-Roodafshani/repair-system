import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';
import { Slide } from '@mui/material';
import IconButton from '@mui/material/IconButton';

const options = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
  'Titania',
  'Triton',
  'Umbriel'
];

export interface ConfirmationDialogRawProps extends DialogProps {
  id: string;
  closeOnEsc: boolean;
  open: boolean;
  onClose: () => void;
  dialogTitle?: string;
  dialogOkBtnAction?: () => void;
  children?: any;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmationDialogRaw(
  props: ConfirmationDialogRawProps
) {
  const {
    onClose,
    closeOnEsc,
    open,
    dialogOkBtnAction,
    dialogTitle,
    ...other
  } = props;
  const radioGroupRef = React.useRef<HTMLElement>(null);
  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    if (dialogOkBtnAction) {
      dialogOkBtnAction();
    }
    onClose();
  };

  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': { width: '90%', maxHeight: 1500 },
        marginTop: '1%',
        marginBottom: '1%',
        textAlign: 'center'
      }}
      maxWidth="xs"
      // fullWidth={true}
      // TransitionComponent={Transition}
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...(closeOnEsc ? { onClose: onClose } : {})}
      {...other}
    >
      {dialogTitle ? (
        <DialogTitle
          sx={(theme) => ({ backgroundColor: theme.palette.primary.light })}
        >
          {dialogTitle}
          <IconButton
            aria-label="close"
            onClick={handleCancel}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500]
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      ) : null}
      <DialogContent dividers>{props.children}</DialogContent>
      {dialogOkBtnAction ? (
        <DialogActions>
          <Button autoFocus onClick={handleCancel}>
            انصراف
          </Button>
          <Button onClick={handleOk}>تایید</Button>
        </DialogActions>
      ) : null}
    </Dialog>
  );
}
