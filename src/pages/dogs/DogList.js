import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {compose} from 'recompose';
import posed from 'react-pose';
import firebase from 'firebase';

import withAuthorization from '../../components/hoc/withAuthorization';

const db = firebase.firestore();

db.settings({
  timestampsInSnapshots: true
});

const Slide = posed.div({
  enter: {x: 0, opacity: 1},
  exit: {x: -50, opacity: 0}
});

const Dogs = ({dogs}) => {
  return (
    <div>
      {dogs.map((dog) => (
        <div key={dog.key} className="col-md-4 hvr-grow">
          <div className="card shadow-lg mb-3 quote-card ">
            <div className="card-body text-dark">
              <h5 className="card-title">{dog.name}</h5>
              <img src={dog.picture} className="img-fluid rounded mx-auto d-block my-dog" />
              <p>{dog.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

@inject('routingStore','sessionStore')
@observer
class DogList extends Component {

  sessionStore = this.props.sessionStore;
  routingStore = this.props.routingStore;

  userId = null

  state = {
    dogs: [],
    userName: null
  };

  getMyDogs = (event) => {
    const dogs = [];
    db.collection('dogs')
      .where('owner', '==', this.userId )
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const {picture, name, owner, description} = doc.data();
          dogs.push({
            key: doc.id,
            picture,
            owner,
            name,
            description
          });
        });
        this.setState({dogs: dogs});
      })
      .catch(function(error) {
        console.log('Error getting documents: ', error);
      });
  };

  componentDidMount() {
    this.userId = this.props.match.params.id
    if(this.userId != this.sessionStore.authUser.uid){
      var docRef = db.collection("users").doc(this.userId).get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data().displayName);
            let displayName =  doc.data().displayName
            this.setState({userName: displayName})
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    }
    this.getMyDogs();
  }

  render() {

    const title = this.userId == this.sessionStore.authUser.uid ? <h2 className="text-center dashboard-header">My Dogs</h2> : <h2 className="text-center dashboard-header">{this.state.userName}'s Dogs</h2>;

    return (
      <Slide>
        <div className="container container-dashboard ">
          <div className="spacer" />
          <div className="search-container">
        {title}
            <div className="spacer" />

            <Dogs dogs={this.state.dogs} />
          </div>
        </div>
      </Slide>
    );
  }
}
const authCondition = (authUser) => !!authUser;

export default compose(withAuthorization(authCondition))(DogList);
