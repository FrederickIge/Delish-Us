import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {faUser, faGlobeAfrica} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {inject, observer} from 'mobx-react';
import Dropdown from 'rc-dropdown';
import Menu, {Item as MenuItem} from 'rc-menu';
import 'rc-dropdown/assets/index.css';

@inject('routingStore', 'sessionStore')
@observer
class Navbar extends Component {
  routingStore = this.props.routingStore;
  sessionStore = this.props.sessionStore;

  onSelect = ({key}) => {
    
    let uid = this.sessionStore.authUser.uid

    if(key == "/doglist"){
     this.routingStore.push('/doglist/' + uid)
    }
    else{
      this.routingStore.push(key);
    }
  };

  render() {
    const menu = () => (
      <Menu onSelect={this.onSelect}>
        <MenuItem key="/doglist">My Dogs</MenuItem>
        <MenuItem key="/dashboard">The Dog Shelter</MenuItem>
        <MenuItem key="/account"> My Account</MenuItem>
      </Menu>
    );

    const NavigationNonAuth = () => (
      <nav className="navbar navbar-expand-lg py-2">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <FontAwesomeIcon id = "globe" className="icon-layers fa-2x ml-auto globe" icon={faGlobeAfrica} />
          </Link>
        </div>
      </nav>
    );

    const NavigationAuth = (props) => (
      <nav className="navbar navbar-expand-lg py-2">
        <div className="container">
          <Link to="/dashboard">
            <FontAwesomeIcon className="icon-layers  fa-2x globe" icon={faGlobeAfrica} />
          </Link>

          <div>
            <Link to="/users" className="ml-auto mr-3">
              More Dogs
            </Link>
            <Link to = {"/doglist/" + this.sessionStore.authUser.uid} className="ml-auto mr-2">
              My Dogs
            </Link>
            <Dropdown trigger={['click']} overlay={menu()}>
              {props.photoURL ? (
                <img className="rounded-circle avatar-image--icon" src={props.photoURL} alt="Logo" />
              ) : (
                <FontAwesomeIcon className="avatar-image--icon" icon={faUser} />
              )}
            </Dropdown>
          </div>
        </div>
      </nav>
    );

    return (
      <div className="doggo-nav">
        {this.sessionStore.authUser ? <NavigationAuth photoURL={this.sessionStore.authUser.photoURL} /> : <NavigationNonAuth />}
      </div>
    );
  }
}
export default Navbar;
