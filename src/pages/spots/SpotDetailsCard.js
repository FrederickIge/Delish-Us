import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import withAuthorization from '../../components/hoc/withAuthorization';
import { If, Then} from 'react-if'
import StarRatings from 'react-star-ratings';
import StarRatingComponent from 'react-star-rating-component';

@inject('sessionStore', 'spotStore')
@observer
class SpotDetailsCard extends Component {

    spotStore = this.props.spotStore;
    sessionStore = this.props.sessionStore;

    style = {
        minHeight: "70%"
    }

    handleSave = ( ) => {
        this.spotStore.saveSpot();
    }

    handleDelete = () =>{
        this.spotStore.deleteSpot();
    }

    render() {
        return (

            <React.Fragment>
                {this.spotStore.selectedSpot.name ?
                    <div style={this.style}>

                        <div className="spot-details-top">

                            <div style={{minHeight:"50%"}}>
                                <img style={{height:"30vh", width:"100%"}} className="img-fluid detail-image" alt="gag" src={this.spotStore.selectedSpot.image} />                         
                            </div>

                            <div className="p-3">
                                <h3>{this.spotStore.selectedSpot.name}</h3>
                                <div>{this.spotStore.selectedSpot.address}</div>

                                <div className="d-flex align-items-center">
                                    <div> Rating: {this.spotStore.selectedSpot.rating}</div>

                                    <StarRatingComponent
                                        name="rate2"
                                        renderStarIcon={() => <span><i className="fa fa-star" aria-hidden="true"></i></span>}
                                        starCount={5}
                                        value={this.spotStore.selectedSpot.rating}
                                    />
                                </div>

                               <div>
                               Liked By:
                               </div> 

                            </div>


                        </div>
                      

                    </div>
                    :
                    <div style={this.style}>
                        <div style={this.style} className="spot-details-top">
                        <br></br>
                            <h3 className="row justify-content-center">Select a Spot on the Map</h3>
                            <div className="spacer"></div>
                            <div className="row justify-content-center">
                                <i className="fa fa-cutlery fa-5x mx-auto" aria-hidden="true"></i>
                            </div>
                        </div>                
                    </div>
                }
                  <hr className="d-lg-block d-none"></hr>

                <div>
                    <div>
                
                    {/* <br className="d-lg-block d-none"></br>
                
                    <br className="d-lg-block d-none"></br> */}
                        <div className="container">

                            {!this.spotStore.alreadySaved && this.spotStore.selectedSpot.name ?
                                <button type="button" className="btn btn-success mt-3 mb-3 btn-lg btn-block" onClick={this.handleSave}>
                                    <span className="btn-inner--icon"><i className="ni ni-fat-add"></i></span>
                                    Save Spot
                                    </button>
                                : null}

                            {this.spotStore.alreadySaved && this.spotStore.selectedSpot.name ?
                                <div>
                                    <button type="button" className="btn btn-primary mt-3 mb-3 btn-lg btn-block" onClick={this.handleDelete}>
                                        <span className="btn-inner--icon"><i className="ni ni-fat-add"></i></span>
                                        Add Comment
                                                                </button>
                                    <button type="button" className="btn btn-danger mt-3 mb-3 btn-lg btn-block" onClick={this.handleDelete}>
                                        <span className="btn-inner--icon"><i className="ni ni-fat-add"></i></span>
                                        Delete Spot
                                    </button>
                                </div>


                                : null}


                        </div>
                    
                    </div>
                </div>


                </React.Fragment>

        )
    }
}
const authCondition = (authUser) => !!authUser;

export default compose(withAuthorization(authCondition))(SpotDetailsCard);
