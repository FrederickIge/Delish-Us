import React from 'react';
import { withRouter } from 'react-router-dom';


import { firebase } from '../../firebase';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';


const withAuthorization = (authCondition) => (Component) => {
  class WithAuthorization extends React.Component {
    
    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        if (!authCondition(authUser)) {
          this.props.history.push("/");
        }
      });
    }

    render() {
      return (
        this.props.sessionStore.authUser ? <Component {...this.props} /> : null
        )
    }
  }

  return compose(
    withRouter,
    inject('sessionStore'),
    observer
  )(WithAuthorization);
}

export default withAuthorization;