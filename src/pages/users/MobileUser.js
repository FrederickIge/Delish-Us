import React from 'react';
import { inject, observer } from 'mobx-react';
import Spacer from '../../components/layout/Spacer';
import UserDetailsCard from '../../components/UserDetailsCard';
import styled from 'styled-components';
import Geopoint from "../../models/Geopoint";

const DelishusMapCard = styled.div`
box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);

width:100%;
background-color: white;
height:100%;
`;

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

  componentDidMount() {
    // let userId = this.props.match.params.userId;
    // this.userStore.getUserComments(userId);
    // this.userStore.getUserSpots(userId);
  }

  handleBack = () => {
    if (!this.props.history.location.state) {
      this.props.history.push('/dashboard');
    } else if (this.props.history.location.state.prevPath == 'users') {
      this.props.history.push('/users');
    } else if (this.props.history.location.state.prevPath == 'dashboard') {
      this.uiStore.showModal();
      this.props.history.goBack();
    }
  };

  async loadSpot(spot) {
    
    await this.spotStore.selectExistingSpotMobile(spot);
    this.props.history.push('/dashboard');
    
  }

  loadSpotbyId = async id => {
    let doc = await this.fireStore.fetchSingleSpot(id);
    this.loadSpot(new Geopoint(doc));
  };

  deleteComment(id) {
    this.userStore.deleteComment(id);
  }


  render() {
    return (
      <div style={{backgroundColor: 'white', minHeight: '100%'}} className='d-lg-none'>
        <div style={{height: '20px'}} />
        <div className='container'>
          <div onClick={this.handleBack} style={{fontSize: '20px', cursor: 'pointer', color: 'black'}}>
            <i className='fa fa-arrow-left' aria-hidden='true' /> Back
          </div>

          <UserDetailsCard />

          <h2>Saved Spots</h2>
          <hr style={{marginTop: '0px'}} />
          {this.userStore.currentUserSpots.map(spot => (
            <Spot onClick={() => this.loadSpot(spot)} style={{paddingTop: '10px'}} key={spot.key}>
              {' '}
              {spot.name}{' '}
            </Spot>
          ))}

          <Spacer />
          <br />
          <h2>Comments</h2>

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
          ))}
        </div>

        <div style={{height: '20px'}} />
      </div>
    );
  }
}
export default MobileUserPage;
