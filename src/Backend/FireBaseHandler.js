import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';
import {getDatabase} from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBY8-76Fi_xrOQX_LaInsWcrCUKiBbRhbk",
  authDomain: "test-project-b5a9d.firebaseapp.com",
  databaseURL: "https://test-project-b5a9d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "test-project-b5a9d",
  storageBucket: "test-project-b5a9d.appspot.com",
  messagingSenderId: "1090602685679",
  appId: "1:1090602685679:web:1b9dc915d1cb76250c371a"
};

const app = initializeApp(firebaseConfig);
export const firebaseStorage = getStorage(app);
export const firebaseDatabase = getDatabase(app);