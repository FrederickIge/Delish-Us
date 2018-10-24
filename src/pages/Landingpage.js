import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import { faReact, faCss3Alt } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

class Myresults extends Component {
  render() {
    const HeroSection = () => {
      return (
        <header className="masthead text-white text-center">
          <div className="overlay" />
          <div className="container">
            <div className="row">
              <div className="col-xl-9 mx-auto">
                <h1 className="mb-5 text-secondary">Welcome to Doggie Boiler</h1>
              </div>
              <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
                <form>
                  <div className="form-row">
                    <div className="col-12 col-md-6 mb-2 mb-md-0">
                      <Link to="/signup" className="btn btn-block btn-lg btn-primary">
                        Sign up!
                      </Link>
                    </div>

                    <div className="col-12 col-md-6">
                      <Link to="/login" className="btn btn-block btn-lg btn-primary">
                        Login
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </header>
      );
    };

    const FeaturesSection = () => {
      return (
        <section className="features-icons  text-center">
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3 p-3 mb-5 bg-white rounded hvr-grow-shadow">
                  <div className="features-icons-icon d-flex">
                    <FontAwesomeIcon className="icon-layers m-auto text-info" icon={faCss3Alt} />
                  </div>
                  <h3>Bootstrap 4</h3>
                  <p className="lead mb-0">The world's most popular CSS framework</p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3 p-3 mb-5 bg-white rounded hvr-grow-shadow">
                  <div className="features-icons-icon d-flex">
                    <FontAwesomeIcon className="icon-layers m-auto text-info" icon={faFire} />
                  </div>
                  <h3>Firebase</h3>
                  <p className="lead mb-0  text-default">Backend Database and Auth powered by Firebase</p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="features-icons-item mx-auto mb-0 mb-lg-3 p-3 mb-5 bg-white rounded hvr-grow-shadow">
                  <div className="features-icons-icon d-flex">
                    <FontAwesomeIcon className="icon-layers m-auto text-info" icon={faReact} />
                  </div>
                  <h3>Create React App</h3>
                  <p className="lead mb-0 text-default">The world's most popular JS framework + starter kit</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    };

    return (
      <div>
        <HeroSection />
        <FeaturesSection />
      </div>
    );
  }
}

export default Myresults;
