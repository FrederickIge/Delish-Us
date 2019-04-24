import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import styled from 'styled-components';
import BackButton from '../BackButton'

const UserCard = styled.div`
box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
transition: all 0.3s cubic-bezier(.25,.8,.25,1);
padding: 8px;
border-radius: 11px;
background-color: white;
min-height:120px;
margin-top:10px;

&:hover {
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
`;

const DelishusMapCard = styled.div`
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
  padding: 8px;
  border-radius: 18px;
  background-color: white;
  height: 100%;
  word-wrap: break-word;
`;

const Spacer = styled.div`
height:20px;
`;


@inject('sessionStore', 'userStore')
@observer
class DesktopUserList extends Component {

  sessionStore = this.props.sessionStore;
  userStore = this.props.userStore;

  handleClick(user) {
    this.props.history.push({
      pathname: '/users/' + user.userId,
      state: {prevPath: 'users'}
    });

    this.userStore.selectedUser = {
      username: user.username,
      email: user.email
    };
  }

  handleBack = () => {
    this.props.history.push('/dashboard');
  };

  render() {
    return (
      <DelishusMapCard id='dcard'>
        <div className='container'>
        
          <Spacer/>

          <BackButton></BackButton>

          <div className='row row-eq-height'>
            {this.userStore.allUsers.map(user => (
              <React.Fragment key={user.userId}>
                <div className='col-xl-4 col-lg-6'>
                  <UserCard className='pl-3' onClick={() => this.handleClick(user)}>
                    <h3>{user.username}</h3>
                    <div>{user.email}</div>
                  </UserCard>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </DelishusMapCard>
    );
  }
}

export default DesktopUserList;
