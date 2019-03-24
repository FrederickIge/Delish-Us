import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import withAuthorization from '../../components/hoc/withAuthorization';
import Table from 'react-bootstrap/Table'

@inject('sessionStore', 'spotStore')
@observer
class MobileSpotList extends Component {

    spotStore = this.props.spotStore;
    sessionStore = this.props.sessionStore;

    state = {
        mobileStyle: {},
        mobileSearch: {}
    }


    componentDidMount() {

    }

    selectSpot(spot) {
        this.props.spotStore.selectExistingSpot(spot);
    }

    render() {
        return (
            <div className="delishus-map-card-mobile-list spot-list d-lg-none" style={{ display: this.spotStore.mapView ? 'none' : 'block',height:"100%", width:"100%", overflow: "scroll" }}>
                <div className="container-fluid">
                    <br></br>

            
                    {!this.spotStore.showAllSpots ?
                        this.spotStore.uniqueSpotsByGooglePlaceIds.map((spot) =>
                            <div  key={spot.key} onClick={() => this.selectSpot(spot)} className="py-4 pl-4 spot-list-item border-bottom">
                                <div style={{ fontSize: "24px", color:"rgba(0, 0, 0, 0.85)"}}>{spot.name}</div>
                            </div>            
                    ): null
                    }

                    {this.spotStore.showAllSpots ?
                        this.spotStore.currentUserSpots.map((spot) =>
                            <div  key={spot.key} onClick={() => this.selectSpot(spot)} className="py-4 pl-4 spot-list-item border-bottom">
                                <div style={{ fontSize: "24px", color:"rgba(0, 0, 0, 0.85)"}}>{spot.name} </div>
                            </div>            
                    )
                    : null}

                </div>


            </div>
        )
    }
}
const authCondition = (authUser) => !!authUser;

export default compose(withAuthorization(authCondition))(MobileSpotList);
