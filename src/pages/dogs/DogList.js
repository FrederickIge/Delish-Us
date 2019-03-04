import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import posed from 'react-pose';
import firebase from 'firebase';
import GoogleMapReact from 'google-map-react';


import Search from "../../components/Search"
import withAuthorization from '../../components/hoc/withAuthorization';

const db = firebase.firestore();

db.settings({
  timestampsInSnapshots: true
});

const Slide = posed.div({
  enter: { x: 0, opacity: 1 },
  exit: { x: -50, opacity: 0 }
});


const AnyReactComponent = ({ text }) => (
  <div style={{
    color: 'white', 
    background: 'grey',
    padding: '15px 10px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)'
  }}>
    {text}
  </div>
);





@inject('routingStore', 'sessionStore' , 'spotStore')
@observer
class DogList extends Component {

  sessionStore = this.props.sessionStore;
  routingStore = this.props.routingStore;
  spotStore = this.props.spotStore;

  state = {gmapsLoaded: false};

  apiIsLoaded = (map, maps) => {
    this.setState({gmapsLoaded: true})
    this.spotStore.maps = maps;
    this.spotStore.map = map;
  };

  
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;
        console.log(`longitude: ${ lng } | latitude: ${ lat }`);
        this.spotStore.geolocation.center.lat = lat
        this.spotStore.geolocation.center.lat = lng
      });
    }
  }

  render() {


    return (

      <div className="container-fluid">


        <div className="container container-dashboard big-container ">
          <div className="spacer" />

          <div className="row">

            <div className="col-4 col-md-4 col-sm-12 order-sm-1">
              <div className="delishus-card spot-detail p-3">
                <h3>{this.spotStore.selectedSpot.name}</h3>
                <img className="img-fluid detail-image shadow" alt="gag" src ={ this.spotStore.selectedSpot.image} />
                <div className="spacer"></div>
                <p>{this.spotStore.selectedSpot.address}</p>
                <p> Rating: {this.spotStore.selectedSpot.rating}</p>
                <hr></hr>
              </div>
            </div>
         
            <div className="col-8 col-md-8 col-sm-12 order-sm-2">
         
          
              <div className="google-map-container">

              {this.state.gmapsLoaded ?  <Search /> : null }
              <div className="delishus-card google-map ">
                <GoogleMapReact
                  bootstrapURLKeys={{ key: 'AIzaSyAJdMUyuQiG2DEHgGG3Tvebb9-BzR0JXwE', libraries: "places" }}
                  defaultZoom={11}
                  onGoogleApiLoaded={({ map, maps }) => this.apiIsLoaded(map, maps)}
                  center =  {this.spotStore.geolocation.center}
                  >
                   
                  {/* <AnyReactComponent
                    lat={this.state.lat}
                    lng={this.state.long}
                    text="My Marker"
                  /> */}
                </GoogleMapReact>
              </div>   
              </div>
            </div>

          </div>
        </div>
      </div>
      
    )
  }
}
const authCondition = (authUser) => !!authUser;

export default compose(withAuthorization(authCondition))(DogList);
