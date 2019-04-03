import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import withAuthorization from '../hoc/withAuthorization';
import GoogleMapReact from 'google-map-react';
import MobileSearch from "./MobileSearch"
import styled from "styled-components";
import RandomButton from "./MobileRandomButton"
import MobileMapSwitcher from "./MobileMapSwitcher"

const AnyReactComponent = ({ text, onClick }) => (
  <div onClick={onClick} className="demo">
    <p data-tooltip={text}> </p>
  </div>
);

const MobileSearchWrapper = styled.div`
z-index 500;
width:100%;
left:0
right:0;
`;

const DisplayText = styled.div`
  color: rgba(0, 0, 0, 0.90);
  font-size: 18px !important;
`;

const ToolBar = styled.div`
  background-color: white;
  height: 43px;
  position: absolute;
  border-radius: 0px;
  top: 46;
  z-index: 100;
  left: 0;
  right: 0;
`;

const MobileMapWrapper = styled.div`
  position: fixed;
  top: 76px;
  bottom: 0;
  left: 0;
  right: 0; 
`;

const DisplayTextWrapper = styled.div``

@inject('sessionStore', 'spotStore','uiStore')
@observer
class MobileMap extends Component {

  spotStore = this.props.spotStore;
  sessionStore = this.props.sessionStore;
  uiStore = this.props.uiStore;

  apiIsLoaded = (map, maps) => {
    this.spotStore.gmapsLoaded = true;
    this.spotStore.googlePlacesService = new maps.places.PlacesService(map);
  };

  selectSpot(spot) {
    console.log(spot)
    this.props.spotStore.selectExistingSpot(spot);
  }

  render() {
    return (
      <div className="d-lg-none" style={{ display: this.uiStore.mapView ? 'block' : 'none', zIndex: "10", width: "100%" }} >


        {this.spotStore.gmapsLoaded ?

          <MobileSearchWrapper>

            <MobileSearch />

          </MobileSearchWrapper> : null}

        {this.uiStore.hideMobileMap ?

          <ToolBar className="d-flex align-items-center justify-content-between">

            <RandomButton />

            <DisplayTextWrapper className="align-self-center">

              <DisplayText>
                {this.spotStore.showAllSpots ? <b>All Spots</b> : <b>My Spots</b>}
              </DisplayText>

            </DisplayTextWrapper>

            <MobileMapSwitcher />

          </ToolBar>

          : null}

        {this.uiStore.hideMobileMap ?
          <MobileMapWrapper >


            <GoogleMapReact
              id="bangbang"
              bootstrapURLKeys={{ key: 'AIzaSyAJdMUyuQiG2DEHgGG3Tvebb9-BzR0JXwE', libraries: "places" }}
              defaultZoom={15}
              onGoogleApiLoaded={({ map, maps }) => this.apiIsLoaded(map, maps)}
              center={this.spotStore.mapGeolocation.center}
              options={{ fullscreenControl: false, zoomControl: false }}
            >

              {
                this.spotStore.showAllSpots ?
                  this.spotStore.uniqueSpotsByGooglePlaceIds.map((spot) =>
                    <AnyReactComponent
                      key={spot.key + "-m"}
                      lat={spot.lat}
                      lng={spot.lng}
                      text={spot.name}
                      googlePlaceId={spot.googlePlaceId}
                      onClick={() => this.selectSpot(spot)}
                    />
                  ) : null}


              {!this.spotStore.showAllSpots ?
                this.spotStore.currentUserSpots.map((spot) =>
                  <AnyReactComponent
                    key={spot.key + "-m"}
                    lat={spot.lat}
                    lng={spot.lng}
                    text={spot.name}
                    googlePlaceId={spot.googlePlaceId}
                    onClick={() => this.selectSpot(spot)}
                  />
                )
                : null}


              {this.spotStore.selectedSpot.name ?
                <AnyReactComponent
                  lat={this.spotStore.selectedSpot.lat}
                  lng={this.spotStore.selectedSpot.lng}
                  text={this.spotStore.selectedSpot.name}
                  onClick={() => this.uiStore.openDrawer()}
                /> : null}
            </GoogleMapReact>


          </MobileMapWrapper>
          : null}

      </div>

    )
  }
}
const authCondition = (authUser) => !!authUser;

export default compose(withAuthorization(authCondition))(MobileMap);
