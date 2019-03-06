import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import withAuthorization from '../../components/hoc/withAuthorization';
import GoogleMapReact from 'google-map-react';


const AnyReactComponent = ({ text }) => (
    <div style={{ fontSize: "32px" }}>
      <span className="badge"><i className="fa fa-cutlery" aria-hidden="true"></i> {text} </span>
    </div>
  );

@inject('sessionStore', 'spotStore')
@observer
class SpotsMap extends Component {

    spotStore = this.props.spotStore;

    apiIsLoaded = (map, maps) => {
        this.spotStore.gmapsLoaded = true;
        this.spotStore.googlePlacesService = new maps.places.PlacesService(map);
    };

    render() {
        return (
            <div className="delishus-card google-map ">

            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyAJdMUyuQiG2DEHgGG3Tvebb9-BzR0JXwE', libraries: "places" }}
              defaultZoom={11}
              onGoogleApiLoaded={({ map, maps }) => this.apiIsLoaded(map, maps)}
              center={this.spotStore.mapGeolocation.center}
            >
              <AnyReactComponent
                lat={this.spotStore.selectedSpot.lat}
                lng={this.spotStore.selectedSpot.lng}
                text={this.spotStore.selectedSpot.name}
              />

            </GoogleMapReact>

          </div>

        )
    }
}
const authCondition = (authUser) => !!authUser;

export default compose(withAuthorization(authCondition))(SpotsMap);
