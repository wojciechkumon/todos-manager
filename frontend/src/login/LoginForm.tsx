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
import { RHFInputField } from '../common/form/RHFInputField.tsx';
import { ErrorResponse, ValidationError } from '../api/error-response.ts';
import { useState } from 'react';
import { toastMessages } from '../common/toast/toast-messages.ts';
import { Toast } from '../common/toast/Toast.tsx';
import {
  defaultFormValues,
  loginFormSchema,
  LoginFormSchema,
} from './login-form-schema.ts';
import { JwtResponse } from '../api/JwtResponse.ts';
import { login } from '../api/login.ts';
import { propagateBackendErrors } from '../common/form/propagate-backend-errors.ts';
import { useLogin } from '../auth/hooks/useLogin.ts';

export const LoginForm = () => {
  const intl = useIntl();
  const loginToDashboard = useLogin();
  const formMethods = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: defaultFormValues,
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [invalidCredentialsError, setInvalidCredentialsError] =
    useState<boolean>(false);

  const onSubmit: SubmitHandler<LoginFormSchema> = async (data) => {
    setInvalidCredentialsError(false);

    let response: AxiosResponse<JwtResponse | ErrorResponse>;
    try {
      response = await login(data.email, data.password);
    } catch (e) {
      console.error('connection error on login', e);
      setToastMessage(toastMessages.CONNECTION_ERROR(intl));
      return;
    }

    if (response.status === HttpStatusCode.Ok) {
      loginToDashboard(response.data as JwtResponse);
      return;
    }
    if (response.status === HttpStatusCode.Unauthorized) {
      setInvalidCredentialsError(true);
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

    setToastMessage(toastMessages.SOMETHING_WENT_ERROR(intl));
  };

  return (
    <FormProvider {...formMethods}>
      <form className="w-96" onSubmit={formMethods.handleSubmit(onSubmit)}>
        <Typography variant="h5" className="text-center">
          <FormattedMessage defaultMessage="Login" id="AyGauy" />
        </Typography>
        <Typography variant="subtitle2" className="my-4">
          <FormattedMessage
            defaultMessage="Don't have an account yet? "
            id="s3cJjI"
          />
          <Link component={RouterLink} to={routes.register}>
            <FormattedMessage defaultMessage="Register →" id="DaABG7" />
          </Link>
        </Typography>
        <div className="py-4">
          <RHFInputField
            name={'email' satisfies FieldPath<LoginFormSchema>}
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
            name={'password' satisfies FieldPath<LoginFormSchema>}
            label={intl.formatMessage({
              defaultMessage: 'Password',
              id: '5sg7KC',
            })}
            inputProps={{
              type: 'password',
              autoComplete: 'current-password',
              variant: 'outlined',
              className: 'w-full',
              required: true,
            }}
          />
        </div>
        {invalidCredentialsError && (
          <Typography variant="body2" className="text-red-500 text-center">
            <FormattedMessage
              defaultMessage="Invalid email or password"
              id="vA7hey"
            />
          </Typography>
        )}
        <LoadingButton
          loading={formMethods.formState.isSubmitting}
          variant="contained"
          className="w-full mt-8"
          type="submit"
        >
          <FormattedMessage defaultMessage="Login" id="AyGauy" />
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
