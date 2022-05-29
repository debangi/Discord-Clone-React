import { Button } from '@mui/material';
import { signInWithPopup } from 'firebase/auth';
import React from 'react';
import { auth, googleProvider } from '../firebase-config';
import './Login.css';

googleProvider.setCustomParameters({
  prompt: 'select_account',
});
const Login = () => {
  const signIn = () => {
    signInWithPopup(auth, googleProvider);
    // addCurrentUser(auth.currentUser);
  };
  return (
    <div className='login'>
      <div className='login__logo'>
        <img
          src='https://upload.wikimedia.org/wikipedia/en/thumb/9/98/Discord_logo.svg/600px-Discord_logo.svg.png'
          alt='logo'
        />
      </div>
      <Button onClick={signIn}>Sign In</Button>
    </div>
  );
};

export default Login;
