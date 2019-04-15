import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import withAuthentication from './components/hoc/withAuthentication';
import Navbar from './components/layout/Navbar';
import {Router} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import Landingpage from './pages/Landingpage';
import AccountPage from './pages/account/Account';
import Login from './pages/account/Login';
import Signup from './pages/account/Signup';
import MapDashboard from './pages/spots/MapDashboard';
import createBrowserHistory from 'history/createBrowserHistory';
import './css/App.css';
import {syncHistoryWithStore} from 'mobx-react-router';
import rootStore from './stores';
import ScrollToTop from './components/layout/ScrollToTop';
import UsersPage from './pages/users/UsersPage';
import posed, {PoseGroup} from 'react-pose';

const browserHistory = createBrowserHistory();

const history = syncHistoryWithStore(browserHistory, rootStore.routingStore);

const RoutesContainer = posed.div({
  enter: { opacity: 1, delay: 300, beforeChildren: true },
  exit: { opacity: 0, transition: {
    duration: 200
  } }
});

class App extends Component {
  render() {
    return (
      <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
        

          
        <ScrollToTop>
          <Navbar />
          <Route
            render={({location}) => (
              <div className='main-container'>
                <ToastContainer />
                <PoseGroup style = {{height: "100%"}}>
                  <RoutesContainer key={location.pathname}>

                    <Switch location={location}>
                      <Route path='/dashboard' component={MapDashboard} key='dashboard' />
                      <Route path='/users' component={UsersPage} key='users' />
                      <Route path='/account' component={AccountPage} key='account' />
                      <Route path='/login' component={Login} key='login' />
                      <Route path='/signup' component={Signup} key='signup' />
                      <Route exact path='/' component={Landingpage} key='landingPage' />
                    </Switch>

                  </RoutesContainer>
                </PoseGroup>

              </div>
            )}
          />
        </ScrollToTop>
       
      </Router>
    );
  }
}

export default withAuthentication(App);
