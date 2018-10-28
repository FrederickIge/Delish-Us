import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {compose} from 'recompose';
import posed from 'react-pose';
import firebase from 'firebase';

import withAuthorization from '../../components/hoc/withAuthorization';

const db = firebase.firestore();

db.settings({
  timestampsInSnapshots: true
});

const Slide = posed.div({
  enter: {x: 0, opacity: 1},
  exit: {x: -50, opacity: 0}
});

const Users = ({users,goToUsersDogs}) => {
  return (
    <div>
      {users.map((user) => (
        <div key={user.key} onClick={() => goToUsersDogs(user.uid) } className="col-md-4 hvr-grow">
          <div className="card shadow-lg mb-3 quote-card ">
            <div className="card-body text-dark">
              <h5 className="card-title">{user.displayName}</h5>
                <p>{user.email}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

@inject('routingStore','sessionStore')
@observer
class UsersList extends Component {

  sessionStore = this.props.sessionStore;
  routingStore = this.props.routingStore;

  userId = null

  state = {
    users: []
  };

  getUsersList = (event) => {
    const users = [];
    db.collection('users')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const {displayName, email, uid} = doc.data();

          users.push({
            key: doc.id,
            displayName,
            email,
            uid
          });
        });
        this.setState({users: users});
      })
      .catch(function(error) {
        console.log('Error getting documents: ', error);
      });
  };

  goToUsersDogs = (id) => {
    this.routingStore.push("/doglist/" + id );
  }

  componentDidMount() {
    this.getUsersList();
  }

  render() {
    return (
      <Slide>
        <div className="container container-dashboard ">
          <div className="spacer" />
          <div className="search-container">
            <h2 className="text-center dashboard-header">Users</h2>
            <h3 className="text-center dashboard-header">Check out other users Doggies!</h3>
            <div className="spacer" />

            <Users users = {this.state.users} goToUsersDogs={this.goToUsersDogs} />
          </div>
        </div>
      </Slide>
    );
  }
}
const authCondition = (authUser) => !!authUser;

export default compose(withAuthorization(authCondition))(UsersList);
