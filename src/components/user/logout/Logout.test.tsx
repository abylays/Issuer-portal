import React from "react";
import UserLogout from "components/user/logout/Logout";
import {act, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ApiService from 'utils/apiService';

describe('User Logout component test', () => {
  test('Render the logout element', () => {
    const {getByText} = render(<UserLogout />);

    expect(getByText('Logout')).toBeInTheDocument();
  });

  test('Match inline snapshot', () => {
    const {container} = render(<UserLogout />);

    expect(container.firstChild).toMatchInlineSnapshot(`
        <span
          class="logout"
        >
          Logout
        </span>
    `);
  });

  test('Logout functionality (pass)', async () => {
    const {getByText} = render(<UserLogout />);
    const logoutElement = getByText('Logout');

    jest.spyOn(window, 'alert').mockImplementation(() => {});
    jest.spyOn(ApiService, 'logout').mockReturnValue(Promise.resolve());

    await act(async () => {
      await userEvent.click(logoutElement);
    })

    expect(ApiService.logout).toBeCalledTimes(1)
    expect(window.alert).toBeCalledWith('You have been successfully signed out from all devices.');
  })

  test('Logout functionality (fail)', async () => {
    const {getByText} = render(<UserLogout />);
    const logoutElement = getByText('Logout');

    jest.spyOn(window, 'alert').mockImplementation(() => {});
    jest.spyOn(ApiService, 'alertWithBrowserConsole');
    jest.spyOn(ApiService, 'logout').mockReturnValue(Promise.reject('No reason'));

    await act(async () => {
      await userEvent.click(logoutElement);
    })

    expect(ApiService.logout).toBeCalledTimes(1);
    expect(ApiService.alertWithBrowserConsole).toBeCalledTimes(1);
  })
});
