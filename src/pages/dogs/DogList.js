import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import posed from 'react-pose';
import firebase from 'firebase';
import GoogleMapReact from 'google-map-react';
import Modal from 'react-bootstrap/lib/Modal'

import Search from "../../components/Search"


import GooglePlacesSearch from "../../components/googlePlacesSearch";
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


@inject('routingStore', 'sessionStore')
@observer
class DogList extends Component {

  sessionStore = this.props.sessionStore;
  routingStore = this.props.routingStore;

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  state = {
    gmapsLoaded: false,
  };


  initMap = () => {
    this.setState({
      gmapsLoaded: true,
    })
  }
  
  componentDidMount () {
    window.initMap = this.initMap
    const gmapScriptEl = document.createElement(`script`)
    gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAJdMUyuQiG2DEHgGG3Tvebb9&libraries=places&callback=initMap`
    document.querySelector(`body`).insertAdjacentElement(`beforeend`, gmapScriptEl)
  }

  render() {


    return (

      <div className="container-fluid">


        <div className="container container-dashboard big-container ">
          <div className="spacer" />

          <div className="row">

            <div className="col-4 col-md-4 col-sm-12">
              <div className="delishus-card  spot-detail">
              </div>
            </div>
         
            <div className="col-8 col-md-8 col-sm-12">
            {this.state.gmapsLoaded && (
                <Search />
                )}
              <div className="delishus-card google-map">
                {/* <GoogleMapReact
                  bootstrapURLKeys={{ key: 'AIzaSyAJdMUyuQiG2DEHgGG3Tvebb9-BzR0JXwE' }}
                  defaultCenter={this.props.center}
                  defaultZoom={this.props.zoom}>

                  <AnyReactComponent
                    lat={59.955413}
                    lng={30.337844}
                    text="My Marker"
                  />
                </GoogleMapReact> */}
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
