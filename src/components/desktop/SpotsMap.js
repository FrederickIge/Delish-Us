import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import withAuthorization from '../hoc/withAuthorization';
import GoogleMapReact from 'google-map-react';
import {isMobile} from 'react-device-detect';

const AnyReactComponent = ({ text, onClick }) => (
  <div onClick={onClick} className="demo">
    <p data-tooltip={text}> </p>
  </div>
);

@inject('sessionStore', 'spotStore')
@observer
class SpotsMap extends Component {

  spotStore = this.props.spotStore;
  sessionStore = this.props.sessionStore;

  state = {
    mobileStyle: { }
  }

  apiIsLoaded = (map, maps) => {
    this.spotStore.gmapsLoaded = true;
    this.spotStore.googlePlacesService = new maps.places.PlacesService(map);
  };

  componentDidMount() {
    if (isMobile) {
      this.setState({ mobileStyle: { height: "100vh", width: "100%" , zIndex :"1"} })
    }
  }

  selectSpot(spot) {
    this.props.spotStore.selectExistingSpot(spot);
  }



  render() {
    return (
      <div className="delishus-map-card google-map " style={{display: this.spotStore.mapView ? 'block' : 'none', height:"100%"}} >

      { this.spotStore.showAllSpots ?
      <button 
      onClick={() => this.spotStore.getRandomSpot()} 
      style={{position: "absolute", zIndex:500, borderRadius:"10px"}} 
      type="button" className="btn btn-primary">
      Random
      </button> : null}

        {this.spotStore.showAllSpots}
        <GoogleMapReact
          id="map"
          bootstrapURLKeys={{ key: 'AIzaSyAJdMUyuQiG2DEHgGG3Tvebb9-BzR0JXwE', libraries: "places" }}
          defaultZoom={13}
          onGoogleApiLoaded={({ map, maps }) => this.apiIsLoaded(map, maps)}
          center={this.spotStore.mapGeolocation.center}
        >

          {
            this.spotStore.showAllSpots ?
              this.spotStore.uniqueSpotsByGooglePlaceIds.map((spot) =>
                <AnyReactComponent
                  key={spot.key}
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
                key={spot.key}
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
              onClick={this.spotStore.toggleDrawer}
            /> : null}

        </GoogleMapReact>

      </div>

    )
  }
}
const authCondition = (authUser) => !!authUser;

export default compose(withAuthorization(authCondition))(SpotsMap);
