import 'firebase/auth'
import app from 'firebase/app'
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyDukkRvuMIiTxdAfF1xeWCWUfNgMaBc05M",
    authDomain: "to-do-list-b60c9.firebaseapp.com",
    databaseURL: "https://to-do-list-b60c9.firebaseio.com",
    projectId: "to-do-list-b60c9",
    storageBucket: "to-do-list-b60c9.appspot.com",
    messagingSenderId: "359771167146",
    appId: "1:359771167146:web:e5f36718b9a689861ab3d3",
    measurementId: "G-QKYX5GVCTK"
  };

  class Firebase {
    constructor() {
      app.initializeApp(firebaseConfig)
      
      this.auth = app.auth()
      this.db = app.firestore()
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();
    
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
 
    doPasswordUpdate = password =>
      this.auth.currentUser.updatePassword(password);
    
    user = uid => this.db.collection(uid);
 
    users = () => this.db.collection('users');
  }
 
  export default Firebase;
 

