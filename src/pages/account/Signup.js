import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import firebase from "firebase";
import { loginUi, uiConfig } from "../../firebase/firebase";
import { inject, observer } from "mobx-react";

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

@inject("userStore")
@observer
class Signup extends Component {

  static firebaseUiDeleted = Promise.resolve();

  registerForm = this.props.userStore.registerForm

  componentDidMount() {
    const { userStore } = this.props
    Signup.firebaseUiDeleted.then(() => {
      loginUi.start("#firebaseui-auth-container", userStore.uiConfig);
    });
  }

  onSubmit = event => {
    this.props.userStore.emailRegistration();
    event.preventDefault();
  };

  render() {

    const isInvalid =
    this.registerForm.passwordOne !== this.registerForm.passwordTwo ||
    this.registerForm.passwordOne === "" ||
    this.registerForm.email === "" ||
    this.registerForm.username === "";

    const { userStore } = this.props

    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-8 col-sm-12 mx-auto">
                <div className="card rounded-0 shadow-lg">
                  <div className="card-header">
                    <h3 className="mb-0">Signup</h3>
                  </div>
                  <div className="card-body">
                    <div id="firebaseui-auth-container" />
                    <form onSubmit={this.onSubmit}>
                      <fieldset>
                        <div className="form-group has-error">
                          <input
                            value={this.username}
                            onChange={event => userStore.registerForm.username = event.target.value}
                            className="form-control form-control-lg rounded-0 form-control-alternative"
                            placeholder="Username"
                            type="text"
                            placeholder="username"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            value={this.email}
                            onChange={event => userStore.registerForm.email = event.target.value}
                            className="form-control form-control-lg rounded-0 form-control-alternative"
                            placeholder="email"
                            type="text"
                            placeholder="email"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            value={this.passwordOne}
                            onChange={event => userStore.registerForm.passwordOne = event.target.value}
                            className="form-control form-control-lg rounded-0 form-control-alternative"
                            placeholder="Enter password"
                            type="password"
                          />
                        </div>

                        <div className="form-group">
                          <input
                            value={this.passwordTwo}
                            onChange={event => userStore.registerForm.passwordTwo = event.target.value}
                            className="form-control form-control-lg rounded-0 form-control-alternative"
                            placeholder="Re-enter password"
                            type="password"
                          />
                        </div>

                        <input
                          className="btn btn-lg btn-primary btn-block"
                          defaultValue="Sign Me Up"
                          type="submit"
                          disabled={isInvalid}
                        />
                      </fieldset>
                      {this.isInvalid}
                      <div className="warning-wrapper">
                        {userStore.registerForm.error ? (
                          <div class="alert alert-danger" role="alert">
                            {userStore.error.message}
                          </div>
                        ) : null}
                      </div>
                    </form>
                    <p>
                      {" "}
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
