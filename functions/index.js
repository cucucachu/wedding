const functions = require("firebase-functions");
const admin = require('firebase-admin');
const express = require('express');
const cookieParser = require('cookie-parser')();
const cors = require('cors')({origin: true});

const app = express();
const fireabseApp = admin.initializeApp();
const db = admin.firestore(fireabseApp);
const auth = admin.auth();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

app.use(cors);
app.use(cookieParser);

app.use(async (request, response, next) => {
    try {
        await next();
    }
    catch(error) {
        console.log(`Hard error: ${error.message}`);

        response.body = {
            error: error.message,
        }
        response.status = 500;
    }
});

// Taken from https://github.com/firebase/functions-samples/blob/main/authorized-https-endpoint/functions/index.js
// Returns decoded Id token for user if request contains a valid Auth BEARER token, or valid auth cookie.
//  otherwise returns false;
const authenticatedRequest = async request => {  
    if ((!request.headers.authorization || !request.headers.authorization.startsWith('Bearer ')) &&
        !(request.cookies && request.cookies.__session)) {
            // No Auth Header or Cookie
            return false;
    }  
    
    let idToken;
    if (request.headers.authorization && request.headers.authorization.startsWith('Bearer ')) {
        console.log('BEARER TOKEN Found');
        // Read the ID Token from the Authorization header.
        idToken = request.headers.authorization.split('Bearer ')[1];
        console.log(idToken);
    } else if(request.cookies) {
        console.log('Cookie Found');
        // Read the ID Token from cookie.
        idToken = request.cookies.__session;
    } else {
        console.log('No Auth Found');
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

app.post('/checkGuestCode', async (request, response) => {
    let { code } = request.body;

    let valid = false;

    if (code) {
        code = code.toUpperCase();
        const querySnap = await db.collection('guests').where('code', '==', code).get();
        valid = !querySnap.empty;
    }

    response.json({valid});
});

app.post('/deleteAccount',  async (request, response) => {
    let { uid } = request.body;

    if (await authenticatedRequest(request)) {
        try {
            await auth.deleteUser(uid);
            response.json({success: true, message: 'Account Deleted'});
        }
        catch (error) {
            response.json({success: false, message: error.message});
        }
    }
    else {
        response.status = 401;
        response.json({error: 'Unauthenticated'});
    }
});

exports.app = functions.https.onRequest(app);