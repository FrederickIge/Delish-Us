import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import posed from 'react-pose';
import firebase from 'firebase';

import SpotDetailsCard from "../../components/SpotDetailsCard"
import SpotsMap from '../../components/desktop/SpotsMap'
import MobileMap from '../../components/mobile/MobileMap'
import SpotList from "../../components/desktop/SpotList";
import Search from "../../components/Search"
import withAuthorization from '../../components/hoc/withAuthorization';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import preventDefault from "../../utils/eventListeners"

import "react-table/react-table.css";
import MobileSpotList from '../../components/mobile/MobileSpotList';
import Modal from 'react-bootstrap/Modal'


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

  componentWillUnmount(){
    window.removeEventListener('touchmove', preventDefault);
  }

  async componentDidMount() {
    window.addEventListener('touchmove', preventDefault, { passive: false });
    this.spotStore.getAllSpots();
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
          onClose={() => this.spotStore.toggleDrawer(false)}
          onOpen={() => this.spotStore.toggleDrawer(true)}
          className="d-lg-none detail-image curved-drawer"
        >
          <div className="curve detail-image">
            <SpotDetailsCard />
          </div>
        </SwipeableDrawer>


          <div className="container container-dashboard big-container"  >
            <div className="spacer d-none d-lg-block" />

            <div className="row" style={{ height: "100%", maxHeight:"100%"}}>
            {/* mobilemap */}
                <MobileMap></MobileMap> 
                <MobileSpotList></MobileSpotList>
            <div className="col-md-4 d-none d-lg-block" style={{ maxHeight:"95%"}} >
              <div className="delishus-card spot-detail">
                <SpotDetailsCard />
              </div>
            </div>

              <div className="col-md-12 col-lg-8" style={{ maxHeight:"95%"}}>


                <div className="google-map-container" style={{ height: "100%"}}>

                  {this.spotStore.gmapsLoaded ? 

                  <div className="search-container d-none d-lg-block">

                    <div className="d-flex">
                      <Search />                
                      <label style={{ marginBottom: "0rem", marginLeft: "10px" }} className="switch  align-self-center">
                        <input name="switch  align-self-center" type="checkbox" onChange={this.handleInputChange} />
                        <span className="slider"></span>
                      </label>
                    </div>

                    <div className="d-flex justify-content-center" style={{ height: "50%"}}>

                      {this.spotStore.showAllSpots ?
                        <div style={{ color: "rgba(0, 0, 0, 0.41)", fontSize: "18px", marginTop: "auto", marginBottom: "auto" }}>
                          <b>Displaying All Spots</b>
                        </div>
                         :
                        <div style={{ color: "rgba(0, 0, 0, 0.41)", fontSize: "18px", marginTop: "auto", marginBottom: "auto" }}>
                          <b>Displaying My Spots</b>
                        </div>
                      }

                    </div>

                  </div> 

                  : null}

                <div className="map-list-container d-none d-lg-block" >
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
