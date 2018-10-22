import React, { Component } from "react";
import withAuthorization from "../../components/hoc/withAuthorization";
import { inject, observer } from "mobx-react";
import { compose } from "recompose";
import posed from "react-pose";
import axios from "axios";
import firebase from "firebase";

const db = firebase.firestore();

db.settings({
  timestampsInSnapshots: true
});


const Slide = posed.div({
  enter: { x: 0, opacity: 1 },
  exit: { x: -50, opacity: 0 }
});

const photo = require("../../img/diploma.png");

@inject("schoolStore", "sessionStore")
@observer
class DogList extends Component {

  schoolStore = this.props.schoolStore;
  sessionStore = this.props.sessionStore;

  state = {
    dogs: [],
  };


  getMyDogs = event => {
    const dogs = [];
    db.collection("dogs").where("owner", "==", this.sessionStore.authUser.uid)
    .get()
    .then((querySnapshot) => {

      querySnapshot.forEach((doc) => {

        const { picture, name, owner } = doc.data();

        
        dogs.push({
          key: doc.id,
          picture, 
          owner,
          name
        });
      
      });
      this.setState({dogs:dogs})
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

  };

  componentDidMount() {
    this.getMyDogs();
  }

  render() {
    const { schoolStore } = this.props;
    return (
      <Slide>
        <div className="container container-dashboard ">
          <div className="spacer" />

          <section>
            <div className="search-container">
              <h2 className="text-center dashboard-header">
                My Dogs
              </h2>
              <div className="spacer" />

              {this.state.dogs.map(dog => (

                <div key={dog.key} className="col-md-4 hvr-grow" >
                  <div className="card shadow-lg mb-3 quote-card ">
                    <div className="card-body text-dark">
                      <h5 className="card-title">{dog.name}</h5>
                      <img
                        src={dog.picture}
                     
                        className="img-fluid rounded mx-auto d-block my-dog"
                      />
                    </div>
                  </div>
                </div>

              ))}


            </div>
          </section>
        </div>
      </Slide>
    );
  }
}
const authCondition = authUser => !!authUser;

export default compose(withAuthorization(authCondition))(DogList);
