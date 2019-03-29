import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import {compose} from "recompose";
import withAuthorization from "../hoc/withAuthorization";
import GoogleMapReact from "google-map-react";
import styled from "styled-components";
import RandomButton from "./RandomButton"


const AnyReactComponent = ({text, onClick}) => (
  <div onClick={onClick} className="demo">
    <p data-tooltip={text}> </p>
  </div>
);

const DelishusMapCard = styled.div`
box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
padding: 8px;
border-radius: 18px;
background-color: white;
`;

// style={{ position: "absolute", zIndex: 500, borderRadius: "10px" }}
@inject("sessionStore", "spotStore",'uiStore')
@observer
class SpotsMap extends Component {

  spotStore = this.props.spotStore;
  sessionStore = this.props.sessionStore;
  uiStore = this.props.uiStore;
  
  apiIsLoaded = (map, maps) => {
    this.spotStore.gmapsLoaded = true;
    this.spotStore.googlePlacesService = new maps.places.PlacesService(map);
  };

  selectSpot(spot) {
    this.spotStore.selectExistingSpot(spot);
  }

  render() {
    return (
      <DelishusMapCard id="dcard" style={{ display: this.uiStore.mapView ? "block" : "none", height: "100%"}}>

        <RandomButton/>
        <div id="reactmap" style={{
      borderRadius: '10px',
      height: '100%',
      width: '100%',
      overflow: 'hidden'
    }}
    >
        <GoogleMapReact
          id="map"
          bootstrapURLKeys={{
            key: "AIzaSyAJdMUyuQiG2DEHgGG3Tvebb9-BzR0JXwE",
            libraries: "places"
          }}
          defaultZoom={13}
          onGoogleApiLoaded={({map, maps}) => this.apiIsLoaded(map, maps)}
          center={this.spotStore.mapGeolocation.center}
        >
          {this.spotStore.showAllSpots
            ? this.spotStore.uniqueSpotsByGooglePlaceIds.map(spot => (
                <AnyReactComponent
                  key={spot.key}
                  lat={spot.lat}
                  lng={spot.lng}
                  text={spot.name}
                  googlePlaceId={spot.googlePlaceId}
                  onClick={() => this.selectSpot(spot)}
                />
              ))
            : null}

          {!this.spotStore.showAllSpots
            ? this.spotStore.currentUserSpots.map(spot => (
                <AnyReactComponent
                  key={spot.key}
                  lat={spot.lat}
                  lng={spot.lng}
                  text={spot.name}
                  googlePlaceId={spot.googlePlaceId}
                  onClick={() => this.selectSpot(spot)}
                />
              ))
            : null}

          
        
          {this.spotStore.selectedSpot.name ? (
            <AnyReactComponent
              lat={this.spotStore.selectedSpot.lat}
              lng={this.spotStore.selectedSpot.lng}
              text={this.spotStore.selectedSpot.name}
              onClick={this.spotStore.toggleDrawer}
            />
          ) : null}

        

        </GoogleMapReact>
        </div>
      </DelishusMapCard>
    );
  }
}
const authCondition = authUser => !!authUser;

export default compose(withAuthorization(authCondition))(SpotsMap);
