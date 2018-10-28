import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFire, faDog, faHeart, faShareAlt} from '@fortawesome/free-solid-svg-icons';
import {faReact, faCss3Alt} from '@fortawesome/free-brands-svg-icons';
import {Link} from 'react-router-dom';


class Myresults extends Component {
  render() {
    const HeroSection = () => {
      return (
        <header className="masthead text-white text-center">
          <div className="overlay" />
          <div className="container">
            <div className="row">
              <div className="col-xl-9 mx-auto">
                <h1 className="mb-5 text-secondary">Welcome to Doggie Time</h1>
                <h3 className="mb-5 text-secondary">Time for some Doggies!</h3>
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
                      {/* <img src="../img/pupper.png" alt="boohoo" className="img-fluid" /> */}
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
                    <FontAwesomeIcon className="icon-layers m-auto text-info" icon={faDog} />
                  </div>
                  <h3>Pictures</h3>
                  <p className="lead mb-0">Check out pictures of some cute doggies!</p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3 p-3 mb-5 bg-white rounded hvr-grow-shadow">
                  <div className="features-icons-icon d-flex">
                    <FontAwesomeIcon className="icon-layers m-auto text-info" icon={faHeart} />
                  </div>
                  <h3>Adopt</h3>
                  <p className="lead mb-0  text-default">Adpot your doggies and give them a name!</p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="features-icons-item mx-auto mb-0 mb-lg-3 p-3 mb-5 bg-white rounded hvr-grow-shadow">
                  <div className="features-icons-icon d-flex">
                    <FontAwesomeIcon className="icon-layers m-auto text-info" icon={faShareAlt} />
                  </div>
                  <h3>Share!</h3>
                  <p className="lead mb-0 text-default">Check out doggies owned by other users!</p>
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
