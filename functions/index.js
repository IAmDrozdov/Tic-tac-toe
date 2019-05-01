const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const firestore = admin.app().firestore();

exports.onUserStatusChanged = functions.database
  .ref('/status/{userId}')
  .onUpdate((change, context) => {
    const usersRef = firestore.collection('users');
    const { online } = change.after.val();
    if (!online) {
      usersRef
        .doc(context.params.userId)
        .update({ online: false });
    }
  });