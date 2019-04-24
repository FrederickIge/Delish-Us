import React from 'react';
import { inject, observer } from 'mobx-react';
import Spacer from '../../components/layout/Spacer';
import UserDetailsCard from '../../components/UserDetailsCard';
import styled from 'styled-components';
import Geopoint from "../../models/Geopoint";
import BackButton from '../../components/BackButton'
import UserSavedSpots from '../../components/UserSavedSpots'
import UserComments from '../../components/UserComments'
const Spot = styled.div`
  cursor: pointer;
  color: #1890ff;
  &:hover {
    text-decoration: underline #1890ff; 
  }
`;

const SpotCommentTitle = styled.b`
  cursor: pointer;
  color: #1890ff;
  font-size: '22px';
  &:hover {
    text-decoration: underline #1890ff; 
  }
`;

@inject('sessionStore', 'spotStore', 'uiStore', 'fireStore', 'userStore')
@observer
class MobileUserPage extends React.Component {

  sessionStore = this.props.sessionStore;
  spotStore = this.props.spotStore;
  uiStore = this.props.uiStore;
  fireStore = this.props.fireStore;
  userStore = this.props.userStore;




  render() {
    return (
      <div style={{backgroundColor: 'white', minHeight: '100%'}} className='d-lg-none'>
        <div style={{height: '20px'}} />
        <div className='container'>


          <BackButton/>

          <UserDetailsCard />

          <UserSavedSpots/>
          <br />

          <UserComments/>

          {/* <h2>Comments</h2>

          <hr style={{marginTop: '0px'}} />
          {this.userStore.currentUserComments.map(comment => (
            <div key={comment.commentId}>
              <div onClick={() => this.loadSpotbyId(comment.spotId)} style={{fontSize: '22px', color: 'black'}}>
                <SpotCommentTitle> {comment.spotName}</SpotCommentTitle>
              </div>
              <p style={{color: 'black'}}> {comment.comment} </p>
              <div className='text-right'>
                <i onClick={() => this.deleteComment(comment.commentId)} className='fa fa-trash' aria-hidden='true' />
              </div>
            </div>
          ))} */}


        </div>

        <div style={{height: '20px'}} />
      </div>
    );
  }
}
export default MobileUserPage;
