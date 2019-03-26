import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import { PasswordForgetLink } from './Passwordforget';
import { loginUi } from '../../firebase/firebase';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

@inject('userStore')
@observer
class Login extends Component {
  static firebaseUiDeleted = Promise.resolve();

  state = {
    email: '',
    password: '',
    error: null
  };

  componentDidMount() {
    const { userStore } = this.props;
    Login.firebaseUiDeleted.then(() => {
      loginUi.start('#firebaseui-auth-container', userStore.uiConfig);
    });
  }

  onSubmit = (event) => {
    const { email, password } = this.state;
    this.props.userStore.emailLogin(email, password);
    event.preventDefault();
  };

  render() {
    const isInvalid = this.state.email === '' || this.state.password === '';

    const { userStore } = this.props;

    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 mx-auto delishus-map-card">
                <div className=" ">
                  <div >
                    {/* <h3 className="mb-0">Login</h3> */}
                  </div>
                  <div className="card-body">
                    <div id="firebaseui-auth-container" />

                    <form className="form" onSubmit={this.onSubmit}>
                      <div className="form-group">
                        <label htmlFor="uname1">Email</label>
                        <input
                          className="form-control form-control-lg rounded-0 form-control-alternative"
                          value={this.password}
                          onChange={(event) => this.setState(byPropKey('email', event.target.value))}
                          type="text"
                          placeholder="Email Address"
                          name="duelarm@gmail.com"
                          autoComplete="on"
                        />
                        <div className="invalid-feedback">Oops, you missed this one.</div>
                      </div>

                      <div className="form-group">
                        <label>Password</label>
                        <input
                          className="form-control form-control-lg rounded-0 form-control-alternative"
                          value={this.password}
                          onChange={(event) => this.setState(byPropKey('password', event.target.value))}
                          type="password"
                          placeholder="Password"
                          name="password"
                          autoComplete="on"
                        />
                        <div className="invalid-feedback">Enter your password too!</div>
                      </div>

                      <div>
                        <label className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" />
                        </label>
                      </div>

                      <div className="d-flex">
                        <button type="submit" className="btn btn-block btn-success btn-lg ml-auto" id="btnLogin" disabled={isInvalid}>
                          Login
                        </button>
                      </div>

                      <div className="warning-wrapper">
                        {userStore.error ? (
                          <div className="alert alert-danger" role="alert">
                            {userStore.error.message}
                          </div>
                        ) : null}
                      </div>

                      <PasswordForgetLink />

                      <p>
                        <Link to="/signup">Sign up</Link>
                      </p>
                    </form>
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

export default Login;
