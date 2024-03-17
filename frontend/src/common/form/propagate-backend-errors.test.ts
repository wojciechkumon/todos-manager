import { propagateBackendErrors } from './propagate-backend-errors.ts';
import { ValidationError } from '../../api/error-response.ts';

describe('propagate-backend-errors', () => {
  it('should set error for all received validation errors', () => {
    const setErrorMock = jest.fn();
    const validationErrors: ValidationError[] = [
      {
        target: {
          email: 'abc',
          password: 'pass',
        },
        value: 'abc',
        property: 'email',
        children: [],
        constraints: { isEmail: 'email must be an email' },
      },
      {
        target: {
          email: 'abc',
          password: 'pass',
        },
        value: 'pass',
        property: 'password',
        children: [],
        constraints: { isStrongPassword: 'password is not strong enough' },
      },
    ];

    propagateBackendErrors(setErrorMock, validationErrors);

    expect(setErrorMock).toHaveBeenCalledTimes(2);
    expect(setErrorMock).toHaveBeenCalledWith('email', {
      message: 'email must be an email',
      type: 'custom',
    });
    expect(setErrorMock).toHaveBeenCalledWith('password', {
      message: 'password is not strong enough',
      type: 'custom',
    });
  });
});
