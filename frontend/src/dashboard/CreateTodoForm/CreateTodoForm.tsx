import {
  FieldPath,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { Typography } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import { RHFInputField } from '../../common/form/RHFInputField.tsx';
import LoadingButton from '@mui/lab/LoadingButton';
import { Toast, ToastProps } from '../../common/toast/Toast.tsx';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  todoFormSchema,
  defaultFormValues,
  TodoFormSchema,
} from './create-todo-form-schema.ts';
import { useState } from 'react';
import { createTodoItem, TodoItemDto } from '../../api/todos.ts';
import { AxiosResponse, HttpStatusCode } from 'axios';
import { toastMessages } from '../../common/toast/toast-messages.ts';
import { propagateBackendErrors } from '../../common/form/propagate-backend-errors.ts';
import { ErrorResponse, ValidationError } from '../../api/error-response.ts';
import { useLogout } from '../../auth/hooks/useLogout.ts';

export const CreateTodoForm = () => {
  const logout = useLogout();
  const intl = useIntl();
  const formMethods = useForm<TodoFormSchema>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: defaultFormValues,
  });
  const [toastMessage, setToastMessage] = useState<{
    message: string;
    type: ToastProps['type'];
  } | null>(null);

  const onSubmit: SubmitHandler<TodoFormSchema> = async (data) => {
    let response: AxiosResponse<TodoItemDto | ErrorResponse>;
    try {
      response = await createTodoItem(data.content);
    } catch (e) {
      console.error('connection error on login', e);
      setToastMessage({
        type: 'error',
        message: toastMessages.CONNECTION_ERROR(intl),
      });
      return;
    }

    if (response.status === HttpStatusCode.Created) {
      setToastMessage({
        type: 'success',
        message: intl.formatMessage({
          defaultMessage: 'Todo item successfully created!',
          id: 'MAkIeU',
        }),
      });
      formMethods.reset(defaultFormValues);
      return;
    }
    if (response.status === HttpStatusCode.Unauthorized) {
      logout();
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

    setToastMessage({
      type: 'error',
      message: toastMessages.INTERNAL_ERROR(intl),
    });
  };

  return (
    <div className="flex">
      <div className="rounded bg-stone-700 p-11 pb-8 m-auto">
        <FormProvider {...formMethods}>
          <form className="w-96" onSubmit={formMethods.handleSubmit(onSubmit)}>
            <Typography variant="h5" className="text-center">
              <FormattedMessage
                defaultMessage="Create a new todo item"
                id="DbkCFr"
              />
            </Typography>
            <div className="py-4">
              <RHFInputField
                name={'content' satisfies FieldPath<TodoFormSchema>}
                label={intl.formatMessage({
                  defaultMessage: 'Content',
                  id: 'Jq3FDz',
                })}
                inputProps={{
                  multiline: true,
                  minRows: 3,
                  variant: 'outlined',
                  className: 'w-full mb-4',
                  required: true,
                }}
              />
            </div>
            <LoadingButton
              loading={formMethods.formState.isSubmitting}
              variant="contained"
              className="w-full mt-8"
              type="submit"
            >
              <FormattedMessage defaultMessage="Add" id="2/2yg+" />
            </LoadingButton>
            <Toast
              open={!!toastMessage}
              onClose={() => setToastMessage(null)}
              message={toastMessage?.message}
              type={toastMessage?.type || 'success'}
            />
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
