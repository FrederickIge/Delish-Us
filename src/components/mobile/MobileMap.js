import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import withAuthorization from '../hoc/withAuthorization';
import GoogleMapReact from 'google-map-react';
import { ToastContainer, toast } from 'react-toastify';
import {isMobile, isBrowser} from 'react-device-detect';
import MobileSearch from "./MobileSearch"

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
   
  }

  selectSpot(spot) {
    this.props.spotStore.selectExistingSpot(spot);
  }

  handleInputChange = (event) => {
    this.spotStore.showAllSpots = !this.spotStore.showAllSpots;
  }



  render() {
    return (
      <div id="ganggang" className="d-lg-none" style={{display: this.spotStore.mapView ? 'block' : 'none', zIndex:"10", width:"100%"}} >


   {this.spotStore.gmapsLoaded ?<div style={{ zIndex:500, width:"100%", left:"0",right:"0"}}>

   <MobileSearch />
   </div>: null}
        
{this.spotStore.hideMobileMap ?  
        <div style={{ position: "absolute", borderRadius: "0px", top: 46, zIndex: 100, left:"0", right:"0" }}>

          <div style ={{backgroundColor:"white", height:"43px"}} className="d-flex align-items-center justify-content-between">
         
            <button
              disabled={!this.spotStore.showAllSpots}
              onClick={() => this.spotStore.getRandomSpot()}
              style={{ zIndex: 100, borderRadius: "0px" }}
              type="button" className="btn btn-primary">
              Random
            </button>

            <div style={{ zIndex: 100 }} className="align-self-center">
              {this.spotStore.showAllSpots ? <span style={{ color: "rgba(0, 0, 0, 0.90)", fontSize: "18px" }}>
              <b>All Spots</b></span>
               : 
               <span style={{ color: "rgba(0, 0, 0, 0.90)", fontSize: "18px" }}>
               <b>My Spots</b>
               </span>}
            </div>

            <label style={{ zIndex: 100, marginBottom: "0px",marginRight:"5px"}} className="switch  align-self-center">
              <input name="switch  align-self-center" type="checkbox" onChange={this.handleInputChange} />
              <span className="slider"></span>
            </label>

          </div>

        </div> : null }
      
        {this.spotStore.hideMobileMap ?  
 <div id="ganggang" style={{position: "fixed", top:"76px" ,bottom:"0", left: "0", right:"0"}}> 


        <GoogleMapReact
          id="bangbang"
          bootstrapURLKeys={{ key: 'AIzaSyAJdMUyuQiG2DEHgGG3Tvebb9-BzR0JXwE', libraries: "places" }}
          defaultZoom={15}
          onGoogleApiLoaded={({ map, maps }) => this.apiIsLoaded(map, maps)}
          center={this.spotStore.mapGeolocation.center}
          options={{fullscreenControl: false, zoomControl: false}}
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
              onClick={this.spotStore.toggleDrawer}
            /> : null}
        </GoogleMapReact>
        </div>
: null}

      </div>

    )
  }
}
const authCondition = (authUser) => !!authUser;

export default compose(withAuthorization(authCondition))(MobileMap);
