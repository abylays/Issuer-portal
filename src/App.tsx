import React, {useEffect, useState} from 'react';
import LayoutHeaderNavigation from 'components/layout/header/navigation/Navigation';
import Router from 'components/router/Router';
import AppContext, {appContextDefaultValue, AppContextState} from 'context/app';
import ApiService from 'utils/apiService';
import {apiInstances} from 'utils/api';
import {decodeAccessToken} from 'utils/jwt';
import 'App.scss';

/**
 * Root stateful component which wraps our app with a simple context.
 * */
function App() {
  const [appState, setAppState] = useState<AppContextState>({
    ...appContextDefaultValue.appState
  })

  useEffect(() => {
    const accessToken = ApiService.getAccessTokenFromLocalStorage();
    const didToken = ApiService.getDidTokenToLocalStorage();

    if( accessToken ) {
      const jwtToken = decodeAccessToken(accessToken);

      /**
       * On component mount, check if user access token is valid.
       * If not, log out user on client side.
       * */
      if( (jwtToken.exp * 1000) <= new Date().getTime() ) {

        ApiService.removeAccessAndDidTokens()

        alert('Your JWT token has expired. Please, log in again.')

        setAppState(prevState => {
          return {
            ...prevState,
            isAuthenticated: false,
          }
        })

        return;
      }
      else {
        /**
         * Log in user on client side, set authorization bearer token.
         * */
        ApiService.setAuthorizationBearer(accessToken);

        setAppState(prevState => {
          return {
            ...prevState,
            didToken: didToken || null,
            accessToken,
            isAuthenticated: true,
            username: decodeAccessToken(accessToken).username
          }
        })
      }
    }

    apiInstances.forEach(instance => {
      /**
       * In case of 401 HTTP responses, remove tokens from localstorage
       * and reset app context state (basically, log out user on client side).
       * */
      instance.interceptors.response.use(function (response) {
        return response;
      }, function (error) {
        if (401 === error.response.status) {
          ApiService.removeAccessAndDidTokens()

          setAppState({
            ...appState,
            ...appContextDefaultValue
          })

          alert('Your JWT token has expired. Please, log in again.')
        } else {
          return Promise.reject(error);
        }
      });
    })
  }, []);

  return (
    <AppContext.Provider value={{appState, setAppState}}>
      <LayoutHeaderNavigation/>
      <Router isUserAuthenticated={appState.isAuthenticated}/>
    </AppContext.Provider>
  )
}

export default App;
