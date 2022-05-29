import React, { useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import { selectUser } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Login from './components/Login';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase-config';
import { login, logout } from './features/userSlice';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(
          login({
            uid: currentUser.uid,
            photo: currentUser.photoURL,
            email: currentUser.email,
            displayName: currentUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className='app'>
      {user ? (
        <>
          <Sidebar />
          <Chat />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;

//2:13:00 hr
