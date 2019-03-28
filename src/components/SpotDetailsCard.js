import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import withAuthorization from './hoc/withAuthorization';
import StarRatingComponent from 'react-star-rating-component';
import CommentModal from "./commentModal"
import styled from "styled-components";
import Spacer from "../components/layout/Spacer";
import SaveSpotButton from "../components/SaveSpotButton";
import DeleteSpotButton from "../components/DeleteSpotButton";

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
    max-height: 25vh;
    width: 100%;
`;

const SpotName = styled.h3`
    border-top-left-radius: 10px;
    font-weight: bold;
`;

const SpotAddress = styled.div``;

const FirstComment = styled.div`
min-height: 5vh`;

@inject('sessionStore', 'spotStore')
@observer
class SpotDetailsCard extends Component {

    spotStore = this.props.spotStore;
    sessionStore = this.props.sessionStore;



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
                                <SpotAddress>{this.spotStore.selectedSpot.address}</SpotAddress>

                                <div className="d-flex align-items-center">
                                    <div> Rating: {this.spotStore.selectedSpot.rating}</div>
                                    <StarRatingComponent
                                        name="rate2"
                                        renderStarIcon={() => <span><i className="fa fa-star" aria-hidden="true"></i></span>}
                                        starCount={5}
                                        value={this.spotStore.selectedSpot.rating}
                                    />
                                </div>

                               {this.spotStore.firstComment ? <FirstComment>{this.spotStore.firstComment}</FirstComment> : null} 
                               

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
                            <h3 className="row justify-content-center select-a-spot" >Select a Spot on the Map</h3>
                            <Spacer/>
                            <div className="row justify-content-center">
                                <i className="fa fa-cutlery fa-5x mx-auto" aria-hidden="true"></i>
                            </div>
                            <br></br>
                        </SpotDetailsTop>
                    </CardDetailsContainer>
                }
                <hr className="d-lg-block d-none"></hr>

                
                   


                        <div className="container">

                            <SaveSpotButton/>

                            <DeleteSpotButton/>


                        </div>

                   
                


            </React.Fragment>

        )
    }
}
const authCondition = (authUser) => !!authUser;

export default compose(withAuthorization(authCondition))(SpotDetailsCard);
