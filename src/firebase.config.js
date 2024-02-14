import { getApp, getApps, initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBYLxdmEc5E_RNN0CJBYIwfytB26-gdlzw",
    authDomain: "resturantapp-c75e4.firebaseapp.com",
    databaseURL: "https://resturantapp-c75e4-default-rtdb.firebaseio.com",
    projectId: "resturantapp-c75e4",
    storageBucket: "resturantapp-c75e4.appspot.com",
    messagingSenderId: "791205606569",
    appId: "1:791205606569:web:729d6aae1ff7e62542e5b8"
  };

  const app = getApps.length > 0 ? getApp : initializeApp(firebaseConfig);
  const firestore = getFirestore(app)
  const storage = getStorage(app)

  export {app, firestore, storage};