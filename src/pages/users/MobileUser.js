import React from 'react';
import { inject, observer } from 'mobx-react';
import UserDetailsCard from '../../components/UserDetailsCard';
import BackButton from '../../components/BackButton'
import UserSavedSpots from '../../components/UserSavedSpots'
import UserComments from '../../components/UserComments'

@inject('sessionStore', 'spotStore', 'uiStore', 'fireStore', 'userStore')
@observer
class MobileUserPage extends React.Component {

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
export default MobileUserPage;
