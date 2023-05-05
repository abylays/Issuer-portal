import React, {Dispatch, SetStateAction} from 'react';

export interface AppContextState {
  accessToken: null | string,
  didToken: null | string,
  isAuthenticated: boolean,
  username: null | string,
}

export interface AppContextProperties {
  appState: AppContextState,
  setAppState: Dispatch<SetStateAction<AppContextState>>
}

/**
 * Centralized object for storing important app properties.
 * For the purpose of this app, React Context was used instead of a
 * store manager like React Redux.
 * */
export const appContextDefaultValue: AppContextProperties = {
  appState: {
    accessToken: null,
    didToken: null,
    isAuthenticated: false,
    username: null
  },
  setAppState: state => {}
}

// expose app context
const AppContext = React.createContext<AppContextProperties>(appContextDefaultValue);

export default AppContext
