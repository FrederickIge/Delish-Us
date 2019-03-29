import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import styled from 'styled-components';

import MobileSpotList from '../../components/mobile/MobileSpotList';
import SpotDetailsCard from "../../components/SpotDetailsCard"
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

@media only screen and (min-width: 600px) {
    height: 85% 
    max-height:85%;
    
}

@media only screen and (min-width: 414px) {
    height: 80% 
    max-height:80%;
    
}


/* 320px+ */
@media only screen and (min-width: 320px) {
    height: 85% 
    max-height:85%;
   
}

/* 375px+ */
@media only screen and (min-width: 375px) {
    height: 90% 
    max-height:90%;
   
}

/* 768px+ */
@media only screen and (min-width: 768px) {
    height: 90% 
    max-height:90%;
   
} 

/* 1200+ */
@media only screen and (min-width: 1200px) { 
    height: 88%;
    max-height:88%;
  
}`;

const DashboardLeftSide = styled.div`
  height: 100%;
`;
const DashboardRightSide = styled.div`
  height: 100%;
`;

const Flex = styled.div``;

@inject('sessionStore', 'spotStore', 'uiStore')
@observer
class MapDashboard extends Component {

  sessionStore = this.props.sessionStore;
  spotStore = this.props.spotStore;
  uiStore = this.props.uiStore;

  componentWillUnmount() {
    window.removeEventListener('touchmove', preventDefault);
    console.log('f')
  }

  async componentDidMount() {
    window.addEventListener('touchmove', preventDefault, { passive: false });
    this.spotStore.getAllSpots();
    let position = await getPosition();
    this.spotStore.mapGeolocation.center = { lat: position.coords.latitude, lng: position.coords.longitude };
  }

  render() {

    return (
      <React.Fragment>

        <SwipeableDrawer
          anchor="bottom"
          open={this.uiStore.drawerState}
          onClose={() => this.uiStore.closeDrawer()}
          onOpen={() => this.uiStore.openDrawer()}
          className="d-lg-none"
        >
          <SpotDetailsCard />
        </SwipeableDrawer>

        <DashboardContainer className="container">

          <Spacer />

          <DashboardRowContainer id="DashboardRowContainer" className="row">

            <MobileMap />
            <MobileSpotList />

            <DashboardLeftSide id = "dashbaord-left-side" className="col-md-4 d-none d-lg-block">
              <SpotDetailsCardWrapper id = "dashbaord-details-wrapper" className="delishus-card spot-detail">
                <SpotDetailsCard />
              </SpotDetailsCardWrapper>
            </DashboardLeftSide>

            <DashboardRightSide id = "dashbaord-right-side" className="col-md-12 col-lg-8 d-none d-lg-block">

              <GoogleMapContainer id="google-map-container">

                {this.spotStore.gmapsLoaded ?

                  <SearchContainer id="searchContainer" className="d-none d-lg-block">

                    <Flex id="flex" className="d-flex">
                      <Search />
                      <MapSwitcher />
                    </Flex>

                    <DisplayText className="d-flex justify-content-center">
                      {this.spotStore.showAllSpots ? <b>Displaying All Spots</b> : <b>Displaying My Spots</b>}
                    </DisplayText>

                  </SearchContainer>

                  : null}

                <MapListContainer id="map-list-container" className="d-none d-lg-block" >
                  <SpotsMap />
                  <SpotList />
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

export default compose(withAuthorization(authCondition))(MapDashboard);
