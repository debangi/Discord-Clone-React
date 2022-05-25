import 'firebase/compat/firestore';
import { initializeApp } from '@firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCDcuVY9haNXKxDShWJjo0XiliMbmU2w2I',
  authDomain: 'discord-clone-60908.firebaseapp.com',
  projectId: 'discord-clone-60908',
  storageBucket: 'discord-clone-60908.appspot.com',
  messagingSenderId: '298445629560',
  appId: '1:298445629560:web:673a62155dd2099e0c258d',
};

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth(firebaseApp);
