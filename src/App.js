import React, {Component} from 'react';
import posed, {PoseGroup} from 'react-pose';
import {Switch, Route} from 'react-router-dom';

import withAuthentication from './components/hoc/withAuthentication';
import Navbar from './components/layout/Navbar';
import { Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { ToastContainer, toast } from 'react-toastify';
import Landingpage from './pages/Landingpage';
import AccountPage from './pages/account/Account';
import Login from './pages/account/Login';
import Signup from './pages/account/Signup';
import MapDashboard from './pages/spots/MapDashboard';
import Footer from  './components/layout/Footer';
import createBrowserHistory from 'history/createBrowserHistory';
import './css/App.css';
import { syncHistoryWithStore } from 'mobx-react-router';
import stores from './stores';

const browserHistory = createBrowserHistory();

const history = syncHistoryWithStore(browserHistory, stores.routingStore);

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

      <Router history={history} onUpdate={() => window.scrollTo(0, 0)} >
      <Route
        render={({location}) => (
          <div className="main-container" >
            <Navbar />
            {/* <PoseGroup> */}
            <ToastContainer/>
                <Switch location={location}>
                  <Route exact path="/dashboard" component={MapDashboard} />
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
    </Router>
  


    );
  }
}

export default withAuthentication(App);
