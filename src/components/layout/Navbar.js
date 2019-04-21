import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import AvatarMenu from './avatar-menu';
import styled from 'styled-components';

const Nav = styled.div`
  z-index: 1;
  background-color: white !important;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
`;

const AvatarImg = styled.img`
  height: 25px !important;
  padding-bottom: 3px !important;
`;

const ViewSwitcher = styled.span`
  textdecoration: none;
  color: #1890ff;
`;

@inject('routingStore', 'sessionStore', 'spotStore', 'uiStore')
@observer
class Navbar extends Component {
  routingStore = this.props.routingStore;
  sessionStore = this.props.sessionStore;
  spotStore = this.props.spotStore;
  uiStore = this.props.uiStore;

  render() {
    const NavigationNonAuth = () => (
      <nav className='navbar navbar-expand-lg py-2 fixed-top' style={{backgroundColor: 'white'}}>
        <div className='container'>
          <Link style={{textDecoration: 'none'}} to='/dashboard'>
            <AvatarImg className='img-fluid' src={require('../../img/compass.png')} alt='Logo' />
            <b className='ml-3'>DELISH-US</b>
          </Link>

          <Link style={{textDecoration: 'none'}} to='/login' className='ml-auto mr-3 nav-text-style'>
            <b>LOGIN</b>
          </Link>
        </div>
      </nav>
    );

    const NavigationAuth = props => (
      <nav className='navbar navbar-expand-lg py-2'>
        <div className='container'>
          <Link style={{textDecoration: 'none'}} to='/dashboard'>
            <AvatarImg className='img-fluid' src={require('../../img/compass.png')} alt='Logo' />
            <b className='ml-3'>DELISH-US</b>
          </Link>

          <ViewSwitcher className='ml-auto mr-3 nav-text-style'>
            <Link id = "users-link" style={{textDecoration: 'none'}} to='/users'>
              <span className='ml-auto mr-3 nav-text-style'>
                <b>USERS</b>
              </span>
            </Link>
          </ViewSwitcher>
{/* <p onClick={this.uiStore.startTour}>test</p> */}
          <AvatarMenu />
        </div>
      </nav>
    );

    return (
      <Nav id='app-navbar' className='doggo-nav'>
        {this.sessionStore.authUser ? (
          <NavigationAuth mapView={this.uiStore.mapView} photoURL={this.sessionStore.authUser.photoURL} />
        ) : (
          <NavigationNonAuth />
        )}
      </Nav>
    );
  }
}
export default Navbar;
