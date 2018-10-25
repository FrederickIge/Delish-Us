import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {compose} from 'recompose';
import posed from 'react-pose';
import axios from 'axios';
import firebase from 'firebase';
import {Link} from 'react-router-dom';

import withAuthorization from '../../components/hoc/withAuthorization';

const db = firebase.firestore();

db.settings({
  timestampsInSnapshots: true
});

const dogRef = db.collection('dogs');

const Slide = posed.div({
  enter: {x: 0, opacity: 1},
  exit: {x: -50, opacity: 0}
});

const Fade = posed.div({
  hidden: {opacity: 0},
  visible: {opacity: 1}
});

const RandomDog = ({isVisible, picture, handleImageLoaded, nextDog}) => {
  return (
    <div>
      <h2 className="text-center dashboard-header">Find a dog you like! </h2>
      <div className="spacer" />

      <Fade pose={isVisible ? 'visible' : 'hidden'}>
        <img src={picture} alt="Smiley face" className="img-fluid rounded mx-auto d-block random-dog" onLoad={handleImageLoaded} />
      </Fade>

      <div className="mt-3 row">
        <div className="col-md-2" />
        <div className="col-md-8">
          <button type="button" onClick={nextDog} className="btn btn-primary btn-block">
            {' '}
            Next Dog
          </button>
        </div>
        <div className="col-md-2" />
      </div>
    </div>
  );
};

const AddDogForm = ({handleChange, handleSubmit, message, name}) => {
  return (
    <form onSubmit={handleSubmit}>
      <h4 className="text-center dashboard-header">Like this dog?</h4>
      <h4 className="text-center dashboard-header">Name the dog!</h4>

      <div className="form-group dashboard-form">
        <div className="mt-3 row">
          <div className=" col-md-2" />
          <div className=" col-md-8">
            <div className="input-group input-group-alternative mb-4">
              <input
                className="form-control form-control-lg form-control-alternative"
                placeholder="Dog Name"
                type="text"
                value={name}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-success btn-block" disabled={!name}>
              Keep Dog
            </button>
            <br />
            <Slide>
              {message ? (
                <p>
                  {message} <Link to="/doglist">Checkout your Dogs</Link>
                </p>
              ) : null}
            </Slide>
          </div>
          <div className=" col-md-2" />
        </div>
      </div>
    </form>
  );
};

@inject('sessionStore')
@observer
class Dashboard extends Component {
  sessionStore = this.props.sessionStore;

  state = {
    name: '',
    picture: null,
    gender: 'male',
    breed: null,
    owner: null,
    message: null,
    isVisible: true
  };

  handleChange = (event) => {
    this.setState({name: event.target.value});
  };

  handleSubmit = (event) => {
    event.preventDefault();
    dogRef
      .add({
        name: this.state.name,
        picture: this.state.picture,
        owner: this.sessionStore.authUser.uid
      })
      .then(() => {
        let message = this.state.name + ' has been added!';
        this.setState({message: message});
        this.nextDog();
        this.state.name = '';
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
  };

  handleImageLoaded = () => {
    this.setState({isVisible: true});
  };

  nextDog = (event) => {
    this.setState({isVisible: false}, () => {
      axios.get('https://dog.ceo/api/breeds/image/random').then((res) => {
        this.setState({picture: res.data.message});
      });
    });
  };

  componentDidMount() {
    this.nextDog();
  }

  render() {
    return (
      <Slide>
        <div className="container container-dashboard ">
          <div className="spacer" />
          <div className="search-container">
          
            <RandomDog
              isVisible={this.state.isVisible}
              picture={this.state.picture}
              handleImageLoaded={this.handleImageLoaded}
              nextDog={this.nextDog}
            />

            <AddDogForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} message={this.state.message} name={this.state.name} />

          </div>
        </div>
      </Slide>
    );
  }
}
const authCondition = (authUser) => !!authUser;

export default compose(withAuthorization(authCondition))(Dashboard);
