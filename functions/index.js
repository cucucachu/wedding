const functions = require("firebase-functions");
const admin = require('firebase-admin');
const express = require('express');
const cookieParser = require('cookie-parser')();
const cors = require('cors')({origin: true});

const app = express();
const fireabseApp = admin.initializeApp();
const db = admin.firestore(fireabseApp);
const auth = admin.auth();

const { updateGuestList, ClientError } = require('./editGuestList')

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

app.use(cors);
app.use(cookieParser);


// Taken from https://github.com/firebase/functions-samples/blob/main/authorized-https-endpoint/functions/index.js
// Returns decoded Id token for user if request contains a valid Auth BEARER token, or valid auth cookie.
//  otherwise returns false;
const isAuthenticatedRequest = async request => {  
    if ((!request.headers.authorization || !request.headers.authorization.startsWith('Bearer ')) &&
        !(request.cookies && request.cookies.__session)) {
            // No Auth Header or Cookie
            return false;
    }  
    
    let idToken;
    if (request.headers.authorization && request.headers.authorization.startsWith('Bearer ')) {
        // console.log('BEARER TOKEN Found');
        // Read the ID Token from the Authorization header.
        idToken = request.headers.authorization.split('Bearer ')[1];
    } else if(request.cookies) {
        // console.log('Cookie Found');
        // Read the ID Token from cookie.
        idToken = request.cookies.__session;
    } else {
        // console.log('No Auth Found');
      // No cookie
        return false;
    }

    try {
        // If token is valid, return the decoded token
        return admin.auth().verifyIdToken(idToken);
    } catch (error) {
        console.log('Invalid Token');
        // Invalid Token
        return false;
    }
}

const isHost = async request => {
    const idToken = await isAuthenticatedRequest(request);

    if (!idToken) {
        return false;
    }

    const host = await db.collection('hosts').where('uid', '==', idToken.uid);

    if (host.empty) {
        return false;
    }
    
    return true;
}

app.post('/checkGuestCode', async (request, response) => {
    console.log('/checkGuestCode');
    let { code } = request.body;

    let valid = false;

    if (code) {
        code = code.toUpperCase();
        const querySnap = await db.collection('guests').where('code', '==', code).get();
        valid = !querySnap.empty;
    }

    response.json({valid});
});

app.post('/getRSVPDueDate', async (request, response) => {
    console.log('/getRSVPDueDate');
    let { id } = request.body;

    if (!id) {
        // throw new ClientError('/getRSVPDueDate called without a id')
        response.status(400);
        response.json({
            success: false,
            message: '/getRSVPDueDate called without a id',
            id,
        });
        response.send();
    }

    const listsSnap = await db.collection('lists').where('guests', 'array-contains', id).get();

    if (listsSnap.empty) {
        // throw new ClientError(`/getRSVPDueDate called with unknown uid "${id}"`);
        
        response.status(400);
        response.json({
            success: false,
            message: '/getRSVPDueDate couldn\'t find a guest on a list with this id',
            id,
        });
        response.send();
    }

    let rsvpDate = '';
    for (let listDoc of listsSnap.docs) {
        rsvpDate = listDoc.data().rsvpDate;
    }

    response.json({rsvpDate});
});

app.post('/deleteAccount',  async (request, response) => {
    console.log('/deleteAccount');
    let { uid } = request.body;

    if (await isAuthenticatedRequest(request)) {
        // try {
            await auth.deleteUser(uid);
            response.json({success: true, message: 'Account Deleted'});
        // }
        // catch (error) {
        //     response.json({success: false, message: error.message});
        //     response.status(500);
        // }
    }
    else {
        response.status(401);
        response.json({error: 'Unauthenticated'});
    }
});

app.post('/updateGuestList', async (request, response) => {
    console.log('/updateGuestList');
    let { list, guests } = request.body;

    const allowed = await isHost(request);

    // if id Token and a host
    if (allowed) {
        // try {
            const { updatedList, updatedGuests} = await updateGuestList(db, list, guests);

            response.json({
                success: true, 
                message: 'List Updated', 
                requested: { 
                    list, 
                    guests 
                }, 
                updated: {
                    list: updatedList, 
                    guests: updatedGuests
                }
            });
        // }
        // catch (error) {
        //     response.json({success: false, message: error.message});
        //     if (error instanceof ClientError) {
        //         response.status(400);
        //     }
        //     else {
        //         response.status(500);
        //     }
        // }
    }
    else {
        response.status(403);
        response.json({error: 'Unauthorized'});
    }
});

app.use((error, request, response, next) => {
    if (error) {
        response.json({success: false, message: error.message});
        
        if (error instanceof ClientError) {
            response.status(400);
        }
        else {
            console.log(`Hard error: ${error.message}`);
            response.status(500);
        }

        response.send();        
    }
});

exports.app = functions.https.onRequest(app);