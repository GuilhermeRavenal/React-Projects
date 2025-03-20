import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAgq_F6sNg_uyfFe9LpGi9UrOTsZGB1ovs",
    authDomain: "curso-3911c.firebaseapp.com",
    projectId: "curso-3911c",
    storageBucket: "curso-3911c.appspot.com",
    messagingSenderId: "441932864976",
    appId: "1:441932864976:web:3d520579493cfb945fedd5",
    measurementId: "G-DJYZWCTNXH"
  };

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp)

export { db, auth };