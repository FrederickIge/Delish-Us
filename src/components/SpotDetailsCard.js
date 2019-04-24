import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {compose} from 'recompose';
import withAuthorization from './hoc/withAuthorization';
import StarRatingComponent from 'react-star-rating-component';
import CommentModal from './commentModal';
import styled from 'styled-components';
import Spacer from '../components/layout/Spacer';
import SaveSpotButton from '../components/SaveSpotButton';
import DeleteSpotButton from '../components/DeleteSpotButton';
import posed, { PoseGroup } from 'react-pose';
import ProgressiveImage  from "react-progressive-image"
import Img from 'react-image'
import CircularProgress from '@material-ui/core/CircularProgress';

const Fade = posed.div({
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
});

const Loader = () =>{
return(

<CircularProgress style={{}} className="mx-auto align-self-center"></CircularProgress>

)


} 

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
  min-height: 25vh;
  display: flex;
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

const SpotAddress = styled.a``;

const Animate = posed.div({
  enter: {
    y: 0,
    opacity: 1,
    delay: 300,
    transition: {
      y: { type: 'spring', stiffness: 1000, damping: 15 },
      default: { duration: 300 }
    }
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: { duration: 150 }
  }
});


@inject('sessionStore', 'spotStore', 'uiStore', 'commentStore')
@observer
class SpotDetailsCard extends Component {
  spotStore = this.props.spotStore;
  sessionStore = this.props.sessionStore;
  uiStore = this.props.uiStore;
  commentStore = this.props.commentStore;

  handleDelete = () => {
    this.spotStore.deleteSpot();
  };

  truncateWithEllipses(text, max) {
    return text.substr(0, max - 1) + (text.length > max ? '&hellip;' : '');
  }

  render() {
    return (
      <React.Fragment>
        <CommentModal />
        {this.spotStore.selectedSpot.name ? (
          <CardDetailsContainer>
            <SpotDetailsTop>
              <DetailImageWrapper>

 <Img
  style={{ maxHeight: '25vh', width: '100%', borderTopLeftRadius:"18px",borderTopRightRadius:"18px"}} 
  src={[this.spotStore.selectedSpot.image, require("../img/noImage.jpg") ] } loader={<Loader />}/> 

              </DetailImageWrapper>

              <div className='p-3'>
                <SpotName>{this.spotStore.selectedSpot.name}</SpotName>
                <SpotAddress
                  target='_blank'
                  href={
                    'https://www.google.com/maps/search/?api=1&query=' +
                    encodeURI(this.spotStore.selectedSpot.address) +
                    '&query_place_id=' +
                    this.spotStore.selectedSpot.googlePlaceId
                  }
                >
                  {this.spotStore.selectedSpot.address}
                </SpotAddress>
                {/* <a href={"https://www.google.com/maps/search/?api=1&query=" + encodeURI(this.spotStore.selectedSpot.address ) + "&query_place_id=" + this.spotStore.selectedSpot.googlePlaceId }>Open Google Maps</a> */}

                <div className='d-flex align-items-center' style={{height: '70px'}}>
                  <div style={{marginRight: '10px'}}> Rating: {this.spotStore.selectedSpot.rating}</div>
                  <StarRatingComponent
                    name='rate2'
                    renderStarIcon={() => (
                      <span>
                        <i className='fa fa-star' aria-hidden='true' />
                      </span>
                    )}
                    starCount={5}
                    value={this.spotStore.selectedSpot.rating}
                  />
                </div>

                {this.commentStore.comments.length > 0 || this.spotStore.likedBy.length > 0  ? (
                  <div onClick={this.uiStore.showModal}>
                    <span style={{marginTop: '20px', display: 'inlineBlock', cursor: 'pointer', textDecoration: 'underline'}}>View Comments</span>
                    <i style={{marginLeft: '5px', lineHeight: '1.4'}} className='fa fa-comment-o fa-sm' aria-hidden='true' /> (
                    {this.commentStore.comments.length})
                    <i style={{marginLeft: '5px', lineHeight: '1.4'}} className='fa fa-user fa-sm' aria-hidden='true' /> (
                    {this.spotStore.likedBy.length})
                  </div>
                ) : null}
              </div>
            </SpotDetailsTop>
          </CardDetailsContainer>
        ) : (
          <CardDetailsContainer>
            <SpotDetailsTop>
              <br />
              <PoseGroup>
                <Animate key='modal'>
                  <h4 className='row justify-content-center select-a-spot'>Select a Spot on the Map</h4>
                </Animate>
              </PoseGroup>
              <Spacer />
              <div className='row justify-content-center'>
                <i className='fa fa-cutlery fa-5x mx-auto' aria-hidden='true' />
              </div>
              <br />
            </SpotDetailsTop>
          </CardDetailsContainer>
        )}
        <hr className='d-lg-block d-none' />

        <div className='container'>
          <SaveSpotButton />
          <DeleteSpotButton />
        </div>
      </React.Fragment>
    );
  }
}
const authCondition = authUser => !!authUser;

export default compose(withAuthorization(authCondition))(SpotDetailsCard);
