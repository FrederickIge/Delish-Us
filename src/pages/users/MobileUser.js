import React from 'react';
import {inject, observer} from 'mobx-react';
import Spacer from '../../components/layout/Spacer';
import UserDetailsCard from '../../components/UserDetailsCard';
import styled from 'styled-components';

const DelishusMapCard = styled.div`
box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);

width:100%;
background-color: white;
height:100%;
`;


@inject('sessionStore', 'spotStore', 'uiStore', 'fireStore', 'userStore')
@observer
class MobileUserPage extends React.Component {
  sessionStore = this.props.sessionStore;
  spotStore = this.props.spotStore;
  uiStore = this.props.uiStore;
  fireStore = this.props.fireStore;
  userStore = this.props.userStore;

  componentDidMount() {
    // let userId = this.props.match.params.userId;
    // this.userStore.getUserComments(userId);
    // this.userStore.getUserSpots(userId);
  }

  handleBack =() => {
    this.props.history.goBack();
  }

  render() {
    return (

       
<div style={{backgroundColor:"white", height: "100%"}} className="d-lg-none">

<div style={{height:"20px"}}></div>
      <div className='container'>


<div onClick={this.handleBack} style={{fontSize:"20px", cursor: "pointer" }}>
<i className="fa fa-arrow-left" aria-hidden="true"></i> Back
</div>

          <UserDetailsCard />
      

        <h2>Saved Spots</h2>
        <hr style={{marginTop: '0px'}} />
        {this.userStore.currentUserSpots.map(spot => (
          <div key={spot.googlePlaceId}> {spot.spotName} </div>
        ))}

        <Spacer />
            <br></br>
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

      <div style={{height:"20px"}}></div>
      <div style={{height:"20px"}}></div>
      </div>


    );
  }
}
export default MobileUserPage;
