import { Controller, useFormContext } from 'react-hook-form';
import { TextField, TextFieldProps, TextFieldVariants } from '@mui/material';

interface RHFInputFieldProps {
  name: string;
  label: string;
  inputProps: {
    variant?: TextFieldVariants;
  } & Omit<TextFieldProps, 'variant'>;
}

/**
 * React Hook Form input field using material ui TextField
 */
export const RHFInputField = ({
  name,
  label,
  inputProps,
}: RHFInputFieldProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          helperText={error ? error.message : null}
          error={!!error}
          onChange={onChange}
          value={value}
          label={label}
          {...inputProps}
        />
      )}
    />
  );
};
