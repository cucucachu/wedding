const functions = require("firebase-functions");
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});

const app = admin.initializeApp();
const db = admin.firestore(app);

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.checkGuestCode = functions.https.onRequest(async (request, response) => {
    cors(request, response, async () => {
        let { code } = request.body;
    
        let valid = false;
    
        if (code) {
            code = code.toUpperCase();
            const querySnap = await db.collection('guests').where('code', '==', code).get();
            valid = !querySnap.empty;
        }
    
        response.json({valid});
    });
});
