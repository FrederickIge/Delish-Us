import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import withAuthorization from '../hoc/withAuthorization';
import styled from "styled-components";

const SpotListStyled = styled.div`
box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
padding: 8px;
border-radius: 18px;
background-color: white;
`;

const SpotName = styled.div`
font-size:24px;
color: rgba(0, 0, 0, 0.85);
font-weight: bold;
`;

const SpotNameWrapper = styled.div``;

@inject('sessionStore', 'spotStore')
@observer
class SpotList extends Component {

    spotStore = this.props.spotStore;
    sessionStore = this.props.sessionStore;

    selectSpot(spot) {
        this.spotStore.selectExistingSpot(spot);
    }

    render() {
        return (
            <SpotListStyled style={{ display: this.spotStore.mapView ? 'none' : 'block', height:"100%", overflowY:"auto"}}>

                    <br></br>

                    {this.spotStore.showAllSpots ?
                        this.spotStore.uniqueSpotsByGooglePlaceIds.map((spot) =>
                            <SpotNameWrapper key={spot.key} onClick={() => this.selectSpot(spot)} className="py-4 pl-4 spot-list-item border-bottom">
                                <SpotName>{spot.name}</SpotName>
                            </SpotNameWrapper>            
                    ): null
                    }

                    {!this.spotStore.showAllSpots ?
                        this.spotStore.currentUserSpots.map((spot) =>
                            <SpotNameWrapper key={spot.key} onClick={() => this.selectSpot(spot)} className="py-4 pl-4 spot-list-item border-bottom">
                                <SpotName>{spot.name} </SpotName>
                            </SpotNameWrapper>            
                    )
                    : null}

               
            </SpotListStyled>
        )
    }
}
const authCondition = (authUser) => !!authUser;

export default compose(withAuthorization(authCondition))(SpotList);
