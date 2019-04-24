import React from 'react';
import {inject, observer} from 'mobx-react';
import styled from 'styled-components';
import BackButton from '../BackButton';
import UserSavedSpots from '../UserSavedSpots'
import UserComments from '../UserComments'

const DelishusMapCard = styled.div`
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
  padding: 8px;
  border-radius: 18px;
  background-color: white;
  height: 100%;
`;

@inject('sessionStore','uiStore', 'fireStore', 'userStore')
@observer
class DesktopUserProfile extends React.Component {

  sessionStore = this.props.sessionStore;
  uiStore = this.props.uiStore;
  fireStore = this.props.fireStore;
  userStore = this.props.userStore;
 
  async componentDidMount() {
 
    let userId = this.props.match.params.userId;
    this.userStore.getUserComments(userId);
    this.userStore.getUserSpots(userId);

    let result = await this.fireStore.getUserById(userId);

    this.userStore.selectedUser = {
      username: result.data().displayName,
      email: result.data().email
    };
  }

  render() {
    return (
      <DelishusMapCard id='dcard' style={{overflowY: 'scroll', WebkitOverflowScrolling: 'touch'}}>
        <div className='container'>
          <div style={{height: '20px'}} />

          <BackButton/>

          <div style={{height: '20px'}} />

          <UserSavedSpots/>

          <UserComments/>

        </div>
      </DelishusMapCard>
    );
  }
}
export default DesktopUserProfile;
