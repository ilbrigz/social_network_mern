import React, { Component } from "react";
import { signInUser } from "../../actions/authActions";
import { connect } from "react-redux";

import Spinner from "../common/Spinner";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    error: {}
  };

  componentDidMount() {
    console.log(this.props.location.state);
    if (this.props.userId) {
      this.props.history.push("/");
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({
        error: { reqError: ["Please fill in all the fields."] }
      });
      return;
    }
    const user = {
      email,
      password
    };
    this.props.signInUser(user, this.props.history);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ error: nextProps.errors });
    }
  }

  render() {
    const {
      error: { reqError }
    } = this.state;
    if (this.props.loading) return <Spinner />;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Signin</h2>
        <form>
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
          </div>
          {reqError && (
            <div className="alert alert-success mt-3" role="alert">
              {reqError.map(item => (
                <p key={item}>{item}</p>
              ))}
            </div>
          )}
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
  { signInUser }
)(SignIn);
