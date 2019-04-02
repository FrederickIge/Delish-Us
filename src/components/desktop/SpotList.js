import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import withAuthorization from '../hoc/withAuthorization';

@inject('sessionStore', 'spotStore','uiStore')
@observer
class SpotList extends Component {

    spotStore = this.props.spotStore;
    sessionStore = this.props.sessionStore;
    uiStore = this.props.uiStore;
    
    state = {
        mobileStyle: {}
    }
    selectSpot(spot) {
        this.props.spotStore.selectExistingSpot(spot);
    }

    render() {
        return (
            <div className="delishus-map-card spot-list" style={{ display: this.uiStore.mapView ? 'none' : 'block', height:"100%", overflowY:"scroll"}}>
                    <br></br>

            
                    {this.spotStore.showAllSpots ?
                        this.spotStore.uniqueSpotsByGooglePlaceIds.map((spot) =>
                            <div key={spot.key} onClick={() => this.selectSpot(spot)} className="py-4 pl-4 spot-list-item border-bottom">
                                <div style={{ fontSize: "24px", color:"rgba(0, 0, 0, 0.85)"}}><b>{spot.name}</b></div>
                            </div>            
                    ): null
                    }

                    {!this.spotStore.showAllSpots ?
                        this.spotStore.currentUserSpots.map((spot) =>
                            <div key={spot.key} onClick={() => this.selectSpot(spot)} className="py-4 pl-4 spot-list-item border-bottom">
                                <div style={{ fontSize: "24px", color:"rgba(0, 0, 0, 0.85)"}}><b>{spot.name}</b> </div>
                            </div>            
                    )
                    : null}

               


            </div>
        )
    }
}
const authCondition = (authUser) => !!authUser;

export default compose(withAuthorization(authCondition))(SpotList);
