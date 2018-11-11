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
import { africa } from "../../img/africa.png";
import axios from 'axios'
import posed from 'react-pose';
import {inject, observer} from 'mobx-react';

const Slide = posed.div({
  enter: { x: 0, opacity: 1 },
  exit: { x: -50, opacity: 0 }
});

@inject( 'dogStore')
@observer
class FoodDetail extends Component {

  dogStore = this.props.dogStore;

  state = {
    food:{}

  };

  componentWillMount() {
    let id = this.props.match.params.id;
    let foodList = this.dogStore.foodList
    let food = foodList.find(element => element.id === id);
    console.log(food)
    this.setState({
      food: food
    })
  }

  render() {

    return (
      <div>
        <div className="container container-dashboard ">
          <div className="spacer" />
          <div className="search-container">
            <h2 className="text-center dashboard-header">{this.state.food.name}</h2>
            <div className="spacer" />

            <div className="row">
              <div className="col-md-6 col-sm-12 ">
                  <div className="features-icons-item  rounded ">
                    <div className="food-detail-container  shadow">
                      <img
                        className="africa-img-detail"
                        src={require("../../img/africa.png")}
                        alt="lol"
                      />

                      <div className="food-category mx-auto">
                        <img
                          className="img-fluid category-img"
                          src={this.state.food.image}
                          alt="lol"
                        />
                      </div>
                    </div>
                    <br />
                  
                  </div>
              </div>
              <div className="col-md-6">
              <div className="spacer" />
                {this.state.food.description}

              </div>
            </div>
              <div className="row">
                <div className="col-md-12">
                <h2 className="text-center dashboard-header">Buy</h2>
                https://www.amazon.com/Seeds-Rainbow-Organic-Heirloom-Ukraine/dp/B07DVQSVR1/ref=sr_1_1_sspa?ie=UTF8&qid=1541863845&sr=8-1-spons&keywords=bell+pepper&psc=1
                </div>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FoodDetail;
