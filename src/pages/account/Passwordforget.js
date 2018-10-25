import React, {Component} from 'react';
import {auth} from '../../firebase';
import {Link} from 'react-router-dom';

class Passwordforgot extends Component {
  byPropKey = (propertyName, value) => () => ({
    [propertyName]: value
  });

  state = {
    email: '',
    error: null,
    submitted: false
  };

  onSubmit = (event) => {
    const {email} = this.state;
    auth
      .doPasswordReset(email)
      .then(() => {
        this.setState({error: null, submitted: true});
      })
      .catch((error) => {
        this.setState({error: error});
      });
    event.preventDefault();
  };

  render() {
    const isInvalid = this.state.email === '';

    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-md-12">
            <h2 className="text-center text-white mb-4">Bootstrap 4 Login Form</h2>
            <div className="row">
              <div className="col-md-6 mx-auto">
                <div className="card rounded-0">
                  <div className="card-header">
                    <h3 className="mb-0">Reset Password</h3>
                  </div>

                  <div className="card-body">
                    <form className="form" onSubmit={this.onSubmit}>
                      <div className="form-group">
                        <label htmlFor="uname1">Email</label>
                        <input
                          className="form-control form-control-lg rounded-0"
                          value={this.password}
                          onChange={(event) => this.setState(this.byPropKey('email', event.target.value))}
                          type="text"
                          placeholder="Email Address"
                          name="duelarm@gmail.com"
                          autoComplete="on"
                        />
                        <div className="invalid-feedback">Oops, you missed this one.</div>
                      </div>

                      {!this.state.submitted && (
                        <button type="submit" className="btn btn-success btn-lg float-right" id="btnLogin" disabled={isInvalid}>
                          Submit
                        </button>
                      )}

                      {this.state.error && <p className="text-danger">{this.state.error.message}</p>}
                      {this.state.submitted && (
                        <p className="text-success">
                          Reset email sent!{' '}
                          <Link className="text-dark return-link" to="login">
                            {' '}
                            Return to Login Page
                          </Link>
                        </p>
                      )}
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

const PasswordForgetLink = () => (
  <p>
    <Link to="/resetpassword">Forgot Password?</Link>
  </p>
);

export default Passwordforgot;

export {PasswordForgetLink};
