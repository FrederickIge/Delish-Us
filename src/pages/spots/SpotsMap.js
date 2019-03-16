import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import withAuthorization from '../../components/hoc/withAuthorization';
import GoogleMapReact from 'google-map-react';
import { ToastContainer, toast } from 'react-toastify';
import {isMobile, isBrowser} from 'react-device-detect';

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
    mobileStyle: { },
    mobileSearch: { }
  }

  apiIsLoaded = (map, maps) => {
    this.spotStore.gmapsLoaded = true;
    this.spotStore.googlePlacesService = new maps.places.PlacesService(map);
  };

  componentDidMount() {
    console.log('check')
    if (isMobile) {
      this.setState({ mobileStyle: { height: "100vh", width: "100%" , zIndex :"1"} })
      console.log('check')
    }
    this.spotStore.getAllSpots();
  }

  selectSpot(spot) {
    this.props.spotStore.selectExistingSpot(spot);
  }



  render() {
    return (
      <div className="delishus-map-card google-map" >
      <ToastContainer />
        {this.spotStore.showAllSpots}
        <GoogleMapReact
          id="map"
         
          bootstrapURLKeys={{ key: 'AIzaSyAJdMUyuQiG2DEHgGG3Tvebb9-BzR0JXwE', libraries: "places" }}
          defaultZoom={11}
          onGoogleApiLoaded={({ map, maps }) => this.apiIsLoaded(map, maps)}
          center={this.spotStore.mapGeolocation.center}
        >

          {
            !this.spotStore.showAllSpots ?
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


          {this.spotStore.showAllSpots ?
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
            /> : null}

        </GoogleMapReact>

      </div>

    )
  }
}
const authCondition = (authUser) => !!authUser;

export default compose(withAuthorization(authCondition))(SpotsMap);
