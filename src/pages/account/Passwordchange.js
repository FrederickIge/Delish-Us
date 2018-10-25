import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {auth} from '../../firebase';
import {Link} from 'react-router-dom';

@inject('sessionStore')
@observer
class Passwordchange extends Component {
  byPropKey = (propertyName, value) => () => ({
    [propertyName]: value
  });

  state = {
    passwordOne: '',
    passwordTwo: '',
    error: null,
    submitted: false
  };

  onSubmit = (event) => {
    const {passwordOne} = this.state;
    auth
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({error: null, submitted: true});
      })
      .catch((error) => {
        this.setState({error: error});
      });
    event.preventDefault();
  };

  render() {
    const isInvalid = this.state.passwordOne === '' || this.state.passwordTwo == '';
    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6 mx-auto">
                <h3 className="text-center">Account: {this.props.sessionStore.authUser.email}</h3>
                <div className="card rounded-0 shadow">
                  <div className="card-header">
                    <h3 className="mb-0">Change Password</h3>
                  </div>

                  <div className="card-body">
                    <form className="form" onSubmit={this.onSubmit}>
                      <div className="form-group">
                        <label htmlFor="uname1">New Password</label>
                        <input
                          className="form-control form-control-lg rounded-0"
                          value={this.passwordOne}
                          onChange={(event) => this.setState(this.byPropKey('passwordOne', event.target.value))}
                          type="password"
                          placeholder="Enter new password"
                        />
                        <div className="invalid-feedback">Oops, you missed this one.</div>
                      </div>

                      <div className="form-group">
                        <label>Re-enter</label>
                        <input
                          className="form-control form-control-lg rounded-0"
                          value={this.passwordTwo}
                          onChange={(event) => this.setState(this.byPropKey('passwordTwo', event.target.value))}
                          type="password"
                          placeholder="Re-enter new password"
                        />
                        <div className="invalid-feedback">Enter your password too!</div>
                      </div>

                      <div>
                        <label className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" />
                        </label>
                      </div>

                      <div className="d-flex">
                        {!this.state.submitted && (
                          <button type="submit" className="btn btn-success btn-lg ml-auto" id="btnLogin" disabled={isInvalid}>
                            Reset
                          </button>
                        )}
                      </div>

                      {this.error && <p>{this.error.message}</p>}
                      <br />
                      {this.state.error && <p className="text-danger">{this.state.error.message}</p>}
                      {this.state.submitted && (
                        <p className="text-success">
                          Reset email sent!{' '}
                          <Link className="text-dark return-link" to="login">
                            Return to Login Page
                          </Link>
                        </p>
                      )}
                    </form>
                  </div>
                </div>
                <br />
                <button type="button" onClick={auth.doSignOut} className="btn btn-primary btn-block">
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Passwordchange;
