import firebase from 'firebase/app';
import 'firebase/auth';
import * as firebaseui from 'firebaseui';

let loginUi = null;
let config = null;

const prodconfig = {
  apiKey: "AIzaSyBq7QJUkVJzxIM4OpCIh9hk7o4SimgDWC0",
  authDomain: "delish-prod.firebaseapp.com",
  databaseURL: "https://delish-prod.firebaseio.com",
  projectId: "delish-prod",
  storageBucket: "delish-prod.appspot.com",
  messagingSenderId: "489159126974"
};

const devconfig = {
  apiKey: "AIzaSyB91ib-e9kb_ODsGtKM6TatzPy58q4xtxo",
  authDomain: "delish-50d4b.firebaseapp.com",
  databaseURL: "https://delish-50d4b.firebaseio.com",
  projectId: "delish-50d4b",
  storageBucket: "delish-50d4b.appspot.com",
  messagingSenderId: "790815818945"
};

if (process.env.NODE_ENV === 'production') {
  config = prodconfig;
} else {
  config = devconfig;
}

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/dashboard',
  // We will display Google and Facebook as auth providers.
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: (data) => {
      this.props.history.push('/doglist');
    }
  }
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
  loginUi = new firebaseui.auth.AuthUI(firebase.auth());
}

const auth = firebase.auth();

export {auth, loginUi, uiConfig};
