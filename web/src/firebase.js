

import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';

import axios from 'axios';

import firebaseConfig from '../firebase.config.json';

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();

const firebaseFunctions = axios.create({
    baseURL: 'https://us-central1-wedding-1be73.cloudfunctions.net/app',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST',
        'Authorization': `Bearer ${auth?.currentUser?.getIdToken(true)}`
    }
})

export const logout = () => auth.signOut();

export async function loginOrCreateGuestAccount(email, code) {
    let userCredential;

    try {
        userCredential = await signInWithEmailAndPassword(auth, email, code);
        console.log('sign in succesful');
        const guest = await getGuest({code});
        if (guest.uid !== userCredential.user.uid || guest.email !== email) {
            await deleteAccount(userCredential.user.uid);
            await logout();
            const error = new Error('Account email is different than guest email.')
            error.code = 1;
            throw error;
        }
    }
    catch (error) {
        if (error.code == 'auth/user-not-found') {
            userCredential = await createUserWithEmailAndPassword(auth, email, code);
            console.log('sign in unsuccessful');

            const guest = await getGuest({code});

            if (guest.uid) {
                await deleteAccount(userCredential.user.uid);
                await logout();
                throw new Error('An account already exists for this guest code, but the email given doesn\'t match.');
            }
            
            guest.uid = userCredential.user.uid;
            guest.email = email;
            await updateGuest(guest);
        }
        else if (error.code === 1) {
            throw error;
        }
    }
    
    return userCredential;
}


export async function getGuest({code, uid}) {
    if (!code && !uid) {
    }

    let querySnapshot;

    if (code) {
        querySnapshot = await getDocs(query(collection(db, 'guests'), where('code', '==', code)));
    }
    else if (uid) {
        querySnapshot = await getDocs(query(collection(db, 'guests'), where('uid', '==', uid)));
    }
    else {
        throw new Error('getGuest() called with no parameters.');
    }

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
    const response = await firebaseFunctions.post('/checkGuestCode', { code });
    return response.data;
}

export async function deleteAccount(uid) {
    const token = await auth?.currentUser?.getIdToken(true);

    const response = await firebaseFunctions.post('/deleteAccount', { uid }, {
        baseURL: 'https://us-central1-wedding-1be73.cloudfunctions.net/app',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
}