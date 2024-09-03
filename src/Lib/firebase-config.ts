import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD7BTaGB5RPTfb2ORCAg_IPBM3iGnOudXQ",
  authDomain: "todolist-a1fcb.firebaseapp.com",
  projectId: "todolist-a1fcb",
  storageBucket: "todolist-a1fcb.appspot.com",
  messagingSenderId: "33237072739",
  appId: "1:33237072739:web:eae533fc0c4aff0ef8f156"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
