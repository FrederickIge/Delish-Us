import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import styled from 'styled-components';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import MobileSpotList from '../../components/mobile/MobileSpotList';
import UserDetailsCard from "../../components/UserDetailsCard"
import SpotsMap from '../../components/desktop/SpotsMap'
import MobileMap from '../../components/mobile/MobileMap'
import SpotList from "../../components/desktop/SpotList";
import Search from "../../components/desktop/Search"
import withAuthorization from '../../components/hoc/withAuthorization';
import preventDefault from "../../utils/eventListeners"
import MapSwitcher from "../../components/desktop/MapSwitcher";
import Spacer from "../../components/layout/Spacer";

var getPosition = function (options) {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

const DisplayText = styled.div`
  color: rgba(0, 0, 0, 0.41);
  fontSize: 18px
  marginTop: auto;
  marginBottom: auto
`;

const DelishusMapCard = styled.div`
box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
padding: 8px;
border-radius: 18px;
background-color: white;
`;

const UserCard = styled.div`
box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
transition: all 0.3s cubic-bezier(.25,.8,.25,1);
padding: 8px;
border-radius: 11px;
background-color: white;
min-height:120px;
margin-top:10px;

&:hover {
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
`;

const GoogleMapContainer = styled.div`
  height: 100%;
`;

const DashboardContainer = styled.div`
  height: 100%;
  position: relative;
`;

const DashboardRowContainer = styled.div`
  height: 95%;
  max-height: 100%;
`;

const SpotDetailsCardWrapper = styled.div`
  height: 100%;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
  border-radius: 18px;
  background-color: white;
`;

const SearchContainer = styled.div`
@media only screen and (min-width: 600px) {
    height: 10%
}

@media only screen and (min-width: 414px) {
    height: 12%
}

/* 320px+ */
@media only screen and (min-width: 320px) {
    height: 16%
}

/* 375px+ */
@media only screen and (min-width: 375px) {
    height: 14%
}

/* 768px+ */
@media only screen and (min-width: 768px) {
    height: 10%
} 

/* 1200+ */
@media only screen and (min-width: 1200px) { 
    height: 12%
}
`;

const MapListContainer = styled.div`
height:100%;
`;

const DashboardLeftSide = styled.div`
  height: 90%;
`;
const DashboardRightSide = styled.div`
  height: 90%;
`;

const Flex = styled.div``;

@inject('sessionStore', 'spotStore', 'uiStore', 'fireStore', 'userStore')
@observer
class UsersPage extends Component {

  sessionStore = this.props.sessionStore;
  spotStore = this.props.spotStore;
  uiStore = this.props.uiStore;
  fireStore = this.props.fireStore;
  userStore = this.props.userStore;

  componentWillMount() {
   
    this.userStore.getAllUsers();
  }

  async componentDidMount() {
     window.addEventListener('touchmove', preventDefault, { passive: false });
    // this.targetElement = document.querySelector('#mobile-list');
    // disableBodyScroll(this.targetElement);
    this.spotStore.getAllSpots();
    let position = await getPosition();
    this.spotStore.mapGeolocation.center = { lat: position.coords.latitude, lng: position.coords.longitude };
  }

  render() {

    return (
      <React.Fragment>

        {/* <SwipeableDrawer
          anchor="bottom"
          open={this.uiStore.drawerState}
          onClose={() => this.uiStore.closeDrawer()}
          onOpen={() => this.uiStore.openDrawer()}
          className="d-lg-none"
        >
          <SpotDetailsCard />
        </SwipeableDrawer> */}

        <DashboardContainer id="dashboard-container" className="container">

          <Spacer />

          <DashboardRowContainer id="DashboardRowContainer" className="row">

    

            <DashboardLeftSide id = "dashbaord-left-side" className="col-md-4 d-none d-lg-block">
              <SpotDetailsCardWrapper id = "dashbaord-details-wrapper" className="delishus-card spot-detail">
                <UserDetailsCard />
              </SpotDetailsCardWrapper>
            </DashboardLeftSide>

            <DashboardRightSide id = "dashbaord-right-side" className="col-md-12 col-lg-8">

              <GoogleMapContainer id="google-map-container">

                {/* {this.spotStore.gmapsLoaded ?

                  <SearchContainer id="searchContainer" className="d-none d-lg-block">

                    <Flex id="flex" className="d-flex">
                      <Search />
                      <MapSwitcher />
                    </Flex>

                    <DisplayText className="d-flex justify-content-center">
                      {this.spotStore.showAllSpots ? <b>Displaying All Spots</b> : <b>Displaying My Spots</b>}
                    </DisplayText>

                  </SearchContainer>

                  : null} */}

                <MapListContainer id="map-list-container" >
                <DelishusMapCard id="dcard" style={{ display: this.uiStore.mapView ? "block" : "none", height: "100%"}}>

                    <div className="container">
                      <div className="row">

                        {this.userStore.allUsers.map(user => (
                          <React.Fragment key={user.userId}>
                            <div className="col-sm-4">
                             <UserCard className="pl-3" >
                            <h3>{user.username}</h3>
                           <div>{user.email}</div>
                          </UserCard>
                            </div>
                          </React.Fragment>
                     
                      

                        ))}

                      </div>
                    </div>

                </DelishusMapCard>
                </MapListContainer> 

              </GoogleMapContainer>

            </DashboardRightSide> 

          </DashboardRowContainer>

        </DashboardContainer>

      </React.Fragment>
    )
  }
}
const authCondition = (authUser) => !!authUser;

export default compose(withAuthorization(authCondition))(UsersPage);
