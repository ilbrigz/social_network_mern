import React, { Component } from "react";
import { connect } from "react-redux";
import { findPeople } from "../../actions/userActions";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
import DefaultProfile from "../../images/avatar.jpg";
import axios from "axios";
import { setFetching, setLoading } from "../../actions/utilsActions";

class FindPeople extends Component {
  componentDidMount() {
    this.props.setLoading();
    this.props.findPeople(this.props.userId);
  }

  onFollow = id => {
    if (this.props.fetching) return null;
    this.props.setFetching();
    axios
      .put("/user/follow", {
        followId: id,
        userId: this.props.userId
      })
      .then(res => {
        this.props.findPeople(this.props.userId);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    console.log(this.props);
    if (this.props.loading || !this.props.foundUsers) return <Spinner />;
    return (
      <div className="container">
        <h2 className="mt-5">Find Friends</h2>
        <div className="row">
          {this.props.foundUsers &&
            this.props.foundUsers.map(user => (
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
                <button
                  className="btn btn-success btn-raised mt5"
                  onClick={() => this.onFollow(user._id)}
                >
                  Follow
                </button>
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
const mapStateToProps = state => {
  console.log(state);
  return {
    loading: state.utils.loading,
    userId: state.auth.userId,
    foundUsers: state.user.foundUsers,
    fetching: state.utils.fetching
  };
};

export default connect(
  mapStateToProps,
  { findPeople, setFetching, setLoading }
)(FindPeople);
