import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAV2RQLC_bjhXfuvXEyiwWNovp53efKE4U",
  authDomain: "fin-book-39ba8.firebaseapp.com",
  projectId: "fin-book-39ba8",
  storageBucket: "fin-book-39ba8.appspot.com",
  messagingSenderId: "826334548531",
  appId: "1:826334548531:web:419375cc0065b456860946",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
