import {Link, useHistory} from 'react-router-dom'
import {routes} from 'constants/routes'
import React, {useContext, useState} from 'react'
import {Button, FormGroup, FormControl, FormLabel, FormCheck, InputGroup} from 'react-bootstrap'
import ApiService from 'utils/apiService'
import AppContext from 'context/app'
import 'components/user/signup/Signup.scss'

/**
 * Stateful component responsible for rendering user registration form.
 * */
const UserSignup = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [isCheckboxChecked, setIsCheckboxChecked] = useState<boolean>(false)
  const {appState, setAppState} = useContext(AppContext);
  const history = useHistory();

  /**
   * Function executed on form submit if form validation is passed.
   * */
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // notify user if "password" and "confirm password" fields don't match
    if (password !== confirmPassword) {
      alert('Passwords don\'t match!')
      return
    }

    try {
      // perform user registration
      const tokenData = await ApiService.signUp(username, password)
      // check if user used arbitrary username, instead of a phone number or email address
      const isUsername = !username.startsWith('+') && username.indexOf('@') === -1

      // this app currently supports arbitrary username
      if (isUsername) {
        const {accessToken, did} = tokenData;

        ApiService.clientSideLogIn(accessToken, did);

        setAppState({
          ...appState,
          isAuthenticated: true,
          accessToken,
          didToken: did,
          username
        })

        history.push(routes.ROOT);
      }
      else {
        alert('Please provide a valid username (phone numbers and emails addresses are not allowed).')
      }
    } catch (error) {
      ApiService.alertWithBrowserConsole(error.message)
    }
  }

  /**
   * Simple form validation function.
   * It will check if username is not empty, if both "password" and "confirm password" fields have minimum 6 characters,
   * and if "terms and conditions" checkbox is checked.
   * */
  function validateForm() {
    return username.trim().length > 0 && password.trim().length >= 6 && confirmPassword.trim().length >= 6 && isCheckboxChecked
  }

  /**
   * Function for toggling "terms and conditions" checkbox.
   * */
  function toggleCheckbox() {
    isCheckboxChecked ? setIsCheckboxChecked(false) : setIsCheckboxChecked(true)
  }

  return (
    <form className='signup-form' onSubmit={onSubmit}>
      <FormGroup controlId='username'>
        <FormLabel className='label'>Username</FormLabel>
        <FormControl
          autoFocus
          className='input'
          type='text'
          value={username}
          onChange={ event => setUsername(event.target.value) }
        />
      </FormGroup>
      <FormGroup controlId='password'>
        <FormLabel className='label'>Password (minimum 6 characters)</FormLabel>
        <FormControl
          className='input'
          type='password'
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
      </FormGroup>
      <FormGroup controlId='confirmPassword'>
        <FormLabel className='label'>Confirm Password</FormLabel>
        <FormControl
          className='input'
          type='password'
          value={confirmPassword}
          onChange={event => setConfirmPassword(event.target.value)}
        />
      </FormGroup>
      <FormGroup controlId='checkbox'>
        <InputGroup>
          <FormCheck
            type="checkbox"
            checked={isCheckboxChecked}
            onChange={toggleCheckbox}
            className='signup-checkbox'
            label='I accept the terms and conditions'
          />
        </InputGroup>
      </FormGroup>
      <Button className='button' block disabled={!validateForm()} type='submit'>
        Sign Up
      </Button>
      <p className='link-label'>
        Already have an account?&nbsp;
        <Link to={routes.LOGIN} className='Link'>Login</Link>
      </p>
    </form>
  )
}

export default UserSignup;
