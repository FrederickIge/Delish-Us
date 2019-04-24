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
import GoogleMapsLoader from 'google-maps';
import PropTypes from "prop-types";
import ReactJoyride, { EVENTS } from "react-joyride";
import { inject, observer } from 'mobx-react';

GoogleMapsLoader.KEY = 'AIzaSyAJdMUyuQiG2DEHgGG3Tvebb9-BzR0JXwE';
GoogleMapsLoader.LIBRARIES = [ 'places'];

const browserHistory = createBrowserHistory();

const history = syncHistoryWithStore(browserHistory, rootStore.routingStore);

const RoutesContainer = posed.div({
  enter: { opacity: 1, delay: 300, beforeChildren: true },
  exit: { opacity: 0, transition: {
    duration: 200
  } }
});

var tourSteps 


@inject( 'uiStore')
@observer
class App extends Component {

  uiStore = this.props.uiStore;

  handleJoyrideCallback = data => {
    const {joyride} = this.props;
    const {type} = data;

    if (type === EVENTS.TOUR_END && this.uiStore.runTour) {
      // Need to set our running state to false, so we can restart if we click start again.
      this.uiStore.runTour = false
    }

    if (typeof joyride.callback === 'function') {
      joyride.callback(data);
    } else {
      console.group(type);
      console.log(data); //eslint-disable-line no-console
      console.groupEnd();
    }
  };

  static propTypes = {
    joyride: PropTypes.shape({
      callback: PropTypes.func
    })
  };

  static defaultProps = {
    joyride: {}
  };

  componentDidMount() {
    GoogleMapsLoader.load(function(google) {});

    if(window.innerWidth <= 992 ){
      
      this.uiStore.tourSteps = this.uiStore.mobileTourSteps
    }else{
      this.uiStore.tourSteps = this.uiStore.DesktopTourSteps
    }
  }

  render() {
    return (
      <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
        <ScrollToTop>
          <Navbar />
          <ReactJoyride
                debug ={true}
          continuous
          scrollToFirstStep
          showProgress
          showSkipButton
          run={this.uiStore.runTour}
          steps={this.uiStore.tourSteps}
          callback={this.handleJoyrideCallback}
        />
          <Route
            render={({location}) => (
              <div id='main-container' className='main-container-full'>
                <ToastContainer />


                <PoseGroup style={{height: '100%'}}>
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
