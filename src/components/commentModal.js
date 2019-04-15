import React, {Component} from 'react';
import { inject, observer } from 'mobx-react';
import Modal from 'react-bootstrap/Modal'
import Comment from '../models/Comment'
import firebase from 'firebase';
import styled from 'styled-components';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple';

const UserListItem = styled.div`
  cursor: pointer;
  color: #1890ff;
  &:hover {
    text-decoration: underline #1890ff; 
  }
`;

@inject('routingStore', 'sessionStore', 'spotStore','fireStore', 'uiStore','commentStore')
@observer
class CommentModal extends Component {

  routingStore = this.props.routingStore;
  sessionStore = this.props.sessionStore;
  spotStore = this.props.spotStore;
  fireStore = this.props.fireStore;
  uiStore = this.props.uiStore
  commentStore = this.props.commentStore;

  userId = this.sessionStore.authUser.uid

  targetElement = null;
  state = {
    comment: ''
  }

  handleChange = (event) => {
    this.setState({ comment: event.target.value });
  }

  submitComment = async (event) => {
    let comment = this.prepareComment(this.state.comment, this.spotStore.selectedSpot, this.sessionStore.authUser);
    let newComment = await this.fireStore.postComment(comment);
    newComment = new Comment(newComment);
    this.commentStore.comments.push(newComment);
    this.setState({comment:''})
  }

  onEnterPress = (e) => {
    if(e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      this.submitComment()
    }
  }

  getCommentsByGooglePlaceId() {
      this.commentStore.getCommentsByGooglePlaceId();
  }

  deleteComment(id){
    this.commentStore.deleteComment(id);
  }
  prepareComment(comment, selectedSpot, user) {
    return {
      id: Math.random().toString(36).substring(7),
      comment: comment,
      spotId: selectedSpot.key,
      spotName: selectedSpot.name,
      userId: user.uid,
      userName: user.displayName,
      timeCreated: firebase.firestore.Timestamp.fromDate(new Date()),
      googlePlaceId: this.spotStore.selectedSpot.googlePlaceId
    }
  }

  componentDidCatch(){
    this.getCommentsByGooglePlaceId();
  }

  componentDidMount(){
    // clearAllBodyScrollLocks();
    // disableBodyScroll(this.targetElement);
  }

  componentWillUnmount() {
    //  clearAllBodyScrollLocks();
    // this.targetElement = document.querySelector('#root');
  }

  goToUser = (userId) => {
 
   this.uiStore.goToUserHideModal();
   this.routingStore.history.push({
    pathname: '/users/' + userId,
    state: { prevPath: "dashboard" }
});
  }

  render() {
    return (
      <>
        <Modal
          show={this.uiStore.modalState}
          onHide={this.uiStore.hideModal}
          dialogClassName='delishus-map-card'
          aria-labelledby='example-custom-modal-styling-title'
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title id='example-custom-modal-styling-title'>This spot was saved by:</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {this.spotStore.likedBy.map(user => (
              <React.Fragment key={user.userId}>
                <UserListItem onClick={() => this.goToUser(user.userId)}>
                  <i className='fa fa-user' aria-hidden='true' style={{paddingRight: '10px', color: '#1890ff'}} />
                  <span style={{color: '#1890ff', textDecorationColor: '#1890ff'}}>{user.userName}</span>
                </UserListItem>

                <br />
              </React.Fragment>
            ))}
          </Modal.Body>

          <Modal.Header>
            <Modal.Title id='example-custom-modal-styling-title'>User Comments</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {this.commentStore.comments.map(comment => (
              <div key={comment.id}>
                <UserListItem onClick={() => this.goToUser(comment.userId)}>{comment.userName}</UserListItem>

                <br />

                <div>{comment.comment}</div>
                
                {comment.userId == this.sessionStore.authUser.uid ? (
                  
                  <div className='text-right'>
                  {/* <TouchRipple> */}
                    <i onClick={() => this.deleteComment(comment.id)} className='fa fa-trash' aria-hidden='true' />
                    {/* </TouchRipple> */}
                  </div>

                ) : null}

                <hr style={{marginTop: '10px'}} />
              </div>
            ))}

            <textarea
              onKeyDown={this.onEnterPress}
              value={this.state.comment}
              className='form-control'
              id='exampleFormControlTextarea1'
              rows='3'
              placeholder='Enter Comment ...'
              onChange={this.handleChange}
            />
            <br />
            <button
              onClick={this.submitComment}
              disabled={!this.state.comment || this.commentStore.hasCommented}
              type='button'
              className='btn btn-success'
            >
              Submit
            </button>
          </Modal.Body>
        </Modal>
      </>
    );

  }
}
export default CommentModal;
