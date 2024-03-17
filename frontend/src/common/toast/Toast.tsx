import { Alert, Snackbar } from '@mui/material';
import { ReactNode } from 'react';

export interface ToastProps {
  open: boolean;
  onClose: () => void;
  message: ReactNode;
  type: 'success' | 'info' | 'warning' | 'error';
}

export const Toast = ({ open, onClose, message, type }: ToastProps) => (
  <Snackbar open={open} autoHideDuration={6_000} onClose={onClose}>
    <Alert
      onClose={onClose}
      severity={type}
      variant="filled"
      sx={{ width: '100%' }}
    >
      {message}
    </Alert>
  </Snackbar>
);
