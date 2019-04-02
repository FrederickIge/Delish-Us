import React from 'react';
import {inject, observer} from 'mobx-react';
import Spacer from '../../components/layout/Spacer';
import UserDetailsCard from '../../components/UserDetailsCard';
import styled from 'styled-components';

const DelishusMapCard = styled.div`
box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
padding: 8px;
border-radius: 18px;
background-color: white;
height:100%;
`;


@inject('sessionStore', 'spotStore', 'uiStore', 'fireStore', 'userStore')
@observer
class UserPage extends React.Component {
  sessionStore = this.props.sessionStore;
  spotStore = this.props.spotStore;
  uiStore = this.props.uiStore;
  fireStore = this.props.fireStore;
  userStore = this.props.userStore;

  componentDidMount() {
    let userId = this.props.match.params.userId;
    this.userStore.getUserComments(userId);
    this.userStore.getUserSpots(userId);
  }

  render() {
    return (

       
<DelishusMapCard id="dcard">
      <div className='container' >
        <div>
          <UserDetailsCard />
        </div>

        <h2>Saved Spots</h2>
        <hr style={{marginTop: '0px'}} />
        {this.userStore.currentUserSpots.map(spot => (
          <div key={spot.googlePlaceId}> {spot.spotName} </div>
        ))}

        <Spacer />

        <h2>Comments</h2>

        <hr style={{marginTop: '0px'}} />
        {this.userStore.currentUserComments.map(comment => (
          <div key={comment.spotId}>
            <div style={{fontSize: '22px'}}>
              <b> {comment.spotName}</b>{' '}
            </div>
            <p> {comment.comment} </p>
          </div>
        ))}
      </div>
      </DelishusMapCard>


    );
  }
}
export default UserPage;
