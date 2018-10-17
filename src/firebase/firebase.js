import firebase from 'firebase/app';
import 'firebase/auth';
import * as firebaseui from 'firebaseui';

let loginUi = null;

const config = {
  apiKey: "AIzaSyCuUSuEVo_s9IBall-MpUvDQMdcSLmx7BI",
  authDomain: "react-fire-9a99e.firebaseapp.com",
  databaseURL: "https://react-fire-9a99e.firebaseio.com",
  projectId: "react-fire-9a99e",
  storageBucket: "react-fire-9a99e.appspot.com",
  messagingSenderId: "528027897230"
}

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/searchschools",
  // We will display Google and Facebook as auth providers.
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: data => {
   
      this.props.history.push("/searchschools");
    }
  }
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
     loginUi = new firebaseui.auth.AuthUI(firebase.auth());
  }

  const auth = firebase.auth();

export {
  auth,
  loginUi,
  uiConfig
};