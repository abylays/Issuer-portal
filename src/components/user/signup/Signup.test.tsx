import React from 'react';
import {act, fireEvent, render} from '@testing-library/react';
import UserSignup from 'components/user/signup/Signup';
import {MemoryRouter} from 'react-router-dom';
import {routes} from 'constants/routes';
import ApiService from 'utils/apiService';
import userEvent from '@testing-library/user-event';

const getComponentElements = () => {
  const {getByRole, getByText, getByLabelText} = render(<MemoryRouter><UserSignup/></MemoryRouter>)

  return {
    usernameField: getByLabelText('Username'),
    passwordField: getByLabelText('Password (minimum 6 characters)'),
    passwordConfirmField: getByLabelText('Confirm Password'),
    termsAndConditionsCheckbox: getByLabelText('I accept the terms and conditions'),
    submitButton: getByRole('button', {name: 'Sign Up'}),
    loginLink: getByText('Login').closest('a'),
    loginParagraph: getByText('Already have an account?', {exact: false})
  }
}

const username = 'username';
const password = 'testPassword';
const shortPassword = 'test';
const confirmPassword = 'testPassword';
const confirmPasswordNotMatching = 'testPassword1';

interface PropField {
  field: HTMLElement,
  value: string
}

interface Props {
  username?: PropField,
  password: PropField,
  passwordConfirm: PropField,
  termAndConditions?: HTMLElement
}

const fillOutFields = (props: Props) => {
  if( props.username ) {
    fireEvent.change(props.username.field, {
      target: {
        value: props.username.value
      }
    })
  }

  fireEvent.change(props.password.field, {
    target: {
      value: props.password.value
    }
  })

  fireEvent.change(props.passwordConfirm.field, {
    target: {
      value: props.passwordConfirm.value
    }
  })

  if( props.termAndConditions ) {
    userEvent.click(props.termAndConditions)
  }
}

describe('User Signup component test', () => {
  test('Component renders', () => {
    const {
      usernameField,
      passwordField,
      passwordConfirmField,
      termsAndConditionsCheckbox,
      submitButton,
      loginLink,
      loginParagraph
    } = getComponentElements();

    expect(usernameField).toBeInTheDocument()
    expect(passwordField).toBeInTheDocument()
    expect(passwordConfirmField).toBeInTheDocument()
    expect(termsAndConditionsCheckbox).toBeInTheDocument()
    expect(loginParagraph).toBeInTheDocument()
    expect(loginLink).toHaveAttribute('href', routes.LOGIN)
    expect(submitButton).toHaveAttribute('disabled')
  })

  test('Input fields and form validation', async () => {
    const {
      usernameField,
      passwordField,
      passwordConfirmField,
      termsAndConditionsCheckbox,
      submitButton,
    } = getComponentElements();

    // test with too short password
    act(() => {
      fillOutFields({
        username: {
          field: usernameField,
          value: username
        },
        password: {
          field: passwordField,
          value: shortPassword
        },
        passwordConfirm: {
          field: passwordConfirmField,
          value: shortPassword
        }
      })
    })

    expect(submitButton).toHaveAttribute('disabled')

    // update password to more than 6 characters
    act(() => {
      fillOutFields({
        password: {
          field: passwordField,
          value: password
        },
        passwordConfirm: {
          field: passwordConfirmField,
          value: confirmPassword
        }
      })
    })

    // test toggleCheckbox function
    act(() => {
      userEvent.click(termsAndConditionsCheckbox)
    })

    expect(submitButton).not.toHaveAttribute('disabled')
    expect(termsAndConditionsCheckbox).toBeChecked()

    act(() => {
      userEvent.click(termsAndConditionsCheckbox)
    })

    expect(submitButton).toHaveAttribute('disabled')
    expect(termsAndConditionsCheckbox).not.toBeChecked()
  })

  test('Form submit (pass)', async () => {const {
      usernameField,
      passwordField,
      passwordConfirmField,
      termsAndConditionsCheckbox,
      submitButton,
    } = getComponentElements();

    jest.spyOn(ApiService, 'signUp').mockReturnValue(Promise.resolve({
      accessToken: 'accessToken',
      did: 'did'
    }))

    jest.spyOn(ApiService, 'clientSideLogIn')

    act(() => {
      fillOutFields({
        username: {
          field: usernameField,
          value: username
        },
        password: {
          field: passwordField,
          value: password
        },
        passwordConfirm: {
          field: passwordConfirmField,
          value: confirmPassword
        },
        termAndConditions: termsAndConditionsCheckbox
      })
    })

    await act(async () => {
      await userEvent.click(submitButton)
    })

    expect(ApiService.signUp).toHaveBeenCalledTimes(1)
    expect(ApiService.clientSideLogIn).toHaveBeenCalledTimes(1)
  })

  test(`Form submit (fail, password and password confirm don't match)`, async () => {
    const {
      usernameField,
      passwordField,
      passwordConfirmField,
      termsAndConditionsCheckbox,
      submitButton,
    } = getComponentElements();

    jest.spyOn(window, 'alert').mockImplementation(() => {});

    act(() => {
      fillOutFields({
        username: {
          field: usernameField,
          value: username
        },
        password: {
          field: passwordField,
          value: password
        },
        passwordConfirm: {
          field: passwordConfirmField,
          value: confirmPasswordNotMatching
        },
        termAndConditions: termsAndConditionsCheckbox
      })
    })

    await act(async () => {
      await userEvent.click(submitButton)
    })

    expect(window.alert).toHaveBeenCalledWith(`Passwords don\'t match!`)
  })

  test(`Form submit (fail, ApiService.signUp returns Promise.reject)`, async () => {
    const {
      usernameField,
      passwordField,
      passwordConfirmField,
      termsAndConditionsCheckbox,
      submitButton,
    } = getComponentElements();

    jest.spyOn(window, 'alert').mockImplementation(() => {});
    jest.spyOn(ApiService, 'signUp').mockReturnValue(Promise.reject('No reason'))
    jest.spyOn(ApiService, 'alertWithBrowserConsole');

    act(() => {
      fillOutFields({
        username: {
          field: usernameField,
          value: username
        },
        password: {
          field: passwordField,
          value: password
        },
        passwordConfirm: {
          field: passwordConfirmField,
          value: confirmPassword
        },
        termAndConditions: termsAndConditionsCheckbox
      })
    })

    await act(async () => {
      await userEvent.click(submitButton)
    })

    expect(ApiService.alertWithBrowserConsole).toHaveBeenCalledTimes(1)
  })

  test(`Form submit (fail, invalid username)`, async () => {
    const {
      usernameField,
      passwordField,
      passwordConfirmField,
      termsAndConditionsCheckbox,
      submitButton,
    } = getComponentElements();

    jest.spyOn(window, 'alert').mockImplementation(() => {});
    jest.spyOn(ApiService, 'signUp').mockReturnValue(Promise.resolve())

    act(() => {
      fillOutFields({
        username: {
          field: usernameField,
          value: '+' + username
        },
        password: {
          field: passwordField,
          value: password
        },
        passwordConfirm: {
          field: passwordConfirmField,
          value: confirmPassword
        },
        termAndConditions: termsAndConditionsCheckbox
      })
    })

    await act(async () => {
      await userEvent.click(submitButton)
    })

    expect(window.alert).toHaveBeenCalledWith('Please provide a valid username (phone numbers and emails addresses are not allowed).')
  })
})
