import React, {Component} from "react";
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";
import AvatarMenu from "./avatar-menu";
import styled from 'styled-components';

const Nav = styled.div`
  z-index: 5000;
`;

const AvatarImg = styled.img`
height: 25px !important;
padding-bottom: 3px !important;
`;

const ViewSwitcher = styled.span`
textDecoration: none;
color: #1890ff;
`;

@inject("routingStore", "sessionStore", "spotStore")
@observer
class Navbar extends Component {

  routingStore = this.props.routingStore;
  sessionStore = this.props.sessionStore;
  spotStore = this.props.spotStore;

  render() {
   
    const NavigationNonAuth = () => (
      <nav className="navbar navbar-expand-lg py-2">

        <div className="container">

          <Link style={{textDecoration: "none"}} to="/dashboard">
            <AvatarImg className="img-fluid" src={require("../../img/compass.png")}  alt="Logo"/>
            <b className="ml-3">DELISH-US</b>
          </Link>

            <Link style={{textDecoration: "none"}} to="/login" className="ml-auto mr-3 nav-text-style" >
              <b>LOGIN</b>
            </Link>

        </div>

      </nav>
    );

    const NavigationAuth = props => (
      <nav className="navbar navbar-expand-lg py-2">
        <div className="container">

          <Link style={{textDecoration: "none"}} to="/dashboard">
            <AvatarImg className="img-fluid" src={require("../../img/compass.png")} alt="Logo"/>
            <b className="ml-3">DELISH-US</b>
          </Link>

            <ViewSwitcher onClick={this.spotStore.toggleView} className="ml-auto mr-3 nav-text-style">
              {props.mapView ? <b>LIST VIEW</b> : <b>MAP VIEW</b>}
            </ViewSwitcher>

            <AvatarMenu />
         
        </div>
      </nav>
    );

    return (
      <Nav id="app-navbar" className="doggo-nav">
        {this.sessionStore.authUser ? 
          <NavigationAuth mapView={this.spotStore.mapView} photoURL={this.sessionStore.authUser.photoURL} /> : <NavigationNonAuth />
        }
      </Nav>
    );
  }
}
export default Navbar;
