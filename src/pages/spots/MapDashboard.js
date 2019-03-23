import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import posed from 'react-pose';
import firebase from 'firebase';

import SpotDetailsCard from "./SpotDetailsCard"
import SpotsMap from './SpotsMap'
import SpotList from "./SpotList";
import Search from "../../components/Search"
import withAuthorization from '../../components/hoc/withAuthorization';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Switch from "react-switch";


import "react-table/react-table.css";

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
class MapDashboard extends Component {

  sessionStore = this.props.sessionStore;
  spotStore = this.props.spotStore;


  async componentDidMount() {
    let position = await getPosition();
    this.spotStore.mapGeolocation.center = { lat: position.coords.latitude, lng: position.coords.longitude };
  }

  handleInputChange = (event) => {
      this.spotStore.showAllSpots = !this.spotStore.showAllSpots;
  }



  render() {

    return (
<React.Fragment>
  
        <SwipeableDrawer
          anchor="bottom"
          open={this.spotStore.drawerState}
          onClose={this.spotStore.toggleDrawer}
          onOpen={this.spotStore.toggleDrawer}
          className="d-lg-none"
        >
          <div className="curve">
          <SpotDetailsCard />
          </div>
       

        </SwipeableDrawer>


          <div className="container-fluid container-dashboard big-container" style={{ height: "100%"}}  >
            <div className="spacer" />

            <div className="row" style={{ height: "100%"}}>

            <div className="col-md-4 d-none d-lg-block">
              <div className="delishus-card spot-detail">
                <SpotDetailsCard />
              </div>
            </div>

              <div className="col-md-12 col-lg-8">


                <div className="google-map-container">

                  {this.spotStore.gmapsLoaded ? 

                  <div style={{ height: "10%"}}>

                    <div className="d-flex">
                      <Search />                
                      <label style={{ marginBottom: "0rem", marginLeft: "10px" }} className="switch  align-self-center">
                        <input name="switch  align-self-center" type="checkbox" onChange={this.handleInputChange} />
                        <span className="slider"></span>
                      </label>
                    </div>

                    <div className="d-flex justify-content-center">
                      {this.spotStore.showAllSpots ? <span style={{ color: "rgba(0, 0, 0, 0.41)", fontSize: "18px" }}><b>Displaying My Spots</b></span> : <span style={{ color: "rgba(0, 0, 0, 0.41)", fontSize: "18px" }}><b>Displaying All Spots</b></span>}
                    </div>

                  </div> 

                  : null}

                <div style={{ height: "90%" }}>
                  <SpotsMap />

                  <SpotList />

                </div>

                  



                    
                </div>
              </div>
            </div>
          </div>
        
        </React.Fragment>

     

    )
  }
}
const authCondition = (authUser) => !!authUser;

export default compose(withAuthorization(authCondition))(MapDashboard);
