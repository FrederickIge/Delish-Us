import React from 'react';
import {inject, observer} from 'mobx-react';

@inject('uiStore', 'routingStore')
@observer
class BackButton extends React.Component {

  uiStore = this.props.uiStore;
  routingStore = this.props.routingStore

  handleBack = () => {
    if (!this.routingStore.history.location.state) {
      this.routingStore.history.push('/dashboard');
    } else if (this.routingStore.history.location.state.prevPath == 'users') {
      this.routingStore.history.push('/users');
    } else if (this.routingStore.history.location.state.prevPath == 'dashboard') {
      this.uiStore.showModal();
      this.routingStore.history.goBack();
    }
  };

  render() {
    return (
      <div onClick={this.handleBack} style={{fontSize: '20px', cursor: 'pointer', color: 'black'}}>
      <i className='fa fa-arrow-left' aria-hidden='true' /> Back
    </div>
    );
  }
}
export default BackButton;
