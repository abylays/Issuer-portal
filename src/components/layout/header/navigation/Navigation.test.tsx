import React from 'react';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import LayoutHeaderNavigation from 'components/layout/header/navigation/Navigation';
import {Router} from 'react-router-dom'
import AppContext, {appContextDefaultValue, AppContextState} from 'context/app';
import { createMemoryHistory } from 'history';
import {routes} from 'constants/routes';

const history = createMemoryHistory()
const testUserName = 'testUser';

function renderNavigationWithContext(options?: Partial<AppContextState>) {
  return render(
    <Router history={history}>
      <AppContext.Provider value={{
        appState: {...appContextDefaultValue.appState, ...options},
        setAppState: () => {}
      }}>
        <LayoutHeaderNavigation />
      </AppContext.Provider>
    </Router>
  )
}

describe('Layout Header Navigation component test', () => {
  test('Check if component renders properly (user not logged in)', () => {
    const {getByText} = renderNavigationWithContext();
    const signUpAnchor = getByText('Sign Up');
    const loginAnchor = getByText('Login')

    expect(getByText('Sign Up')).toBeTruthy();
    expect(getByText('Login')).toBeTruthy();

    userEvent.click(signUpAnchor);

    expect(history.location.pathname).toBe(routes.SIGNUP)

    userEvent.click(loginAnchor);

    expect(history.location.pathname).toBe(routes.LOGIN)
  })

  test('Check if component renders properly (user logged in)', () => {
    const {getByText} = renderNavigationWithContext({username: testUserName, isAuthenticated: true});

    expect(getByText('Logout')).toBeTruthy();
    expect(getByText(testUserName, {exact: false})).toBeTruthy();
  })

  test('Check if navigation toggles', () => {
    Object.defineProperty(global, 'innerWidth', {writable: true, configurable: true, value: 200})
    global.dispatchEvent(new Event('resize'));

    const {getByRole, container} = renderNavigationWithContext();

    const toggleButton = getByRole('button', {name: 'Toggle navigation'});
    const navbar = container.querySelector('.navbar-collapse');

    expect(toggleButton).toBeTruthy()

    if( navbar ) {
      expect(navbar.classList.contains('show')).toBeFalsy();

      userEvent.click(toggleButton);

      expect(navbar.classList.contains('show')).toBeTruthy();
    }
    else {
      throw new Error(`Navbar element doesn't exist.`)
    }
  })
})
