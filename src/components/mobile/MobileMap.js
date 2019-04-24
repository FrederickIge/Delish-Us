import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {compose} from 'recompose';
import withAuthorization from '../hoc/withAuthorization';
import GoogleMapReact from 'google-map-react';
import MobileSearch from './MobileSearch';
import styled from 'styled-components';
import MobileRandomButton from './MobileRandomButton';
import MobileMapSwitcher from './MobileMapSwitcher';

const AnyReactComponent = ({text, onClick}) => (
  <div onClick={onClick} className='demo'>
    <p data-tooltip={text}> </p>
  </div>
);

const MobileSearchWrapper = styled.div`
z-index 50000;
width:100%;
left:0
right:0;
`;

const DisplayText = styled.div`
  color: rgba(0, 0, 0, 0.9);
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
  top: 149px;
  bottom: 0;
  left: 0;
  right: 0;
`;

const DisplayTextWrapper = styled.div``;

@inject('sessionStore', 'spotStore', 'uiStore')
@observer
class MobileMap extends Component {

  spotStore = this.props.spotStore;
  sessionStore = this.props.sessionStore;
  uiStore = this.props.uiStore;

  selectSpot(spot) {
    this.spotStore.selectExistingSpot(spot);
  }

  componentDidMount() {}

  onChange = ({center, zoom}) => {
    this.spotStore.mapZoom = zoom;
    this.spotStore.mapGeolocation = {lat: center.lat, lng: center.lng};
  };

  render() {
    return (
      <div className='d-lg-none' style={{display: this.uiStore.mapView ? 'block' : 'none', zIndex: '10', width: '100%'}}>
        <div style={{position: 'fixed', top: '60', right: '0', left: '0'}}>
          {this.spotStore.gmapsLoaded ? (
            <MobileSearchWrapper>
              <MobileSearch />
            </MobileSearchWrapper>
          ) : null}

          {this.uiStore.hideMobileMap ? (
            <ToolBar className='d-flex align-items-center justify-content-between'>
              <MobileRandomButton />

              <DisplayTextWrapper className='align-self-center'>
                <DisplayText>{this.spotStore.showAllSpots ? <b>All Spots</b> : <b>My Spots</b>}</DisplayText>
              </DisplayTextWrapper>

              <MobileMapSwitcher />
            </ToolBar>
          ) : null}
        </div>
        {this.uiStore.hideMobileMap ? (
          <MobileMapWrapper id='mobile-map'>
            <i
              style={{fontSize: '1.6em'}}
              id='mobile-recenter'
              onClick={this.spotStore.recenterMap}
              className='fa fa-location-arrow  mobile-recenter'
              aria-hidden='true'
            />

            <GoogleMapReact
              id='bangbang'
              defaultZoom={this.spotStore.mapZoom}
              onGoogleApiLoaded={({map, maps}) => this.spotStore.apiIsLoaded(map, maps)}
              center={this.spotStore.mapGeolocation}
              options={{fullscreenControl: false, zoomControl: false}}
              onChange={this.onChange}
              zoom={this.spotStore.mapZoom}
            >
              {this.spotStore.showAllSpots
                ? this.spotStore.uniqueSpotsByGooglePlaceIds.map(spot => (
                    <AnyReactComponent
                      key={spot.key + '-m'}
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
                      key={spot.key + '-m'}
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
                  onClick={() => this.uiStore.openDrawer()}
                />
              ) : null}
            </GoogleMapReact>
          </MobileMapWrapper>
        ) : null}
      </div>
    );
  }
}
const authCondition = authUser => !!authUser;

export default compose(withAuthorization(authCondition))(MobileMap);
