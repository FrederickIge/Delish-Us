import React, { Component } from "react";
import withAuthorization from "../../components/hoc/withAuthorization";
import { inject, observer } from "mobx-react";
import { compose } from "recompose";
import posed from "react-pose";
import axios from "axios";
import firebase from "firebase";
import { Link, NavLink } from 'react-router-dom';
import Zoom from 'react-reveal/Zoom';
const db = firebase.firestore();

db.settings({
  timestampsInSnapshots: true
});


const Slide = posed.div({
  enter: { x: 0, opacity: 1 },
  exit: { x: -50, opacity: 0 }
});

const Box = posed.div({
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
});


const photo = require("../../img/diploma.png");

@inject("schoolStore", "sessionStore")
@observer
class Dashboard extends Component {
  schoolStore = this.props.schoolStore;
  sessionStore = this.props.sessionStore;

  state = {
    name: "",
    picture: null,
    gender: "male",
    breed: null,
    owner: null,
    message: null,
    isVisible: true 
  };

  handleChange = (event) => {
    this.setState({name: event.target.value});
  }

  handleSubmit = (event) => {

    event.preventDefault();
    let dogRef = db.collection("dogs");
    dogRef.add({
      name: this.state.name,
      picture: this.state.picture,
      owner: this.sessionStore.authUser.uid,
    }).then(data => {
        let message = this.state.name + " has been added!"
        this.setState({message:message});
        this.nextDog();
      this.state.name = ""
    }).catch(function (error) {
      console.error("Error adding document: ", error);
    });
  }

  handleImageLoaded = () => {
    this.setState({ isVisible: true });
  }


  nextDog = event => {
    this.setState({ isVisible: false }, () => {
      axios.get("https://dog.ceo/api/breeds/image/random").then(res => {
        this.setState({ picture: res.data.message })
      });
    });
  };

  componentDidMount() {
    this.nextDog();
  }

  componentDidUpdate(prevProps) {
    
    // if(this.state.isVisible == false){
    //   this.setState({ isVisible: true });
    // }
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
                Find a dog you like!
              </h2>
              <div className="spacer" />

            <Box pose={this.state.isVisible ? 'visible' : 'hidden'}  >
            
            
              <img
                src={this.state.picture}
                alt="Smiley face"
                className="img-fluid rounded mx-auto d-block random-dog"
                onLoad={this.handleImageLoaded}
              />
            </Box>

              <div className="mt-3 row">
                <div className="col-md-2" />
                <div className="col-md-8">
                  <button
                    type="button"
                    onClick={this.nextDog}
                    className="btn btn-primary btn-block"
                  >
                    {" "}
                    Next Dog
                  </button>
                </div>
                <div className="col-md-2" />
              </div>

              <h4 className="text-center dashboard-header">Like this dog?</h4>
              <h4 className="text-center dashboard-header">Name the dog!</h4>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group dashboard-form">
                <div className="mt-3 row">
                  <div className=" col-md-2" />
                  <div className=" col-md-8">
                    <div className="input-group input-group-alternative mb-4">
                      <input
                        className="form-control form-control-lg form-control-alternative"
                        placeholder="Dog Name"
                        type="text"
                        value={this.state.name}
                        onChange={this.handleChange}
                        
                      />
                    </div>
                    <button
                      type="submit"                    
                      className="btn btn-success btn-block"
                      disabled={!this.state.name}
                    >
                      {" "}
                      Keep Dog
                    </button>
                    <br></br>
                    <Slide>
                  { this.state.message ? <p> {this.state.message} <Link to='/doglist'>Checkout your Dogs</Link> </p> : null}  
                 </Slide>
                  </div>
                  <div className=" col-md-2" />
                </div>
              </div>
              </form>
            </div>
          </section>
        </div>
      </Slide>
    );
  }
}
const authCondition = authUser => !!authUser;

export default compose(withAuthorization(authCondition))(Dashboard);
