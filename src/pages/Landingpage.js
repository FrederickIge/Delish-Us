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
import axios from 'axios'
import posed from 'react-pose';
import {inject, observer} from 'mobx-react';

const Slide = posed.div({
  enter: {x: 0, opacity: 1},
  exit: {x: -50, opacity: 0}
});

@inject('routingStore','sessionStore')
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
    foodList: []
  };

  goToFood = (id) =>{
    this.routingStore.push("/food/" + id);
  }

  componentWillMount() {
    axios.get('list.json').then(res => {
      console.log(res.data)
      this.setState({ foodList: res.data })
    })
  }

  render() {

    return (
      <div>
        {/* <HeroSection list = {this.state.foodList} /> */}


        <header className="masthead text-white text-center">
          <div className="overlay" />
          <div className="container">

            <div className="row">
              <div className="col-xl-9 mx-auto">
                <h1 className="mb-5">The Sebi Diet Food Database</h1>
                <FontAwesomeIcon
                  id="landing-leaf"
                  className="icon-layers m-auto text-info fa-10x"
                  icon={faLeaf}
                />
                <h2 className="mb-5">Food for your soul</h2>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row justify-content-center">
             
              <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li class="nav-item">
                  <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">All</a>
                </li>

                <li class="nav-item">
                  <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Vegetables</a>
                </li>

                <li class="nav-item">
                  <a class="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Fruits</a>
                </li>

                <li class="nav-item">
                  <a class="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Spices</a>
                </li>

                <li class="nav-item">
                  <a class="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Grains</a>
                </li>

                <li class="nav-item">
                  <a class="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Sugars</a>
                </li>

                <li class="nav-item">
                  <a class="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Teas</a>
                </li>

                <li class="nav-item">
                  <a class="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Herbs</a>
                </li>

              </ul>
            


            </div>
          </div>
          <div className="container-fluid">
            {/* <div className="row">
              {this.array.map(item => (
                <div key="item" className="col-sm-12 col-md-4">
                  <div className="features-icons-item mx-auto mb-0 mb-lg-3 p-3 mb-5  rounded ">
                    <div className="food-category-container hvr-grow-shadow shadow  ">
                      <img
                        className=" africa-img"
                        src={require("../img/africa.png")}
                        alt="lol"
                      />

                      <div className="food-category mx-auto">
                        <img
                          className="img-fluid category-img"
                          src={require("../img/categories/" + item + ".png")}
                          alt="lol"
                        />
                      </div>
                    </div>
                    <br />
                    <h3>{item}</h3>
                  </div>
                </div>
              ))}
            </div> */}
<Slide>
            <div className="row">
              {this.state.foodList.map(food => (
                <div key={food.id} onClick={() => this.goToFood(food.id) } className="col-sm-6 col-md-4 col-lg-4 col-xl-3">
                  <div className="features-icons-item mx-auto mb-0 mb-lg-3 p-3 mb-5 rounded ">
                    <div className="food-category-container hvr-grow-shadow shadow">
                      <img
                        className="africa-img"
                        src={require("../img/africa.png")}
                        alt="lol"
                      />

                      <div className="food-category mx-auto">
                        <img
                          className="img-fluid category-img"
                          src={food.image}
                          alt="lol"
                        />
                      </div>
                    </div>
                    <br />
                    <h3>{food.name}</h3>
                  </div>
                </div>
              ))}
            </div>
            </Slide>
          </div>
        </header>


      </div>
    );
  }
}

export default Myresults;
