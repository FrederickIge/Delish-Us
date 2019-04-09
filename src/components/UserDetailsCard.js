import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import withAuthorization from './hoc/withAuthorization';
import StarRatingComponent from 'react-star-rating-component';
import CommentModal from './commentModal';
import styled from 'styled-components';
import Spacer from './layout/Spacer';
import SaveSpotButton from './SaveSpotButton';
import DeleteSpotButton from './DeleteSpotButton';

const CardDetailsContainer = styled.div`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  min-height: 100%;
`;


const DetailImageWrapper = styled.div`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: 10%;
`;

const SpotDetailImage = styled.img`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  max-height: 25vh;
  width: 100%;
`;

const SpotName = styled.h3`
  border-top-left-radius: 10px;
  font-weight: bold;
`;

const SpotAddress = styled.div``;

const UserCard = styled.div`

padding: 8px;
border-radius: 11px;

min-height:120px;
margin-top:10px;
`;

@inject('sessionStore', 'spotStore', 'uiStore', 'commentStore', 'userStore')
@observer
class UserDetailsCard extends Component {
  spotStore = this.props.spotStore;
  sessionStore = this.props.sessionStore;
  uiStore = this.props.uiStore;
  commentStore = this.props.commentStore;
  userStore = this.props.userStore
  handleDelete = () => {
    this.spotStore.deleteSpot();
  };

  truncateWithEllipses(text, max) {
    return text.substr(0, max - 1) + (text.length > max ? '&hellip;' : '');
  }

  render() {
    return (
      <React.Fragment>

        <CommentModal />

        <CardDetailsContainer id="card-details-container">
          <Spacer />
          <Spacer />

          <DetailImageWrapper id="card-image-wrapper" className="mx-auto text-center">
            <img style={{ width: 100, height: 100 }} height="50" className='img-fluid' alt='gag' src={require("../img/default-user.png")} />
          </DetailImageWrapper>

          <Spacer />

          <div className='p-3' id="card-detail -text">

            <UserCard className="text-center" >
              <h3>{this.userStore.selectedUser.username}</h3>
              <div>{this.userStore.selectedUser.email}</div>
            </UserCard>

          </div>

        </CardDetailsContainer>


      </React.Fragment>
    );
  }
}
const authCondition = authUser => !!authUser;

export default compose(withAuthorization(authCondition))(UserDetailsCard);
