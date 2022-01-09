

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

import firebaseConfig from '../firebase.config.json';


export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();

export async function updateGuest(guest) {
    if (!guest.id) {
        throw new Error('Attempting to update a guest that doesn\'t have an id.')
    }
    const id = guest.id;
    delete guest.id;
    delete guest.name;

    return setDoc(doc(db, 'guests', id), guest);
}