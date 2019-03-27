import React, { Component } from "react";


class Footer extends Component {
  render() {
    return (
      <footer className="footer white-bg d-flex align-items-center">

        <div className="container">

          <div className="row">

            <div className="col-6 ">
              <div className="d-flex h-100 align-items-center">

                <div>Made by Frederick Igee</div>



              </div>

            </div>

            <div className="col-6">
              <div className="d-flex">
                <div className="ml-auto p-2">

                  <a
                    target="_blank"
                    href="https://twitter.com/creativetim"
                    className="btn btn-neutral btn-icon-only btn-twitter btn-round btn-lg"
                    data-toggle="tooltip"
                    data-original-title="Follow us">
                    <i className="fa fa-twitter" />
                  </a>

                  <a
                    target="_blank"
                    href="https://github.com/creativetimofficial"
                    className="btn btn-neutral btn-icon-only btn-github btn-round btn-lg"
                    data-toggle="tooltip"
                    data-original-title="Star on Github"
                  >
                    <i className="fa fa-github" />
                  </a>
                </div>

              </div>
            </div>


          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
