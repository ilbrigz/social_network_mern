import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllUsers } from "../../actions/userActions";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
import DefaultProfile from "../../images/avatar.jpg";

class Users extends Component {
  componentDidMount() {
    this.props.getAllUsers();
  }
  render() {
    console.log(this.props.users);
    if (this.props.loading || !this.props.users) return <Spinner />;
    return (
      <div className="container">
        <h2 className="mt-5">Users</h2>
        <div className="row">
          {this.props.users &&
            this.props.users.reverse().map(user => (
              <div className="card mt-5 mx-3 col-md-3 pt-3" key={user._id}>
                <img
                  src={
                    user.image
                      ? `http://localhost:8080/uploads/${user.image}`
                      : DefaultProfile
                  }
                  alt="profile"
                  className="car-img-top"
                  style={{ width: "100%", objectFit: "cover" }}
                />
                <p />
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                  <p className="cart-text">{user.email}</p>
                </div>
                <Link
                  className="btn btn-primary btn-raised mb-3"
                  to={`/user/${user._id}`}
                >
                  View Profile
                </Link>
              </div>
            ))}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  errors: state.error.errors,
  loading: state.utils.loading,
  users: state.user.users
});

export default connect(
  mapStateToProps,
  { getAllUsers }
)(Users);
