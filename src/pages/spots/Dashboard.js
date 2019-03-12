import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {compose} from 'recompose';
import posed from 'react-pose';
import axios from 'axios';
import firebase from 'firebase';
import {Link} from 'react-router-dom';
import withAuthorization from '../../components/hoc/withAuthorization';
import { Table } from 'antd';

const db = firebase.firestore();

db.settings({
  timestampsInSnapshots: true
});

const dogRef = db.collection('dogs');

const Slide = posed.div({
  enter: {x: 0, opacity: 1},
  exit: {x: -50, opacity: 0}
});

const Fade = posed.div({
  hidden: {opacity: 0},
  visible: {opacity: 1}
});


const dataSource = [{
  key: '1',
  name: 'Mike',
  age: 32,
  address: '10 Downing Street'
}, {
  key: '2',
  name: 'John',
  age: 42,
  address: '10 Downing Street'
}];

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}];


@inject('sessionStore', 'dogStore')
@observer
class Dashboard extends Component {
  sessionStore = this.props.sessionStore;
  dogStore = this.props.dogStore;









  componentDidMount() {

  }

  render() {
    return (
      <div className="container container-dashboard ">
        <div className="spacer" />

        <div className="d-flex">

          <div className="mr-auto p-2">
            <h2>Your Spots</h2>
          </div>

          <div className="p-2">
            <button type="button" class="btn btn-success btn-lg">
              <span class="btn-inner--icon"><i class="ni ni-fat-add"></i></span>
              Add a Spot
          </button>
          </div>

        </div>

        <Table dataSource={dataSource} columns={columns} />

      </div>
    );
  }
}
const authCondition = (authUser) => !!authUser;

export default compose(withAuthorization(authCondition))(Dashboard);
