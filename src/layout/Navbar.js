import React from "react";
import { Link, NavLink } from 'react-router-dom';
import { faUser, faSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem, Divider } from 'rc-menu';
import 'rc-dropdown/assets/index.css';

 const onSelect = ({ key }) => {
  console.log(`${key} selected`);
  console.log(this)
}

function onVisibleChange(visible) {
  console.log(visible);
}

const menu = () => 
  <Menu onSelect={onSelect}>
    <MenuItem key="/doglist">My Dogs</MenuItem>
    <MenuItem key="/dashboard">The Dog Shelter</MenuItem>
    <MenuItem key="/account"> My Account</MenuItem>
  </Menu>


const NavigationAuth = (props) =>
  <nav className="navbar navbar-expand-lg py-2">

    <div className="container">

      <Link to="/dashboard" >
        <FontAwesomeIcon className="icon-layers text-primary fa-2x" icon={faGraduationCap} />
      </Link>

      <Dropdown
        trigger={['click']}
        overlay={menu()}
        onVisibleChange={onVisibleChange}
      >
        {props.photoURL ? <img className="rounded-circle avatar-image--icon" src={props.photoURL} alt="Logo" /> : <FontAwesomeIcon className="avatar-image--icon" icon={faUser} />}
      </Dropdown>

    </div>

  </nav>


const NavigationNonAuth = () =>
  <nav className="navbar navbar-expand-lg py-2">
    <div className="container">
      <Link to="/" className="navbar-brand">MERN Voting App</Link>
    </div>
  </nav>


const Navbar = ({ sessionStore, routingStore }) =>
  <div className="doggo-nav">
    {sessionStore.authUser ? <NavigationAuth photoURL={sessionStore.authUser.photoURL} /> : <NavigationNonAuth />}
  </div>




export default compose(
  inject('sessionStore','routingStore'),
  observer
)(Navbar,menu);