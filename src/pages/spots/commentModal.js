import React, {Component} from 'react';
import { inject, observer } from 'mobx-react';
import Modal from 'react-bootstrap/Modal'
import Comment from '../../models/Comment'
import firebase from 'firebase';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

const styles = theme => ({
  typography: {
    padding: theme.spacing.unit * 2,
  },
});

@inject('routingStore', 'sessionStore', 'spotStore','fireStore')
@observer
class CommentModal extends Component {

  routingStore = this.props.routingStore;
  sessionStore = this.props.sessionStore;
  spotStore = this.props.spotStore;
  fireStore = this.props.fireStore;
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
    this.spotStore.comments.push(newComment);
    this.setState({comment:''})
  }

  getCommentsBySpotId() {
      this.spotStore.getCommentsBySpotId()
  }

  prepareComment(comment, selectedSpot, user) {
    return {
      id: Math.random().toString(36).substring(7),
      comment: comment,
      spotId: selectedSpot.key,
      userId: user.uid,
      userName: user.displayName,
      timeCreated: firebase.firestore.Timestamp.fromDate(new Date())
    }
  }

  componentDidCatch(){

    this.getCommentsBySpotId();
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
  render() {
    return (
        <>
   
          <Modal
            show={this.spotStore.showModal}
            onHide={this.spotStore.handleHide}
            dialogClassName="delishus-map-card"
            aria-labelledby="example-custom-modal-styling-title"
          >

            <Modal.Header closeButton>
              <Modal.Title id="example-custom-modal-styling-title">
                Comments
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>


            {this.spotStore.comments.map((comment) =>

              <div key={comment.id}>
                <div>{comment.userName}</div>
                <br></br>
                <div>{comment.comment}</div>
                {/* <div className="d-flex flex-row-reverse">  <i className="fa fa-trash" aria-hidden="true"></i></div> */}
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
