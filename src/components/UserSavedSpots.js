import React from 'react';
import {inject, observer} from 'mobx-react';
import Spacer from './layout/Spacer';
import styled from 'styled-components';
import Geopoint from '../models/Geopoint';
import { matchPath } from "react-router";

const Spot = styled.div`
  cursor: pointer;
  color: #1890ff;
  &:hover {
    text-decoration: underline #1890ff;
  }
`;

@inject('sessionStore', 'uiStore', 'fireStore', 'userStore', 'routingStore')
@observer
class UserSavedSpots extends React.Component {

  userStore = this.props.userStore;
  
  render() {
    return (
      <React.Fragment>
        <h2>Saved Spots</h2>
        <hr style={{marginTop: '0px'}} />
        {this.userStore.currentUserSpots.map(spot => (
          <Spot onClick={() => this.userStore.loadUserSpot(spot)} style={{paddingTop: '10px'}} key={spot.key}>
            {spot.name}
          </Spot>
        ))}
        <Spacer />
      </React.Fragment>
    );
  }
}
export default UserSavedSpots;
