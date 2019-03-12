import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import withAuthorization from '../../components/hoc/withAuthorization';
import GoogleMapReact from 'google-map-react';


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

  apiIsLoaded = (map, maps) => {
    this.spotStore.gmapsLoaded = true;
    this.spotStore.googlePlacesService = new maps.places.PlacesService(map);
  };

  componentDidMount() {
    this.spotStore.getAllSpots();
  }

  selectSpot(spot) {
    this.props.spotStore.selectExistingSpot(spot);
  }

  render() {
    return (
      <div className="delishus-card google-map">
        {this.spotStore.showAllSpots}
        <GoogleMapReact
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
