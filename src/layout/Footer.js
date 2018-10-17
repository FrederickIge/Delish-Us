import React, { Component } from "react";


class Footer extends Component {
  render() {
      return(
        <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 h-100 text-center text-lg-left my-auto">
              <ul className="list-inline mb-2">
                <li className="list-inline-item">
                  <a>About</a>
                </li>
                <li className="list-inline-item">⋅</li>
                <li className="list-inline-item">
                  <a>Contact</a>
                </li>
                <li className="list-inline-item">⋅</li>
                <li className="list-inline-item">
                  <a >Terms of Use</a>
                </li>
                <li className="list-inline-item">⋅</li>
                <li className="list-inline-item">
                  <a>Privacy Policy</a>
                </li>
              </ul>
              <p className="text-muted small mb-4 mb-lg-0">© Your Website 2018. All Rights Reserved.</p>
            </div>
            <div className="col-lg-6 h-100 text-center text-lg-right my-auto">
              <ul className="list-inline mb-0">
                <li className="list-inline-item mr-3">
                  <a >
                    <i className="fab fa-facebook fa-2x fa-fw" />
                  </a>
                </li>
                <li className="list-inline-item mr-3">
                  <a >
                    <i className="fab fa-twitter-square fa-2x fa-fw" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a >
                    <i className="fab fa-instagram fa-2x fa-fw" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      )
  }
}

export default Footer