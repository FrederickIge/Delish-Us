import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import posed from 'react-pose';
import firebase from 'firebase';

import SpotDetailsCard from "./SpotDetailsCard"
import SpotsMap from './SpotsMap'
import Search from "../../components/Search"
import withAuthorization from '../../components/hoc/withAuthorization';
import { BrowserView, MobileView ,isBrowser ,isMobile } from "react-device-detect";

import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';


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
        >
     
           
        
        </SwipeableDrawer>

        <div className="container-fluid">
          <MobileView>
            {this.spotStore.gmapsLoaded ? <div style={{ height: "8%", zIndex: "100" }}>
              <div className="justify-content-center align-self-center">
                <Search />
                <label style={{ marginLeft: "20px" }} className="switch align-middle center-block">
                  <input name="switch" type="checkbox" onChange={this.handleInputChange} />
                  <span className="slider"></span>
                </label>
              </div>
            </div> : null}
            <SpotsMap />
          </MobileView>
        </div>

        <BrowserView>
          <div className="container-fluid container-dashboard big-container">
            <div className="spacer" />

            <div className="row">

              <div className="col-md-4 d-none d-lg-block">
                <SpotDetailsCard />
              </div>

              <div className="col-md-12 col-lg-8">


                <div className="google-map-container">

                  {this.spotStore.gmapsLoaded ? 

                  <div style={{ height: "8%" }}>
                    <div className="d-flex">
                      <Search  />
                      <label style={{ marginBottom: "0rem", marginLeft:"10px" }}  className="switch  align-self-center">
                        <input name="switch  align-self-center" type="checkbox" onChange={this.handleInputChange} />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </div> 

                  : null}
 <div className="spacer" />
                  <SpotsMap />
                </div>
              </div>
            </div>
          </div>
        </BrowserView>
        </React.Fragment>

     

    )
  }
}
const authCondition = (authUser) => !!authUser;

export default compose(withAuthorization(authCondition))(MapDashboard);
