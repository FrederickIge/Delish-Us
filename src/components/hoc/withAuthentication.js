import React from 'react';
import { firebase } from '../../firebase';

import { inject } from 'mobx-react';

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          authUser: null,
        };
      }
  
      componentDidMount() {
        const { sessionStore } = this.props;

        firebase.auth.onAuthStateChanged(authUser => {
          authUser ? sessionStore.setAuthUser(authUser) : sessionStore.setAuthUser(null);
        });
      }

    render() {
      return (
        <Component {...this.props} />
      );
    }
  }

    return inject('sessionStore')(WithAuthentication);
}

export default withAuthentication;