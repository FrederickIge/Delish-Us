import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import styled from "styled-components";

const Random = styled.button`
  z-index: 100;
  border-radius: 0px !important;
`;

@inject("sessionStore", "spotStore")
@observer
class RandomButton extends Component {

  spotStore = this.props.spotStore;

render() {
    return (
      <React.Fragment>
          
            <Random
            disabled={!this.spotStore.showAllSpots}
            onClick={() => this.spotStore.getRandomSpot()}
            type="button"
             className="btn btn-primary">
            Random
          </Random>
     
      </React.Fragment>
    );
  }
}

export default RandomButton;
