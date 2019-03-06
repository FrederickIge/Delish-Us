import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import posed from 'react-pose';
import firebase from 'firebase';

import SpotDetailsCard from "./SpotDetailsCard"
import SpotsMap from './SpotsMap'
import Search from "../../components/Search"
import withAuthorization from '../../components/hoc/withAuthorization';

const db = firebase.firestore();

db.settings({
  timestampsInSnapshots: true
});

const Slide = posed.div({
  enter: { x: 0, opacity: 1 },
  exit: { x: -50, opacity: 0 }
});

var getPosition = function (options) {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

@inject('sessionStore', 'spotStore')
@observer
class DogList extends Component {

  sessionStore = this.props.sessionStore;
  spotStore = this.props.spotStore;

  async componentDidMount() {
    let position = await getPosition();
    this.spotStore.mapGeolocation.center = { lat: position.coords.latitude, lng: position.coords.longitude };
  }

  render() {

    return (

      <div className="container-fluid">


        <div className="container container-dashboard big-container">

          <div className="spacer" />

          <div className="row">

            <div className="col-4 col-md-4 col-sm-12 order-sm-1">
              <SpotDetailsCard />
            </div>

            <div className="col-8 col-md-8 col-sm-12 order-sm-2">


              <div className="google-map-container">

                {this.spotStore.gmapsLoaded ? <Search /> : null}

                <SpotsMap />
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}
const authCondition = (authUser) => !!authUser;

export default compose(withAuthorization(authCondition))(DogList);
