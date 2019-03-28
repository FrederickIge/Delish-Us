import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import withAuthorization from './hoc/withAuthorization';
import StarRatingComponent from 'react-star-rating-component';
import CommentModal from "./commentModal"
import styled from "styled-components";


// .detail-image{
//     border-top-left-radius: 10px;
//     border-top-right-radius: 10px;
//   }

const CardDetailsContainer = styled.div`
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    min-height: 70%;
`;

const SpotDetailsTop = styled.div`
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`;

const DetailImageWrapper = styled.div`
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`;

const SpotDetailImage = styled.img`
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    height: 25vh;
    width: 100%;
`;

const SpotName = styled.h3`
    border-top-left-radius: 10px;
    font-weight: bold;
`;

@inject('sessionStore', 'spotStore')
@observer
class SpotDetailsCard extends Component {

    spotStore = this.props.spotStore;
    sessionStore = this.props.sessionStore;

    handleSave = () => {
        this.spotStore.saveSpot();
    }

    handleDelete = () => {
        this.spotStore.deleteSpot();
    }

    truncateWithEllipses(text, max) {
        return text.substr(0, max - 1) + (text.length > max ? '&hellip;' : '');
    }

    render() {
        return (

            <React.Fragment>
                <CommentModal></CommentModal>
                {this.spotStore.selectedSpot.name ?
                    <CardDetailsContainer>

                        <SpotDetailsTop>

                            <DetailImageWrapper>
                               
                                <SpotDetailImage className="img-fluid" alt="gag" src={this.spotStore.selectedSpot.image} />
                            </DetailImageWrapper>

                            <div className="p-3">
                            
                                <SpotName>{this.spotStore.selectedSpot.name}</SpotName>
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

                                <div style={{ minHeight: "40px" }}>
                                    {
                                        this.spotStore.firstComment ?

                                            <div>"{this.spotStore.firstComment}"</div> : null
                                    }

                                </div>

                                {this.spotStore.selectedSpot.key ?
                                    <div onClick={this.spotStore.handleShow}>
                                        View All Comments ({this.spotStore.comments.length})
                                    <i className="fa fa-comment-o fa-lg" aria-hidden="true"></i>
                                    </div>
                                    : null}


                            </div>


                        </SpotDetailsTop>


                    </CardDetailsContainer>
                    :
                    <CardDetailsContainer>
                        <SpotDetailsTop>
                            <br></br>
                            {1 + 1}
                            <h3 className="row justify-content-center select-a-spot" >Select a Spot on the Map</h3>
                            <div className="spacer"></div>
                            <div className="row justify-content-center">
                                <i className="fa fa-cutlery fa-5x mx-auto" aria-hidden="true"></i>
                            </div>
                            <br></br>
                        </SpotDetailsTop>
                    </CardDetailsContainer>
                }
                <hr className="d-lg-block d-none"></hr>

                <div>
                    <div>


                        <div className="container">

                            {!this.spotStore.alreadySaved && this.spotStore.selectedSpot.name ?
                                <button type="button" className="btn btn-success mt-3 mb-3 btn-lg btn-block" onClick={this.handleSave}>
                                    <span className="btn-inner--icon"><i className="ni ni-fat-add"></i></span>
                                    Save Spot
                                    </button>
                                : null}

                            {this.spotStore.alreadySaved && this.spotStore.selectedSpot.name ?
                                <div>

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
