import React, { Component } from 'react';
import "./css/App.css";
import { Switch, Route } from "react-router-dom";
import "./css/App.css";

import Landingpage from "./pages/Landingpage";

import posed, { PoseGroup } from 'react-pose';
import withAuthentication from './components/hoc/withAuthentication';

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
    console.log(this.props)
    return (
      <Route render={({ location }) => (

        <div>
      
        <PoseGroup>
          <RoutesContainer key={location.pathname} >
            <Switch location={location}   >

              <Route path="/" component={Landingpage} />
              
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
