import React from 'react';
import {inject, observer} from 'mobx-react';
import Spacer from './layout/Spacer';
import styled from 'styled-components';
import Geopoint from '../models/Geopoint';
import {matchPath} from 'react-router';

const SpotCommentTitle = styled.b`
  cursor: pointer;
  color: #1890ff;
  font-size: '22px';
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
        <h2>Comments</h2>

        <hr style={{marginTop: '0px'}} />

        {this.userStore.currentUserComments.map(comment => (
          <div key={comment.commentId}>
            <div onClick={() => this.userStore.loadUserSpotbyId(comment.spotId)} style={{fontSize: '22px', color: 'black'}}>
              <SpotCommentTitle> {comment.spotName}</SpotCommentTitle>
            </div>
            <p style={{color: 'black'}}> {comment.comment} </p>
            <div className='text-right'>
              <i onClick={() => this.userStore.deleteComment(comment.commentId)} className='fa fa-trash' aria-hidden='true' />
            </div>
          </div>
        ))}
        
      </React.Fragment>
    );
  }
}
export default UserSavedSpots;
