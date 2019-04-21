import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {compose} from 'recompose';
import styled from 'styled-components';
import UserDetailsCard from '../../components/UserDetailsCard';
import withAuthorization from '../../components/hoc/withAuthorization';
import Spacer from '../../components/layout/Spacer';
import {Switch, Route} from 'react-router-dom';
import UserList from './UserList';
import User from './User';
import MobileUser from './MobileUser';
import MobileUserList from './MobileUserList';
import preventDefault from "../../utils/eventListeners"


const GoogleMapContainer = styled.div`
  height: 100%;
`;

const DashboardContainer = styled.div`
  height: calc(100%);
  position: relative;
`;

const DashboardRowContainer = styled.div`
  height: 100%;
  max-height: 100%;
`;

const SpotDetailsCardWrapper = styled.div`
  height: 100%;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
  border-radius: 18px;
  background-color: white;
`;

const DashboardLeftSide = styled.div`
  height: 90%;
`;
const DashboardRightSide = styled.div`
  height: 90%;
`;

@inject('sessionStore', 'spotStore', 'uiStore', 'fireStore', 'userStore')
@observer
class UsersPage extends Component {
  
 
  spotStore = this.props.spotStore;
  userStore = this.props.userStore;
  uiStore = this.props.uiStore;
  componentWillMount() {
    this.userStore.getAllUsers();
  }

  componentDidMount(){
    
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path='/users' component={MobileUserList} key="MobileUserList" />
          <Route path='/users/:userId?' component={MobileUser} key="MobileUser" />
        </Switch>
        <DashboardContainer id='dashboard-container' className='container d-none d-lg-block'>
          <Spacer />

          <DashboardRowContainer id='DashboardRowContainer' className='row d-none d-lg-flex'>
            <DashboardLeftSide id='dashbaord-left-side' className='col-md-4'>
              <SpotDetailsCardWrapper id='dashbaord-details-wrapper' className='delishus-card spot-detail'>
                <UserDetailsCard />
              </SpotDetailsCardWrapper>
            </DashboardLeftSide>

            <DashboardRightSide id='dashbaord-right-side' className='col-md-12 col-lg-8'>
              <GoogleMapContainer id='google-map-container'>
                <Switch>
                  <Route exact path='/users' component={UserList} key="UserList" />
                  <Route path='/users/:userId?' component={User} key="User" />
                </Switch>
              </GoogleMapContainer>
            </DashboardRightSide>
          </DashboardRowContainer>
        </DashboardContainer>
      </React.Fragment>
    );
  }
}
const authCondition = authUser => !!authUser;

export default compose(withAuthorization(authCondition))(UsersPage);
