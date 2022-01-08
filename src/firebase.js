

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import firebaseConfig from '../firebase.config.json';


export const app = initializeApp(firebaseConfig);
export const auth = getAuth();