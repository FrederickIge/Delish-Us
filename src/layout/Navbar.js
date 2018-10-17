import React from "react";
import { Link } from 'react-router-dom';
import { faUser, faSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";


const  NavigationAuth = (props) =>
   <nav className="navbar navbar-expand-lg py-2">
   <div className="container">

    <Link to="/searchschools" >
    <FontAwesomeIcon className="icon-layers text-primary fa-2x" icon={faGraduationCap}/>
    </Link> 
  
   {console.log(props)}
   <Link to="/account" className=" ml-auto">
    {props.photoURL ? <img className="rounded-circle avatar-image--icon" src = {props.photoURL} alt="Logo" />: <FontAwesomeIcon  className="avatar-image--icon" icon = {faUser} /> } 
    
     </Link>
   </div>
 </nav>


const  NavigationNonAuth = () =>
 <nav className="navbar navbar-expand-lg py-2">
        <div className="container">
          <Link to="/" className="navbar-brand">MERN Voting App</Link>
          {/* <Link to="/login" className="btn btn-primary btn">Login</Link> */}
        </div>
</nav>


const Navbar = ({ sessionStore }) =>
  <div>
    {sessionStore.authUser ? <NavigationAuth photoURL = {sessionStore.authUser.photoURL} /> : <NavigationNonAuth />}
  </div>








export default compose(
  inject('sessionStore'),
  observer
)(Navbar);