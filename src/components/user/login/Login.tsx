import React, {useContext, useState} from 'react'
import {Button, FormGroup, FormControl, FormLabel} from 'react-bootstrap'
import ApiService from 'utils/apiService';
import AppContext from 'context/app';
import {useHistory} from 'react-router-dom';
import {routes} from 'constants/routes';

/**
 * Stateful component responsible for user login.
 * It renders a simple form with "username" and "password" fields.
 * */
const UserLogin = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {appState, setAppState} = useContext(AppContext);
  const history = useHistory();

  /**
   * Function executed on valid form submit.
   * If login was successful, it will store access and DID tokens into localstorage,
   * update app state and redirect to "/".
   * */
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const {accessToken, did} = await ApiService.logIn(username, password)

      ApiService.clientSideLogIn(accessToken, did);

      setAppState({
        ...appState,
        isAuthenticated: true,
        accessToken,
        didToken: did,
        username
      })

      history.push(routes.ROOT);

    } catch (error) {
      ApiService.alertWithBrowserConsole(error.message)
    }
  }

  /**
   * Simple form validation function.
   * */
  function validateForm() {
    return username.length > 0 && password.length > 0
  }

  return (
    <form className='login-form' onSubmit={onSubmit}>
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
        <FormLabel className='label'>Password</FormLabel>
        <FormControl
          className='input'
          type='password'
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
      </FormGroup>
      <Button className='button' block disabled={!validateForm()} type='submit'>
        Log in
      </Button>
    </form>
  )
}

export default UserLogin;
