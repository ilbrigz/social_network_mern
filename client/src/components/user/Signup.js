import React, { Component } from "react";
import { signUpUser } from "../../actions/authActions";
import { connect } from "react-redux";

import Spinner from "../common/Spinner";

class SignUp extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    error: {}
  };

  componentDidMount() {
    if (this.props.userId) {
      this.props.history.push("/");
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { name, email, password } = this.state;
    const user = {
      name,
      email,
      password
    };
    this.props.signUpUser(user, this.props.history);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ error: nextProps.errors });
    }
  }

  render() {
    const {
      error: { name: nameErr, email: emailErr, password: passwordErr }
    } = this.state;
    if (this.props.loading) return <Spinner />;
    return (
      <div className="container">
        <p>{this.props.loading && "hi there"}</p>
        <h2 className="mt-5 mb-5">Signup</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name" className="text-muted">
              Name
            </label>
            <input
              id="name"
              onChange={this.onChange}
              type="text"
              className="form-control"
              value={this.state.name}
            />
            {nameErr && (
              <div className="alert alert-success mt-3" role="alert">
                {nameErr.map(item => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="email" className="text-muted">
              Email
            </label>
            <input
              id="email"
              onChange={this.onChange}
              type="email"
              className="form-control"
              value={this.state.email}
            />
            {emailErr && (
              <div className="alert alert-success mt-3" role="alert">
                {emailErr.map(item => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password" className="text-muted">
              Password
            </label>
            <input
              id="password"
              onChange={this.onChange}
              type="password"
              className="form-control"
              value={this.state.password}
            />
            {passwordErr && (
              <div className="alert alert-success mt-3" role="alert">
                {passwordErr.map(item => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={this.onSubmit}
            className="btn btn-raised btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.error.errors,
  loading: state.utils.loading,
  userId: state.auth.userId
});

export default connect(
  mapStateToProps,
  { signUpUser }
)(SignUp);
