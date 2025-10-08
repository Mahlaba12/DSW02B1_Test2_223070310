// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

/**
 * Replace below config with your Firebase project config.
  * You can find it in Firebase console -> project settings -> SDK config
   */
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
         databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
           projectId: "YOUR_PROJECT_ID",
             storageBucket: "YOUR_STORAGE_BUCKET",
               messagingSenderId: "YOUR_MSG_SENDER_ID",
                 appId: "YOUR_APP_ID"
                 };

                 const app = initializeApp(firebaseConfig);
                 export const auth = getAuth(app);
                 export const db = getDatabase(app);
                 export default app;