import React from 'react';
import UserLogin from 'components/user/login/Login';

/**
 * Stateless component responsible for rendering the login page.
 * */
const UserLoginPage = () => {
  return (
    <div className='page-form page-form--slim'>
      <h1 className='title'>Login</h1>
      <p>Login in order to continue.</p>
      <UserLogin/>
    </div>
  )
}

export default UserLoginPage;
