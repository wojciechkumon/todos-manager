import { Alert, Snackbar } from '@mui/material';

interface ErrorSnackbarProps {
  open: boolean;
  onClose: () => void;
  message: string;
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
