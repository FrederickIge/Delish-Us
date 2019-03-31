import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import withAuthorization from '../hoc/withAuthorization';
import styled from "styled-components";

const SpotName = styled.div`
font-size:24px;
color: rgba(0, 0, 0, 0.85);
font-weight: bold;
`;

const SpotNameWrapper = styled.div``;

@inject('sessionStore', 'spotStore', 'uiStore')
@observer
class MobileSpotList extends Component {

    spotStore = this.props.spotStore;
    sessionStore = this.props.sessionStore;
    uiStore = this.props.uiStore;
    
    selectSpot(spot) {
        this.props.spotStore.selectExistingSpot(spot);
    }

    render() {
        return (
            <React.Fragment>


            
            <div id= "mobile-list" className="delishus-map-card-mobile-list spot-list d-lg-none" style={{ display: this.uiStore.mapView ? 'none' : 'block', height:"100%", width:"100%", color: "rgba(0, 0, 0, 0.85)", overflowY:"scroll" }}>
                <div className="container-fluid" style ={{height:"50%"}}>
                    <br></br>

            
                    {this.spotStore.showAllSpots ?
                        this.spotStore.uniqueSpotsByGooglePlaceIds.map((spot) =>
                            <SpotNameWrapper  key={spot.key} onClick={() => this.selectSpot(spot)} className="py-4 pl-4 spot-list-item border-bottom">
                                <SpotName>{spot.name}</SpotName>
                            </SpotNameWrapper>            
                    ): null
                    }

                    {!this.spotStore.showAllSpots ?
                        this.spotStore.currentUserSpots.map((spot) =>
                            <SpotNameWrapper  key={spot.key} onClick={() => this.selectSpot(spot)} className="py-4 pl-4 spot-list-item border-bottom">
                                <SpotName>{spot.name} </SpotName>
                            </SpotNameWrapper>            
                    )
                    : null}

                </div>


            </div>
            </React.Fragment>
        )
    }
}
const authCondition = (authUser) => !!authUser;

export default compose(withAuthorization(authCondition))(MobileSpotList);
