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
import { inject, observer } from 'mobx-react';

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
        </header>

          <div className="container">
            <div className="justify-content-center">

              <div className="form-group">
                <label>Food Category</label>
                <select value={this.state.category} onChange={this.onChange} className="form-control" >
                  <option value="All Foods">All Foods</option>
                  <option value="Vegetables">Vegetables</option>
                  <option value="Fruits">Fruits</option>   
                  <option value="Alkaline Grains">Alkaline Grains</option>      
                  <option value="Spices and Seasonings">Spices and Seasonings</option>
                  <option value="Alkaline Sugars and Sweeteners">Alkaline Sugars and Sweeteners</option>
                  <option value="Herbal Teas">Herbal Teas</option>
                  <option value="Herb">Herb</option>
                
                </select>
                
              </div>

            </div>
          </div>

        <br></br>

          <div className="container-fluid">
            <Slide>
              <div className="row">
                {this.state.foodList.map(food => (
                  <div key={food.id} onClick={() => this.goToFood(food.id)} className=" col-sm-6 col-md-6 col-lg-4 col-xl-3">
                    <div className="features-icons-item mx-auto rounded d-flex justify-content-center">
                      <div className="food-category-container hvr-grow-shadow shadow">
                        <img
                          className="africa-img"
                          src={require("../img/africa.png")}
                          alt="lol"
                        />

                        <div className="food-category mx-auto">

                        <div className="category-img">
                          <img
                            className="img-fluid "
                            src={food.image}
                            alt="lol"
                          />
                          <br></br>
                          <p>{food.name}</p>
                          </div>
                        </div>
                        
                      </div>
                      <br />
                      
                    </div>
                  </div>
                ))}
              </div>
            </Slide>
          </div>
       


      </div>
    );
  }
}

export default Myresults;
