import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAZYiHungOKy0fgTnLGgQYPfaZ3d6j5_uo",
  authDomain: "codex-oficial-chat.firebaseapp.com",
  projectId: "codex-oficial-chat",
  storageBucket: "codex-oficial-chat.firebasestorage.app",
  messagingSenderId: "98599997360",
  appId: "1:98599997360:web:d9efddd87ea4c23b1a5075"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, query, orderBy, onSnapshot };