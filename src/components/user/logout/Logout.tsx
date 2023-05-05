import React, {useContext} from 'react'
import ApiService from 'utils/apiService';
import AppContext, {appContextDefaultValue} from 'context/app';

/**
 * Stateless component responsible for logging out user.
 * */
const UserLogout = () => {
  const {appState, setAppState} = useContext(AppContext)

  /**
   * Function for logging out user and updating app state to
   * reflect that action.
   * */
  const userLogOut = async () => {
    try {
      await ApiService.logout()

      alert('You have been successfully signed out from all devices.')

      setAppState({
        ...appState,
        ...appContextDefaultValue.appState
      })

    } catch (error) {
      ApiService.alertWithBrowserConsole(error.message)
    }
  }

  return (
    <span className='logout' onClick={userLogOut}>Logout</span>
  )
}

export default UserLogout;
