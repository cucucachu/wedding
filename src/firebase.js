

import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, doc, getDocs, setDoc } from 'firebase/firestore';

import firebaseConfig from '../firebase.config.json';


export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();


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

export async function createGuestAccount(guest, password) {
    const userCredential = await createUserWithEmailAndPassword(auth, guest.email, password);

    guest.uid = userCredential.user.uid;
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