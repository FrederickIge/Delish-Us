import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import withAuthorization from '../../components/hoc/withAuthorization';
import Table from 'react-bootstrap/Table'
import preventDefault from "../../utils/eventListeners"
import MobileSearch from "../../components/MobileSearch"

@inject('sessionStore', 'spotStore')
@observer
class MobileSpotList extends Component {

    spotStore = this.props.spotStore;
    sessionStore = this.props.sessionStore;

    state = {
        mobileStyle: {},
        mobileSearch: {}
    }


    componentDidMount() {

    }

    selectSpot(spot) {
        this.props.spotStore.selectExistingSpot(spot);
    }

    render() {
        return (
            <React.Fragment>


{/* <div style={{ position: "absolute", borderRadius: "0px", top: 46, zIndex: 100, left:"0", right:"0" }}>
{this.spotStore.gmapsLoaded ?<div style={{position: "absolute", zIndex:500, width:"100%", left:"0",right:"0"}}>

<MobileSearch />
</div>: null}
<div style ={{backgroundColor:"white", height:"43px"}} className="d-flex align-items-center justify-content-between">

  <button
    disabled={this.spotStore.showAllSpots}
    onClick={() => this.spotStore.getRandomSpot()}
    style={{ zIndex: 100, borderRadius: "0px" }}
    type="button" className="btn btn-primary">
    Random
  </button>

  <div style={{ zIndex: 100 }} className="align-self-center">
    {this.spotStore.showAllSpots ? <span style={{ color: "rgba(0, 0, 0, 0.90)", fontSize: "18px" }}>
    <b>All Spots</b></span>
     : 
     <span style={{ color: "rgba(0, 0, 0, 0.90)", fontSize: "18px" }}>
     <b>My Spots</b>
     </span>}
  </div>

  <label style={{ zIndex: 100, marginBottom: "0px",marginRight:"5px"}} className="switch  align-self-center">
    <input name="switch  align-self-center" type="checkbox" onChange={this.handleInputChange} />
    <span className="slider"></span>
  </label>

</div>

</div> */}
            
            <div className="delishus-map-card-mobile-list spot-list d-lg-none" style={{ display: this.spotStore.mapView ? 'none' : 'block',height:"100%", width:"100%", overflow: "scroll" }}>
                <div className="container-fluid">
                    <br></br>

            
                    {!this.spotStore.showAllSpots ?
                        this.spotStore.uniqueSpotsByGooglePlaceIds.map((spot) =>
                            <div  key={spot.key} onClick={() => this.selectSpot(spot)} className="py-4 pl-4 spot-list-item border-bottom">
                                <div style={{ fontSize: "24px", color:"rgba(0, 0, 0, 0.85)"}}><b>{spot.name}</b></div>
                            </div>            
                    ): null
                    }

                    {this.spotStore.showAllSpots ?
                        this.spotStore.currentUserSpots.map((spot) =>
                            <div  key={spot.key} onClick={() => this.selectSpot(spot)} className="py-4 pl-4 spot-list-item border-bottom">
                                <div style={{ fontSize: "24px", color:"rgba(0, 0, 0, 0.85)"}}><b>{spot.name}</b> </div>
                            </div>            
                    )
                    : null}

                </div>


            </div>
            </React.Fragment>
        )
    }
}
const authCondition = (authUser) => !!authUser;

export default compose(withAuthorization(authCondition))(MobileSpotList);
