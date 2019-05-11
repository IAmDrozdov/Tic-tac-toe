import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/storage';

const config = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FB_DATABASE_URL,
  projectId: process.env.REACT_APP_FB_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FB_MESSAGING_SENDER_ID
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.emailAuthProvider = app.auth.EmailAuthProvider;

    this.auth = app.auth();
    this.db = app.firestore();
    this.oldDb = app.database();
    this.storage = app.storage();
    this.storageRef = this.storage.ref();
    this.googleProvider = new app.auth.GoogleAuthProvider();

  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_FB_CONFIRMATION_EMAIL_REDIRECT
    })
  ;

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.trackOnlineStatus(authUser.uid);
        this.user(authUser.uid)
          .get()
          .then(doc => {
            const dbUser = doc.data();
            const mergedAuthUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser
            };

            next(mergedAuthUser);
          });
      } else {
        fallback();
      }
    });

  trackOnlineStatus = (uid) => {
    this.user(uid).update({ online: true });
    this.oldDb
      .ref(`status/${uid}`)
      .set({ online: true });
    this.oldDb
      .ref(`status/${uid}`)
      .onDisconnect()
      .set({ online: false });
  };

  user = uid => this.db.collection('users').doc(uid);

  users = () => this.db.collection('users');

  match = id => this.db.collection('matches').doc(id);

  activity = id => this.user(id).collection('activity');

  public = id => this.db.collection('public').doc(id);

  uploadAvatar = async (uid, file) => {
    const imgRef = this.storageRef.child(uid);
    await imgRef.put(file, {
      contentType: 'image/jpeg'
    });
    const imgUrl = await imgRef.getDownloadURL();
    await this.user(uid).update({ avatarUrl: imgUrl });
    return imgUrl;
  };

  removeAvatar = async (uid) => {
    const imgRef = this.storageRef.child(uid);
    if (imgRef) imgRef.delete();
    await this.user(uid).update({ avatarUrl: null });

  };
}

export default Firebase;