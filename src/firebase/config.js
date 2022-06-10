import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import "firebase/messaging"
const firebaseConfig = {
    apiKey: "AIzaSyBsRXOlQSmrcqDmqWfVfaOW0uoCDIg6ToU",
    authDomain: "olx-clone-44fe1.firebaseapp.com",
    projectId: "olx-clone-44fe1",
    storageBucket: "olx-clone-44fe1.appspot.com",
    messagingSenderId: "798439721897",
    appId: "1:798439721897:web:61d9c8a1afbec9d38f92b8",
    measurementId: "G-4TVWHYTBQW"
};
export default firebase.initializeApp(firebaseConfig)


