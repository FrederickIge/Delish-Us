import {observable, action} from 'mobx';
import {auth} from '../firebase';
import firebase from 'firebase';

const db = firebase.firestore();

db.settings({
  timestampsInSnapshots: true
});

class UserStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable
  error = null;

  @observable
  registerForm = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null
  };

  @observable allUsers = []

  @observable currentUserComments = []
  @observable currentUserSpots = []
  @observable selectedUser = {

   }

  @observable
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/dashboard',
    // We will display Google and Facebook as auth providers.
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: (data) => {
        console.log(data);
        // this.createUser(data.user)
        this.createUser(data.user);
      }
    }
  };

  @action
  emailLogin = (email, password) => {
    auth.doSignInWithEmailAndPassword(email, password).then(
      action('fetchSuccess', (response) => {
        this.rootStore.routingStore.push('/dashboard');
      }),
      action('fetchError', (error) => {
        this.error = error;
      })
    );
  };

  @action
  emailRegistration = () => {
    const {email, passwordOne} = this.registerForm;
    auth.doCreateUserWithEmailAndPassword(email, passwordOne).then(
      action('fetchSuccess', (authUser) => {
        authUser = firebase.auth().currentUser;
        this.updateDisplayName(authUser);
      }),
      action('fetchError', (error) => {
        this.error = error;
      })
    );
  };

  @action
  updateDisplayName = (user) => {
    const {username} = this.registerForm;
    user.updateProfile({displayName: username}).then(
      action('fetchSuccess', (authUser) => {
        this.createUser(user);
      }),
      action('fetchError', (error) => {
        this.error = error;
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

    console.log(newUser);

    const userRef = db.doc('users/' + newUser.uid);

    userRef
      .set({
        displayName: user.displayName,
        uid: user.uid,
        email: user.email
      })
      .then((data) => {
        this.rootStore.routingStore.push('/dashboard');
      });
  };


  getAllUsers = async () => {
    let querySnapshot = await this.rootStore.fireStore.getAllUsers();
    querySnapshot.forEach((doc) => {

      if (this.allUsers.find(x => x.userId === doc.data().uid)) {

      } else {
        this.allUsers.push({ username: doc.data().displayName, email: doc.data().email, userId: doc.data().uid })

      }
    });
  }

  getUserComments = async (userId) => {
    
    this.currentUserComments = [];

    let querySnapshot = await this.rootStore.fireStore.getUserComments(userId);

    querySnapshot.forEach((doc) => {
        this.currentUserComments.push({ 
          comment: doc.data().comment,
          spotName: doc.data().spotName,
          googlePlaceId:doc.data().googlePlaceId,
          spotId: doc.data().spotId,
         })
    });
  }

  getUserSpots = async (userId) => {
    
    this.currentUserSpots = [];

    let querySnapshot = await this.rootStore.fireStore.fetchSpotsByUserId(userId);

    querySnapshot.forEach((doc) => {
        this.currentUserSpots.push({ spotName: doc.data().name, googlePlaceId: doc.data().googlePlaceId })
    });
  }


}

export default UserStore;
