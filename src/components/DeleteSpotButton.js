import React, {Component} from 'react';
import styled from 'styled-components';
import {inject, observer} from 'mobx-react';
const Space = styled.div`
  height: 20px;
`;

@inject('sessionStore', 'spotStore')
@observer
class DeleteSpotButton extends Component {
  spotStore = this.props.spotStore;

  handleDelete = () => {
    this.spotStore.deleteSpot();
  };

  render() {
    return (
      <React.Fragment>
        {this.spotStore.alreadySaved && this.spotStore.selectedSpot.name ? (
          <div>
            <button type='button' className='btn btn-danger mt-3 mb-3 btn-lg btn-block' onClick={this.handleDelete}>
              <span className='btn-inner--icon'>
                <i className='ni ni-fat-add' />
              </span>
              Delete Spot
            </button>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

export default DeleteSpotButton;
