import React from 'react';
import SignIn from './components/SignIn/SignIn';
import './Auth.scss';

function Auth() {
  return (
    <div className="container">
      <h1>Game Track</h1>
      <SignIn />
    </div>
  );
}

export default Auth;
