import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('sessionStore', 'spotStore')
@observer
class MobileMapSwitcher extends Component {

    spotStore = this.props.spotStore;

    handleInputChange = (event) => {
        this.spotStore.showAllSpots = !this.spotStore.showAllSpots;
      }

    render(){
        return(
            <label style={{ zIndex: 100, marginBottom: "0px",marginRight:"5px"}} className="switch  align-self-center">
            <input name="switch  align-self-center" type="checkbox" onChange={this.handleInputChange} />
            <span className="slider"></span>
          </label>
        )
    }

}


export default MobileMapSwitcher;
