import React, {Component} from 'react';
import { inject, observer } from 'mobx-react';
import Modal from 'react-bootstrap/Modal'
import Comment from '../models/Comment'
import firebase from 'firebase';
import { disableBodyScroll,clearAllBodyScrollLocks } from 'body-scroll-lock';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const UserListItem = styled.div`
  cursor: pointer;
  &:hover {
    text-decoration: underline; 
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

  getCommentsByGooglePlaceId() {
      this.commentStore.getCommentsByGooglePlaceId();
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
    clearAllBodyScrollLocks();
    console.log("mount")
    disableBodyScroll(this.targetElement);
  }

  componentWillUnmount() {
    console.log("unmount")
    this.targetElement = document.querySelector('#root');
  }

  goToUser = (userId)=>{
    this.uiStore.hideModal();
    console.log(this.props)
   this.routingStore.history.push('/users/' + userId);
  }

  render() {
    return (
        <>
   
          <Modal
            show={this.uiStore.modalState}
            onHide={this.uiStore.hideModal}
            dialogClassName="delishus-map-card"
            aria-labelledby="example-custom-modal-styling-title"
          >

            <Modal.Header closeButton>
              <Modal.Title id="example-custom-modal-styling-title">
                This spot was saved by:
              </Modal.Title>
            </Modal.Header>




        <Modal.Body>

        {this.spotStore.likedBy.map((user) =>
          <React.Fragment key={user.userId}>
         
          
          <UserListItem onClick={() => this.goToUser(user.userId) }>
           <i className="fa fa-user" aria-hidden="true"></i> 
           {user.userName}
           </UserListItem>

            <br></br>
          </React.Fragment>


          )}
        </Modal.Body>
           


            <Modal.Header closeButton>
              <Modal.Title id="example-custom-modal-styling-title">
                User Comments
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>


            {this.commentStore.comments.map((comment) =>

              <div key={comment.id}>
                <div>- {comment.userName}</div>
                <br></br>
                <div>{comment.comment}</div>
                <hr></hr>  
              </div>

            )}

           
            
              <textarea value={this.state.comment} className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Enter Comment ..."  onChange={this.handleChange}></textarea>
              <br></br>
              <button onClick = { this.submitComment } disabled = { !this.state.comment } type="button" className="btn btn-success">Submit</button>

            </Modal.Body>

          </Modal>
        </>
      );

  }
}
export default CommentModal;
