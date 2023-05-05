import React from 'react';
import UserSignup from 'components/user/signup/Signup';

/**
 * Stateless component responsible for rendering the registration page.
 * */
const UserSignupPage = () => {
  return (
    <div className='page-form page-form--slim'>
      <h1 className='title'>Create account</h1>
      <p>Welcome to your personal wallet. Here you will be able to store, view and manage your digital identity.</p>
      <p>In order to access your wallet you will need to set up a password first</p>
      <UserSignup/>
    </div>
  )
}

export default UserSignupPage;
