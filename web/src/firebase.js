

import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';

import axios from 'axios';

import firebaseConfig from '../firebase.config.json';


export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();




export async function getGuest(code) {
    const querySnapshot = await getDocs(query(collection(db, 'guests'), where('code', '==', code)));
    if (querySnapshot.isEmpty) {
        return null;
    }
    const guests = [];

    for (let doc of querySnapshot.docs) {
        const guest = doc.data();


        guests.push({
            id: doc.id,
            name: `${guest.firstName} ${guest.lastName}`,
            ...guest,
        });

        guests.sort((a, b) => a.lastName - b.lastName);
    }

    return guests[0];
    
}


export async function getGuests() {
    const querySnapshot = await getDocs(collection(db, 'guests'));
    if (!querySnapshot.isEmpty) {
        const guests = [];

        for (let doc of querySnapshot.docs) {
            const guest = doc.data();


            guests.push({
                id: doc.id,
                name: `${guest.firstName} ${guest.lastName}`,
                ...guest,
            });

            guests.sort((a, b) => a.lastName - b.lastName);
        }

        return guests;
    }
}

export async function updateGuest(guest) {
    if (!guest.id) {
        throw new Error('Attempting to update a guest that doesn\'t have an id.')
    }
    const id = guest.id;
    delete guest.id;
    delete guest.name;

    return setDoc(doc(db, 'guests', id), guest);
}

export async function createGuestAccount(email, code) {
    const guest = await getGuest(code);

    if (!guest) {
        throw new Error(`Could not find a guest with code ${code}`);
    }

    if (guest.uid) {
        throw new Error(`An account already exists for guest ${guest.id}`);
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, code);

    guest.uid = userCredential.user.uid;
    guest.email = email;
    await updateGuest(guest);
    
    return userCredential;
}

export async function getLists() {
    const querySnapshot = await getDocs(collection(db, 'lists'));
    if (!querySnapshot.isEmpty) {
        const lists = [];

        for (let doc of querySnapshot.docs) {
            const list = doc.data();

            lists.push({
                ...list,
                id: doc.id,
            });
        }

        lists.sort((a, b) => a.order - b.order);

        return lists;
    }
}

export async function updateList(list) {
    if (!list.id) {
        throw new Error('Attempting to update a list that doesn\'t have an id.')
    }
    const id = list.id;
    delete list.id;

    return setDoc(doc(db, 'lists', id), list);
}

export async function checkGuestCode(code) {
    const response = await axios.post(
        'https://us-central1-wedding-1be73.cloudfunctions.net/checkGuestCode',
         {
             code
        }, 
        {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,POST',
            }
        }
    );
    return response.data;
}