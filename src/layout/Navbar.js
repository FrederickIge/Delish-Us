import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {faUser, faGlobeAfrica} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {inject, observer} from 'mobx-react';
import Dropdown from 'rc-dropdown';
import Menu, {Item as MenuItem} from 'rc-menu';
import 'rc-dropdown/assets/index.css';
import Headroom from 'react-headroom'

@inject('routingStore', 'sessionStore', 'spotStore')
@observer
class Navbar extends Component {

  routingStore = this.props.routingStore;
  sessionStore = this.props.sessionStore;
  spotStore = this.props.spotStore;

  onSelect = ({key}) => {
    let uid = this.sessionStore.authUser.uid
    if(key == "/doglist"){
     this.routingStore.push('/doglist/' + uid)
    }
    else{
      this.routingStore.push(key);
    }
  };

  componentDidMount(){
    console.log(this.spotStore)
  }

  render() {
    const menu = () => (
      <Menu onSelect={this.onSelect}>
        <MenuItem key="/doglist">My Dogs</MenuItem>
        <MenuItem key="/dashboard">The Dog Shelter</MenuItem>
        <MenuItem key="/account"> My Account</MenuItem>
      </Menu>
    );

    const newmenu = ( ) => (

      <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <a className="dropdown-item">Action</a>
        <a className="dropdown-item" >Another action</a>
        <a className="dropdown-item" >Something else here</a>
      </div>
    )

    const NavigationNonAuth = () => (
      <nav className="navbar navbar-expand-lg py-3">
        <div className="container">

        <Link style={{ textDecoration: 'none' }} to="/dashboard">
            {/* <FontAwesomeIcon className="icon-layers  fa-2x globe" icon={faGlobeAfrica} /> */}
          <b>DELISH-US</b>  
          </Link>

          <div>

          <Link style={{ textDecoration: 'none' }} to = "/login" className="ml-auto mr-3 nav-text-style">   
                <b>LOGIN</b>     
          </Link>

          </div>
        </div>
      </nav>
    );

    const NavigationAuth = (props) => (
      <nav className="navbar navbar-expand-lg py-3">
        <div className="container">
        
          <Link style={{ textDecoration: 'none' }} to="/dashboard">
            <img style={{ height: '25px', paddingBottom:"3px" }} className="img-fluid" src={require("../img/compass.png")} alt="Logo" />
            <b style={{  marginLeft:"10px" }}>DELISH-US</b>  
          </Link>

          <div>

            {/* <Link style={{ textDecoration: 'none' }} to="/users" className="ml-auto mr-3 nav-text-style">
              <b>MY SPOTS</b>
            </Link> */}

            <span style={{ textDecoration: 'none' }} onClick = { this.spotStore.toggleView } className="ml-auto mr-3 nav-text-style">
              <b>MAP</b>  
            </span>

            <span style={{ textDecoration: 'none' }} onClick = { this.spotStore.toggleView }  className="ml-auto mr-3 nav-text-style">
              <b>Map View</b>  
            </span>

            <Dropdown trigger={['click']} overlay={ menu() }>
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
      <Headroom>
        <div className="doggo-nav">
          {this.sessionStore.authUser ? <NavigationAuth photoURL={this.sessionStore.authUser.photoURL} /> : <NavigationNonAuth />}
        </div>
      </Headroom>
    );
  }
}
export default Navbar;
