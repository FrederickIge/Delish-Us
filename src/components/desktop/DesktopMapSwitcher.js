import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('sessionStore', 'spotStore')
@observer
class DesktopMapSwitcher extends Component {

    spotStore = this.props.spotStore;

    handleInputChange = (event) => {
        this.spotStore.showAllSpots = !this.spotStore.showAllSpots;
      }

    render(){
        return(
            <label style={{ marginBottom: "0rem", marginLeft: "10px" }} className="switch  align-self-center">
            <input name="switch  align-self-center" type="checkbox" onChange={this.handleInputChange} />
            <span className="slider"></span>
          </label>
        )
    }

}


export default DesktopMapSwitcher;
