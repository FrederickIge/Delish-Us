import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';


@inject('sessionStore', 'spotStore')
@observer
class SaveSpotButton extends Component {
  spotStore = this.props.spotStore;

  handleSave = () => {
    this.spotStore.saveSpot();
  };

  render() {
    return (
      <React.Fragment>
        {!this.spotStore.alreadySaved && this.spotStore.selectedSpot.name ? (
          <button type='button' className='btn btn-success mt-3 mb-3 btn-lg btn-block' onClick={this.handleSave}>
            <span className='btn-inner--icon'>
              <i className='ni ni-fat-add' />
            </span>
            Save Spot
          </button>
        ) : null}
      </React.Fragment>
    );
  }
}

export default SaveSpotButton;
