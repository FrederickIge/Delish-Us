import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFire,
  faDog,
  faHeart,
  faShareAlt,
  faLeaf
} from "@fortawesome/free-solid-svg-icons";
import { faReact, faCss3Alt } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { africa } from "../img/africa.png";
import { map } from "../img/map.png";
import { family } from "../img/family-eating.png";
import axios from 'axios'
import posed from 'react-pose';
import { inject, observer } from 'mobx-react';
import Headroom from 'react-headroom'

const Slide = posed.div({
  enter: { x: 0, opacity: 1 },
  exit: { x: -50, opacity: 0 }
});

let fullList = []

@inject('routingStore', 'sessionStore')
@observer
class Myresults extends Component {

  routingStore = this.props.routingStore;

  array = [
    "Vegetables",
    "Fruits",
    "Oils",
    "Spices & Seasonings",
    "All Natural Herbal Teas",
    "Nuts and Seeds"
  ];

  state = {
    foodList: [],
    category: 'All'
  };

  goToFood = (id) => {
    this.routingStore.push("/food/" + id);
  }
  onChange = (event) => {

   let filteredList = fullList.filter(food => food.category == event.target.value)
   
    this.setState({
      category: event.target.value,
      foodList: filteredList
    })

  }

  componentWillMount() {
    axios.get('list.json').then(res => {
     
       fullList = res.data
      this.setState({ foodList: res.data })
    })
  }

  render() {

    return (
      <div>
 
 <main>
  <div className="position-relative">
    {/* shape Hero */}

    {/* <img src={require("../img/map.png")} /> */}
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

                <Link
                  to="/signup"
                  className="btn btn-white btn-icon mb-3 mb-sm-0"
                >
                  <span className="btn-inner--icon">
                    <i className="ni ni-cloud-download-95" />
                  </span>
                  <span className="btn-inner--text">
                    Register Now
                  </span>
                </Link>


              </div>
            </div>
            <div className="col-md-6 order-md-2">
          <img
            src={require("../img/family-eating.png")} 
            alt="Smiley face"
            className="img-fluid floating"
          />
        </div>
          </div>
        </div>
      </div>
      {/* SVG separator */}
      
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
            className="img-fluid floating"
          />
        </div>
        <div className="col-md-6 order-md-1">
          <div className="pr-md-5">
            <div className="icon icon-lg icon-shape icon-shape-success shadow rounded-circle mb-5">
              <i className="ni ni-settings-gear-65" />
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
                      <i className="ni ni-settings-gear-65" />
                    </div>
                  </div>
                  <div>
                    <h6 className="mb-0">
                      Easy to search
                    </h6>
                  </div>
                </div>
              </li>
              <li className="py-2">
                <div className="d-flex align-items-center">
                  <div>
                    <div className="badge badge-circle badge-success mr-3">
                      <i className="ni ni-html5" />
                    </div>
                  </div>
                  <div>
                    <h6 className="mb-0">Google Maps deep Linking</h6>
                  </div>
                </div>
              </li>
              <li className="py-2">
                <div className="d-flex align-items-center">
                  <div>
                    <div className="badge badge-circle badge-success mr-3">
                      <i className="ni ni-satisfied" />
                    </div>
                  </div>
                  <div>
                    <h6 className="mb-0">
                      Easy to Share
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

export default Myresults;
