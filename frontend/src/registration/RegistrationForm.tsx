import { AxiosResponse, HttpStatusCode } from 'axios';
import { Link, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Link as RouterLink } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FieldPath,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { routes } from '../config/routes.ts';
import {
  defaultFormValues,
  registrationFormSchema,
  RegistrationFormSchema,
} from './registration-form-schema.ts';
import { RHFInputField } from '../common/form/RHFInputField.tsx';
import { register } from '../api/registration.ts';
import { ErrorResponse, ValidationError } from '../api/error-response.ts';
import { useState } from 'react';
import { toastMessages } from '../common/toast/toast-messages.ts';
import { Toast } from '../common/toast/Toast.tsx';
import { JwtResponse } from '../api/JwtResponse.ts';
import { propagateBackendErrors } from '../common/form/propagate-backend-errors.ts';
import { useLogin } from '../auth/hooks/useLogin.ts';

export const RegistrationForm = () => {
  const intl = useIntl();
  const loginToDashboard = useLogin();
  const formMethods = useForm<RegistrationFormSchema>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: defaultFormValues,
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<RegistrationFormSchema> = async (data) => {
    let response: AxiosResponse<JwtResponse | ErrorResponse>;
    try {
      response = await register(data.email, data.password);
    } catch (e) {
      console.error('connection error on register', e);
      setToastMessage(toastMessages.CONNECTION_ERROR(intl));
      return;
    }

    if (response.status === HttpStatusCode.Created) {
      loginToDashboard(response.data as JwtResponse);
      return;
    }
    if (response.status === HttpStatusCode.BadRequest) {
      const errors = response.data as ErrorResponse;
      propagateBackendErrors(
        formMethods.setError,
        errors.message as ValidationError[],
      );
      return;
    }

    setToastMessage(toastMessages.INTERNAL_ERROR(intl));
  };

  return (
    <FormProvider {...formMethods}>
      <form className="w-96" onSubmit={formMethods.handleSubmit(onSubmit)}>
        <Typography variant="h5" className="text-center">
          <FormattedMessage defaultMessage="Registration" id="qv7ied" />
        </Typography>
        <Typography variant="subtitle2" className="my-4">
          <FormattedMessage
            defaultMessage="Already have an account? "
            id="gWgSaX"
          />
          <Link component={RouterLink} to={routes.login}>
            <FormattedMessage defaultMessage="Log in →" id="bZk/Lp" />
          </Link>
        </Typography>
        <div className="py-4">
          <RHFInputField
            name={'email' satisfies FieldPath<RegistrationFormSchema>}
            label={intl.formatMessage({
              defaultMessage: 'Email',
              id: 'sy+pv5',
            })}
            inputProps={{
              autoComplete: 'email',
              variant: 'outlined',
              className: 'w-full mb-4',
              required: true,
            }}
          />
          <RHFInputField
            name={'password' satisfies FieldPath<RegistrationFormSchema>}
            label={intl.formatMessage({
              defaultMessage: 'Password',
              id: '5sg7KC',
            })}
            inputProps={{
              type: 'password',
              autoComplete: 'new-password',
              variant: 'outlined',
              className: 'w-full mb-4',
              required: true,
            }}
          />
          <Typography variant="caption">
            <FormattedMessage
              defaultMessage="Password should have at least 8 characters, and contain at least one lowercase, one uppercase, and one special character."
              id="hlf2ir"
            />
          </Typography>
        </div>
        <LoadingButton
          loading={formMethods.formState.isSubmitting}
          variant="contained"
          className="w-full"
          type="submit"
        >
          <FormattedMessage defaultMessage="Register" id="deEeEI" />
        </LoadingButton>
        <Toast
          open={!!toastMessage}
          onClose={() => setToastMessage(null)}
          message={toastMessage}
          type="error"
        />
      </form>
    </FormProvider>
  );
};
