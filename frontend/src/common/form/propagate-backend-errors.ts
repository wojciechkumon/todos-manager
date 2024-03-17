import { FieldPath, FieldValues, UseFormSetError } from 'react-hook-form';
import { ValidationError } from '../../api/error-response.ts';

export const propagateBackendErrors = <T extends FieldValues>(
  setError: UseFormSetError<T>,
  validationErrors: ValidationError[],
): void => {
  validationErrors.forEach((error) => {
    const message = Object.values(error.constraints).join(', ');
    setError(error.property as FieldPath<T>, {
      message,
      type: 'custom',
    });
  });
};
