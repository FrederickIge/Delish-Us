import React from "react";
import { Link } from 'react-router-dom';
import { faUser, faSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem, Divider } from 'rc-menu';
import 'rc-dropdown/assets/index.css';

function onSelect({ key }) {
  console.log(`${key} selected`);
}

function onVisibleChange(visible) {
  console.log(visible);
}

const menu = (
  <Menu onSelect={onSelect}>
    <MenuItem > <Link to="/doglist" className=" ml-auto">My Dogs</Link></MenuItem>
    <MenuItem > <Link to="/dashboard" className=" ml-auto">The Dog Shelter</Link></MenuItem>
    <MenuItem > <Link to="/account" className=" ml-auto">My Account</Link></MenuItem>
  </Menu>
);

const NavigationAuth = (props) =>
  <nav className="navbar navbar-expand-lg py-2">

    <div className="container">

      <Link to="/dashboard" >
        <FontAwesomeIcon className="icon-layers text-primary fa-2x" icon={faGraduationCap} />
      </Link>

      {/* <Link to="/account" className=" ml-auto">

        {props.photoURL ? <img className="rounded-circle avatar-image--icon" src={props.photoURL} alt="Logo" /> : <FontAwesomeIcon className="avatar-image--icon" icon={faUser} />}
        
      </Link> */}

   
        
      <Dropdown
        trigger={['click']}
        overlay={menu}
       
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


const Navbar = ({ sessionStore }) =>
  <div className="doggo-nav">
    {sessionStore.authUser ? <NavigationAuth photoURL={sessionStore.authUser.photoURL} /> : <NavigationNonAuth />}
  </div>




export default compose(
  inject('sessionStore'),
  observer
)(Navbar);