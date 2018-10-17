import { observable, action } from "mobx";
import { auth } from "../firebase";
import axios from "axios";
import firebase from "firebase";

class UserStore {

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable
  error = null;

  @observable
  registerForm = {
    username: "",
    email: "",
    passwordOne: "",
    passwordTwo: "",
    error: null
  };


  @observable
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: "/searchSchools",
    // We will display Google and Facebook as auth providers.
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: data => {
        console.log(data)
        // this.createUser(data.user)
        this.createUser(data.user)
      }
    }
  };


  @action
  emailLogin = (email, password) => {
    console.log("aye");
    auth.doSignInWithEmailAndPassword(email, password).then(
      action("fetchSuccess", response => {
        this.rootStore.routingStore.push("/searchschools");
      }),
      action("fetchError", error => {
        this.error = error;
      })
    );
  };

  @action
  emailRegistration = () => {
   
   const { email, passwordOne } = this.registerForm
    auth.doCreateUserWithEmailAndPassword(email, passwordOne).then(
      action("fetchSuccess", authUser => {
        authUser = firebase.auth().currentUser;
        this.updateDisplayName(authUser);       
      }),
      action("fetchError", error => {
        console.log(error)
        // this.error = error;
      })
    );
  };

  @action
  updateDisplayName = (user) => {
    const { username } = this.registerForm
    user.updateProfile({ displayName: username}).then(
      action("fetchSuccess", authUser => {
        this.createUser(user)
      }),
      action("fetchError", error => {
        console.log(error)
      })
    );
  };

  @action
  createUser = (user) => {
    const newUser = {
      displayName: user.displayName,
      uid: user.uid,
      email: user.email
    };
    axios.post("api/users/createuser", newUser).then(
      action("fetchSuccess", response => {
        this.rootStore.routingStore.push("/searchschools");
      }),
      action("fetchError", error => {
        this.error = error;
      })
    );
  };

 


}

export default UserStore;
