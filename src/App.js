import React, {Component} from 'react';
import posed, {PoseGroup} from 'react-pose';
import {Switch, Route} from 'react-router-dom';

import withAuthentication from './components/hoc/withAuthentication';
import Navbar from './layout/Navbar';
import { inject, observer } from 'mobx-react';
import { ToastContainer, toast } from 'react-toastify';
import Landingpage from './pages/Landingpage';
import AccountPage from './pages/account/Account';
import Login from './pages/account/Login';
import Signup from './pages/account/Signup';
import Dashboard from './pages/spots/Dashboard';
import MapDashboard from './pages/spots/MapDashboard';
import Footer from  './layout/Footer';
import FoodDetail from './pages/spots/FoodDetail'
import { withRouter } from "react-router";
import './css/App.css';

const RoutesContainer = posed.div({
  enter: {
    opacity: 1,
    delay: 300,
    beforeChildren: true
  },
  exit: {opacity: 0}
});

class App extends Component {
  render() {
    return (
      <Route
        render={({location}) => (
          <div className="main-container" >
            <Navbar />
            {/* <PoseGroup> */}
            <ToastContainer/>
                <Switch location={location}>
                  <Route exact path="/dashboard" component={MapDashboard} />
                  <Route exact path="/doglist" component={MapDashboard} />
                  <Route exact path="/food/:id" component={FoodDetail} />
                  <Route exact path="/account" component={AccountPage} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/signup" component={Signup} />
                  <Route path="/" component={Landingpage} />
                </Switch>
            {/* </PoseGroup> */}
            {/* <Footer /> */}
          </div>
        )}
      />
    );
  }
}

export default withAuthentication(App);
