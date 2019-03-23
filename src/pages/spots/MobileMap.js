import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import withAuthorization from '../../components/hoc/withAuthorization';
import GoogleMapReact from 'google-map-react';
import { ToastContainer, toast } from 'react-toastify';
import {isMobile, isBrowser} from 'react-device-detect';
import MobileSearch from "../../components/MobileSearch"

const AnyReactComponent = ({ text, onClick }) => (
  <div onClick={onClick} className="demo">
    <p data-tooltip={text}> </p>
  </div>
);



@inject('sessionStore', 'spotStore')
@observer
class MobileMap extends Component {

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
    if (isMobile) {
      this.setState({ mobileStyle: { height: "100vh", width: "100%" , zIndex :"1"} })
    }
    this.spotStore.getAllSpots();
  }

  selectSpot(spot) {
    this.props.spotStore.selectExistingSpot(spot);
  }

  handleInputChange = (event) => {
    this.spotStore.showAllSpots = !this.spotStore.showAllSpots;
}



  render() {
    return (
      <div className="google-map d-lg-none" style={{display: this.spotStore.mapView ? 'block' : 'none', position: "absolute", top: "0",bottom: "0", right: "0",   left: "0", zIndex:"1000"}} >


   {this.spotStore.gmapsLoaded ?<div style={{position: "absolute", zIndex:500, width:"100%", left:"0",right:"0"}}><MobileSearch /></div>: null}
        
      {/* { this.spotStore.showAllSpots ?
      <button 
      onClick={() => this.spotStore.getRandomSpot()} 
      style={{position: "absolute", zIndex:500, borderRadius:"10px"}} 
      type="button" className="btn btn-primary">
      Random
      </button> :null} */}

      {/* <ToastContainer /> */}
        {this.spotStore.showAllSpots}
        { this.spotStore.showAllSpots ?

                <div style={{ position: "absolute", zIndex: 500, borderRadius: "0px", top: 46 }} >
                    <button
                        onClick={() => this.spotStore.getRandomSpot()}
                        style={{ zIndex: 500, borderRadius: "0px" }}
                        type="button" className="btn btn-primary">
                        Random
                    </button>

                    {/* <label style={{ position: "absolute", zIndex: 500, borderRadius: "0px", top: 60, right: "0" }} className="switch  align-self-center">
                        <input name="switch  align-self-center" type="checkbox" onChange={this.handleInputChange} />
                        <span className="slider"></span>
                    </label> */}
                </div>

      
      
      
      :null}
          
    <label style={{position: "absolute", zIndex:500, borderRadius:"0px", top:55, right:"0"}}  className="switch  align-self-center">
        <input name="switch  align-self-center" type="checkbox" onChange={this.handleInputChange} />
        <span className="slider"></span>
    </label>

        <GoogleMapReact
          id="map"
          bootstrapURLKeys={{ key: 'AIzaSyAJdMUyuQiG2DEHgGG3Tvebb9-BzR0JXwE', libraries: "places" }}
          defaultZoom={11}
          onGoogleApiLoaded={({ map, maps }) => this.apiIsLoaded(map, maps)}
          center={this.spotStore.mapGeolocation.center}
          options={{fullscreenControl: false, zoomControl: false}}
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

export default compose(withAuthorization(authCondition))(MobileMap);