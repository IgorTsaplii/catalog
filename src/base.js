import { getFirestore } from "firebase/firestore/lite";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA4NiIIRmDygi9jNgk1eN_BhgNgNBX1rbs",
  authDomain: "catalog-react-74548.firebaseapp.com",
  databaseURL: "https://catalog-react-74548-default-rtdb.firebaseio.com",
  projectId: "catalog-react-74548",
  storageBucket: "catalog-react-74548.appspot.com",
  messagingSenderId: "900959448277",
  appId: "1:900959448277:web:a8eba8f20233e5135d065c",
  measurementId: "G-ZCBFKTJWYK",
};

export const app = initializeApp(firebaseConfig);
export const base = getFirestore(app);