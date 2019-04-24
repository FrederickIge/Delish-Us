import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import styled from "styled-components";

const Random = styled.button`
  position: absolute !important;
  z-index: 500;
  border-radius: 10px;
`;

@inject("sessionStore", "spotStore")
@observer
class DesktopRandomButton extends Component {
  spotStore = this.props.spotStore;

  handleInputChange = event => {
    this.spotStore.showAllSpots = !this.spotStore.showAllSpots;
  };

render() {
    return (
      <React.Fragment>
           {this.spotStore.showAllSpots ? (
          <Random onClick={() => this.spotStore.getRandomSpot()} type="button" disabled={!this.spotStore.showAllSpots} className="btn btn-primary">
            Random
          </Random>
        ) : null}
      </React.Fragment>
    );
  }
}

export default DesktopRandomButton;
