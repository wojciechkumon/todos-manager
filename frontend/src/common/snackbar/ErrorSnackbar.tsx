import { Alert, Snackbar } from '@mui/material';
import { ReactNode } from 'react';

interface ErrorSnackbarProps {
  open: boolean;
  onClose: () => void;
  message: ReactNode;
}

export const ErrorSnackbar = ({
  open,
  onClose,
  message,
}: ErrorSnackbarProps) => (
  <Snackbar open={open} autoHideDuration={6_000} onClose={onClose}>
    <Alert
      onClose={onClose}
      severity="error"
      variant="filled"
      sx={{ width: '100%' }}
    >
      {message}
    </Alert>
  </Snackbar>
);
