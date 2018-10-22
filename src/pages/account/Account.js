import React from 'react';
import Passwordchange from "./Passwordchange";
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import withAuthorization from '../../components/hoc/withAuthorization';

const AccountPage = ({ sessionStore }) => (
  <div>
    
    <Passwordchange />
  </div>
)

  
const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  inject('sessionStore'),
  observer
)(AccountPage);