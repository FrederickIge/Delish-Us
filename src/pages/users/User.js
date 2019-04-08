import React from 'react';
import { inject, observer } from 'mobx-react';
import Spacer from '../../components/layout/Spacer';
import styled from 'styled-components';
import ContentLoader, { Facebook } from "react-content-loader";

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

  async componentDidMount() {
    let userId = this.props.match.params.userId;
    // this.userStore.getUserComments(userId);
    // this.userStore.getUserSpots(userId);

    let result = await this.fireStore.getUserById(userId);

    console.log(this.props.history)

    this.userStore.selectedUser = {
      username: result.data().displayName,
      email: result.data().email
    }

  }

  handleBack = () => {
    console.log(this.props.history.location.state)
    if(!this.props.history.location.state){
      this.props.history.push('/dashboard');
    }
   else if(this.props.history.location.state.prevPath == "users"){
      this.props.history.push('/users');
    } 
    else if(this.props.history.location.state.prevPath == "dashboard"){
      this.uiStore.showModal();
      this.props.history.goBack();
    }
    
   
  }

  render() {
    return (


      <DelishusMapCard id="dcard" style={{  overflowY:"scroll", WebkitOverflowScrolling:"touch" }} >
        <div className='container' >

          <div style={{ height: "20px" }}></div>
          <div onClick={this.handleBack} style={{ fontSize: "20px", cursor: "pointer", color:"black" }}>
            <i className="fa fa-arrow-left" aria-hidden="true"></i> Back
          </div>

          <div style={{ height: "20px" }}></div>

          <h2>Saved Spots</h2>
          <hr style={{ marginTop: '0px' }} />






          {this.userStore.currentUserSpots.map(spot => (
            <div style ={{paddingTop:"10px"}} key={spot.googlePlaceId}> {spot.spotName} </div>
          ))}

          <Spacer />

          <h2>Comments</h2>

          <hr style={{ marginTop: '0px' }} />


          {this.userStore.currentUserComments.map(comment => (
            <div key={comment.spotId}>
              <div style={{ fontSize: '22px' , color: "black" }}>
                <b style={{color:"black" }}> {comment.spotName}</b>
              </div>
              <p style={{color:"black" }}> {comment.comment} </p>
            </div>
          ))}


        </div>
      </DelishusMapCard>


    );
  }
}
export default UserPage;
