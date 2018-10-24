import React, { Component } from 'react';
import "./css/App.css";

import "./css/App.css";
import Navbar from "./layout/Navbar";

import Landingpage from "./pages/Landingpage";

import posed, { PoseGroup } from 'react-pose';
import withAuthentication from './components/hoc/withAuthentication';


import AccountPage from "./pages/account/Account"
import Passwordforget from "./pages/account/Passwordforget"
import Passwordchange from "./pages/account/Passwordchange"
import Login from "./pages/account/Login";
import Signup from "./pages/account/Signup";

import Dashboard from "./pages/dogs/Dashboard";
import DogList from './pages/dogs/DogList';

import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { Switch, Route } from "react-router-dom";

const RoutesContainer = posed.div({
  enter: {
    opacity: 1,
    delay: 300,
    beforeChildren: true
  },
  exit: { opacity: 0 }
});

class App extends Component {
  render() {
  
    return (
      <Route render={({ location }) => (

        <div>
          <Navbar />
          <PoseGroup>
            <RoutesContainer key={location.pathname} >
              <Switch location={location}   >

              
                <Route exact path="/login" component = {Login} />
                <Route exact path="/signup" component = {Signup} />
                <Route exact path="/account" component = {AccountPage} />
                <Route exact path="/dashboard" component = {Dashboard} />
                <Route exact path="/doglist" component = {DogList} />
                <Route path="/" component = {Landingpage} />

              </Switch>
            </RoutesContainer>
          </PoseGroup>
        </div>

      )}>

      </Route>
    );
  }
}

export default withAuthentication(App);
