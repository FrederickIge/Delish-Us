import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import firebase from 'firebase';
import withAuthorization from '../../components/hoc/withAuthorization';

const db = firebase.firestore();

@inject('sessionStore', 'spotStore')
@observer
class SpotDetailsCard extends Component {

    spotStore = this.props.spotStore;

    render() {
        return (
            <div className="delishus-card spot-detail p-3">
                <h3>{this.spotStore.selectedSpot.name}</h3>
                <img className="img-fluid detail-image shadow" alt="gag" src={this.spotStore.selectedSpot.image} />
                <div className="spacer"></div>
                <p>{this.spotStore.selectedSpot.address}</p>
                <p> Rating: {this.spotStore.selectedSpot.rating}</p>
                <hr></hr>
            </div>

        )
    }
}
const authCondition = (authUser) => !!authUser;

export default compose(withAuthorization(authCondition))(SpotDetailsCard);
