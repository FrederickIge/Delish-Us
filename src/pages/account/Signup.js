import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import { loginUi } from '../../firebase/firebase';

@inject('userStore')
@observer
class Signup extends Component {
  static firebaseUiDeleted = Promise.resolve();

  registerForm = this.props.userStore.registerForm;

  componentDidMount() {
    const { userStore } = this.props;
    Signup.firebaseUiDeleted.then(() => {
      loginUi.start('#firebaseui-auth-container', userStore.uiConfig);
    });
  }

  onSubmit = (event) => {
    this.props.userStore.emailRegistration();
    event.preventDefault();
  };

  render() {
    const isInvalid =
      this.registerForm.passwordOne !== this.registerForm.passwordTwo ||
      this.registerForm.passwordOne === '' ||
      this.registerForm.email === '' ||
      this.registerForm.username === '';

    const { userStore } = this.props;

    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 mx-auto delishus-map-card">
                <div >

                  <div className="card-body">
                    <div id="firebaseui-auth-container" />

                    <form onSubmit={this.onSubmit}>
                      <fieldset>
                        <div className="form-group has-error">
                          <input
                            value={this.username}
                            onChange={(event) => (userStore.registerForm.username = event.target.value)}
                            className="form-control form-control-lg rounded-0 form-control-alternative"
                            placeholder="Username"
                            type="text"
                            placeholder="username"
                          />
                        </div>

                        <div className="form-group">
                          <input
                            value={this.email}
                            onChange={(event) => (userStore.registerForm.email = event.target.value)}
                            className="form-control form-control-lg rounded-0 form-control-alternative"
                            placeholder="email"
                            type="text"
                            placeholder="email"
                          />
                        </div>

                        <div className="form-group">
                          <input
                            value={this.passwordOne}
                            onChange={(event) => (userStore.registerForm.passwordOne = event.target.value)}
                            className="form-control form-control-lg rounded-0 form-control-alternative"
                            placeholder="Enter password"
                            type="password"
                          />
                        </div>

                        <div className="form-group">
                          <input
                            value={this.passwordTwo}
                            onChange={(event) => (userStore.registerForm.passwordTwo = event.target.value)}
                            className="form-control form-control-lg rounded-0 form-control-alternative"
                            placeholder="Re-enter password"
                            type="password"
                          />
                        </div>

                        <input className="btn btn-lg btn-primary btn-block"  type="submit" disabled={isInvalid} value="Sign Up" />
                        {/* <button className="btn btn-lg btn-primary btn-block">Sign Up</button> */}
                      </fieldset>

                      <div className="warning-wrapper">
                        {userStore.error ? (
                          <div className="alert alert-danger" role="alert">
                            {userStore.error.message}
                          </div>
                        ) : null}
                      </div>
                    </form>

                    <p>
                      <Link to="/login">Already have an account?</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
