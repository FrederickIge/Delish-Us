import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import firebase from 'firebase';
import withAuthorization from '../../components/hoc/withAuthorization';
import   Geopoint  from "../dogs/Geopoint";

const db = firebase.firestore();

@inject('sessionStore', 'spotStore')
@observer
class SpotDetailsCard extends Component {

    spotStore = this.props.spotStore;
    sessionStore = this.props.sessionStore;

    style = {
        minHeight: "70%"
    }

    handleSave = ( ) => {

    
        let payload = {
            name: this.spotStore.selectedSpot.name,
            latLng: new firebase.firestore.GeoPoint(this.spotStore.selectedSpot.lat, this.spotStore.selectedSpot.lng),
            googlePlaceId: this.spotStore.googlePlaceId,
            userId: this.sessionStore.authUser.uid
        }
  
        db.collection("spots").add(payload)
        .then((docRef) => {

            let latLng = {_lat: this.spotStore.selectedSpot.lat, _long:this.spotStore.selectedSpot.lng }

           let test = new Geopoint (this.spotStore.selectedSpot.name, latLng, this.spotStore.googlePlaceId, docRef.id, this.sessionStore.authUser.uid)
            this.spotStore.allSpots.push( test )
          console.log(this.spotStore.uniqueSpotsByGooglePlaceIds);
          console.log(this.spotStore.currentUserSpots);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }

    componentDidMount(){
    }

    render() {
        return (



            <div className="delishus-card spot-detail p-3">
                {this.spotStore.selectedSpot.name ?
                    <div style={this.style}>
                        <div style={this.style} className="spot-details-top">
                            <h3>{this.spotStore.selectedSpot.name}</h3>
                            <img className="img-fluid detail-image shadow" alt="gag" src={this.spotStore.selectedSpot.image} />
                            <div className="spacer"></div>
                            <p>{this.spotStore.selectedSpot.address}</p>
                            <p> Rating: {this.spotStore.selectedSpot.rating}</p>
                        </div>
                      

                    </div>
                    :
                    <div style={this.style}>
                        <div style={this.style} className="spot-details-top">
                            <h3 className="row justify-content-center">Select a Spot on the Map</h3>
                            <div className="spacer"></div>
                            <div className="row justify-content-center">
                                <i className="fa fa-cutlery fa-5x mx-auto" aria-hidden="true"></i>
                            </div>
                        </div>
                        
                    </div>
                }
                  <hr></hr>

                <div>
                    <div className="row justify-content-center">
                        <button type="button" className="btn btn-success mt-5 mb-5 btn-lg"  onClick={this.handleSave}>
                            <span className="btn-inner--icon"><i className="ni ni-fat-add"></i></span>
                            Save Spot
                    </button>
                    </div>
                </div>


            </div>

        )
    }
}
const authCondition = (authUser) => !!authUser;

export default compose(withAuthorization(authCondition))(SpotDetailsCard);
