import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Header } from './Header.tsx';
import * as useLogoutModule from '../../auth/hooks/useLogout.ts';
import { Fragment } from 'react';
import { IntlProvider } from 'react-intl';

describe('Header', () => {
  it('should logout on logout click', async () => {
    const logoutMock = jest.fn();
    jest.spyOn(useLogoutModule, 'useLogout').mockReturnValue(logoutMock);

    render(
      <IntlProvider locale="en" defaultLocale="en" textComponent={Fragment}>
        <Header email="email@email.com" />,
      </IntlProvider>,
    );
    await userEvent.click(screen.getByText('Logout'));

    expect(logoutMock).toHaveBeenCalled();
  });
});
