import React from 'react';
import { inject, observer } from 'mobx-react';
import UserDetailsCard from '../UserDetailsCard';
import BackButton from '../BackButton'
import UserSavedSpots from '../UserSavedSpots'
import UserComments from '../UserComments'

@inject('sessionStore', 'spotStore', 'uiStore', 'fireStore', 'userStore')
@observer
class MobileUserProfile extends React.Component {

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

        </div>

        <div style={{height: '20px'}} />
      </div>
    );
  }
}
export default MobileUserProfile;
