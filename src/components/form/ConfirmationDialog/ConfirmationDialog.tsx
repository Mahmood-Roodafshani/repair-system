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
import { Typography } from '@mui/material';

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
  id?: string;
  closeOnEsc?: boolean;
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void | Promise<void>;
  title?: string;
  description?: string;
  dialogTitle?: string;
  dialogOkBtnAction?: () => void;
  children?: React.ReactNode;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmationDialogRaw(props: ConfirmationDialogRawProps) {
  const {
    onClose,
    onConfirm,
    open,
    title,
    description,
    dialogTitle,
    dialogOkBtnAction,
    closeOnEsc = true,
    children,
    ...other
  } = props;

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    if (onConfirm) {
      onConfirm();
    } else if (dialogOkBtnAction) {
      dialogOkBtnAction();
      onClose();
    }
  };

  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': { width: '80%', maxHeight: 435 },
        marginTop: '1%',
        marginBottom: '1%',
        textAlign: 'center'
      }}
      maxWidth="xs"
      TransitionComponent={Transition}
      open={open}
      {...(closeOnEsc ? { onClose } : {})}
      {...other}
    >
      <DialogTitle
        sx={(theme) => ({ backgroundColor: theme.palette.primary.light })}
      >
        {title || dialogTitle}
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
      <DialogContent dividers>
        {description ? <Typography>{description}</Typography> : children}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          انصراف
        </Button>
        <Button onClick={handleOk}>تایید</Button>
      </DialogActions>
    </Dialog>
  );
}
