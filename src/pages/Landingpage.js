import React, { Component } from "react";
import { Link } from "react-router-dom";
import posed from 'react-pose';
import { inject, observer } from 'mobx-react';

const Slide = posed.div({
  enter: { x: 0, opacity: 1 },
  exit: { x: -50, opacity: 0 }
});


@inject('routingStore', 'sessionStore')
@observer
class Landingpage extends Component {

  routingStore = this.props.routingStore;
  sessionStore = this.props.sessionStore;

  render() {

    return (
      <div>
 
 <main>
  <div className="position-relative">

    <section className="section section-lg section-shaped pb-250">
      <div className="shape shape-style-1 shape-default">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="container py-lg-md d-flex">
        <div className="col px-0">
          <div className="row">
            <div className="col-lg-6">
              <h1 className="display-3  text-black">
                Share the places you love 
                <span>with the people you love</span>
              </h1>
              <p className="lead  text-black">
                Life is better when we eat together. DelishUs let's you keep track and share your favorite resturants with friends and family. 
              </p>
              <div className="btn-wrapper">

        {this.sessionStore.authUser?
        
        <Link
        to="/dashboard"
        className="btn btn-white btn-icon mb-3 mb-sm-0"
      >
        <span className="btn-inner--text">
          Dashboard
        </span>
      </Link>
        
        :
        
        <Link
        to="/signup"
        className="btn btn-white btn-icon mb-3 mb-sm-0"
      >
        <span className="btn-inner--text">
          Register Now
        </span>
      </Link>
        }




              </div>
            </div>
            <div className="col-md-6 order-md-2">
          <img
            src={require("../img/family-eating.png")} 
            alt="Smiley face"
            className="img-fluid floating  mx-auto d-block"
          />
        </div>
          </div>
        </div>
      </div>
      
      <div className="separator separator-bottom separator-skew">
        <svg
          x={0}
          y={0}
          viewBox="0 0 2560 100"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            className="fill-white"
            points="2560 0 2560 100 0 100"
          />
        </svg>
      </div>

    </section>
    {/* 1st Hero Variation */}
  </div>

  <section className="section section-lg white-bg">
    <div className="container">
      <div className="row row-grid align-items-center">
        <div className="col-md-4 order-md-2">
          <img
            src={require("../img/map.png")} 
            alt="Smiley face"
            className="img-fluid floating mx-auto d-block"
          />
        </div>
        <div className="col-md-6 order-md-1">
          <div className="pr-md-5">
            <div className="icon icon-lg icon-shape icon-shape-success shadow rounded-circle mb-5">
              <i className="ni ni-map-big" />
            </div>
            <h3>Google Maps Integration</h3>
            <p>
              Using the Google Maps API, DelishUs creates easy to use maps of all your favorite places, as well as the places of friends and family
            </p>
            <ul className="list-unstyled mt-5">
              <li className="py-2">
                <div className="d-flex align-items-center">
                  <div>
                    <div className="badge badge-circle badge-success mr-3">
                      <i className="ni ni-world-2" /> 
                    </div>
                  </div>
                  <div>
                    <h6 className="mb-0">
                      Search for Spots on the world map!
                    </h6>
                  </div>
                </div>
              </li>
              <li className="py-2">
                <div className="d-flex align-items-center">
                  <div>
                    <div className="badge badge-circle badge-success mr-3">
                      <i className="ni ni-favourite-28" />
                    </div>
                  </div>
                  <div>
                    <h6 className="mb-0">Save and share your favorite Spots!</h6>
                  </div>
                </div>
              </li>
              <li className="py-2">
                <div className="d-flex align-items-center">
                  <div>
                    <div className="badge badge-circle badge-success mr-3">
                      <i className="ni ni-pin-3" />
                    </div>
                  </div>
                  <div>
                    <h6 className="mb-0">
                      Check out a new Spot with the Random feature!
                    </h6>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>
      </div>
    );
  }
}

export default Landingpage;
