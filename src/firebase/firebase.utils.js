import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "",
    authDomain: "crwn-db-dcdad.firebaseapp.com",
    databaseURL: "https://crwn-db-dcdad.firebaseio.com",
    projectId: "crwn-db-dcdad",
    storageBucket: "crwn-db-dcdad.appspot.com",
    messagingSenderId: "143566032989",
    appId: "1:143566032989:web:15de27c47998269a72fdb4",
    measurementId: "G-NWVKCTBMDK"
  };

  firebase.initializeApp(config);

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }

    return userRef;
  }

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
