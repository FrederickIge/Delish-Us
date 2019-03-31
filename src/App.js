import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import withAuthentication from './components/hoc/withAuthentication';
import Navbar from './components/layout/Navbar';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Landingpage from './pages/Landingpage';
import AccountPage from './pages/account/Account';
import Login from './pages/account/Login';
import Signup from './pages/account/Signup';
import MapDashboard from './pages/spots/MapDashboard';
import createBrowserHistory from 'history/createBrowserHistory';
import './css/App.css';
import { syncHistoryWithStore } from 'mobx-react-router';
import rootStore from './stores';
import ScrollToTop from './components/layout/ScrollToTop'
import UsersPage from './pages/users/UsersPage'

const browserHistory = createBrowserHistory();

const history = syncHistoryWithStore(browserHistory, rootStore.routingStore);



class App extends Component {
  render() {
    return (
   
      <Router history={history} onUpdate={() => window.scrollTo(0, 0)} >
        <ScrollToTop>
      <Route render={({location}) => (

          <div className="main-container">
            <Navbar />         
            <ToastContainer/>
                <Switch location={location}>
                  <Route exact path="/dashboard" component={MapDashboard} />
                  <Route exact path="/users" component={UsersPage} />
                  <Route exact path="/account" component={AccountPage} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/signup" component={Signup} />
                  <Route path="/" component={Landingpage} />
                </Switch>
           
          </div>
        )}
      />
      </ScrollToTop>
    </Router>
 


    );
  }
}

export default withAuthentication(App);
