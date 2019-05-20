import React, { Component } from "react";
import Spinner from "../common/Spinner";
import { deleteUser, getUserById } from "../../actions/userActions.js";
import { getErrors, clearErrors } from "../../actions/errorActions.js";
import { setLoading, clearLoading } from "../../actions/utilsActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import DefaultProfile from "../../images/avatar.jpg";
import FollowProfileButton from "../user/FollowProfileButton";
import AvatarName from "./AvatarName";

class Profile extends Component {
  componentDidMount() {
    this.props.getUserById(this.props.match.params.userId);
    this.props.setLoading();
  }
  // shouldComponentUpdate(nextProps) {
  //   if (this.props.match.params.userId !== nextProps.match.params.userId)
  //     return false;
  // }
  componentWillReceiveProps(nextProps) {
    if (
      this.props.match.params.userId !== nextProps.match.params.userId &&
      this.props.match.params.userId !== this.props.userId
    ) {
      this.props.getUserById(nextProps.match.params.userId);
    }
  }
  beforeProfileDelete = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      this.props.deleteUser(this.props.history, this.props.userId);
    }
  };
  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.props.loading !== nextProps.loading;
  // }

  render() {
    if (this.props.loading) return <Spinner />;
    console.log("profile");
    return (
      <div className="container pt-5">
        {this.props.userInfo && (
          <div className="row justify-content-around">
            <div className="my-3 col-md-4">
              <h1>Profile</h1>

              <img
                src={
                  this.props.userInfo.image
                    ? `http://localhost:8080/uploads/${
                        this.props.userInfo.image
                      }`
                    : DefaultProfile
                }
                alt="profile"
                className="car-img-top"
                style={{ width: "100%", objectFit: "cover" }}
              />

              <div className="mt-5">
                <h2>User: {this.props.userInfo.name}</h2>{" "}
                <p>Contact: {this.props.userInfo.email}</p>
              </div>
              <div>
                {this.props.userInfo._id === this.props.userId && (
                  <div className="d-inline-block mt-5">
                    <Link
                      className="btn btn-raised btn-success"
                      to={`/user/edit/${this.props.userId}`}
                    >
                      Edit Profile
                    </Link>
                    <button
                      className="btn btn-raised btn-danger"
                      onClick={this.beforeProfileDelete}
                    >
                      Delete Profile
                    </button>
                  </div>
                )}{" "}
                {this.props.userInfo._id !== this.props.userId && (
                  <FollowProfileButton
                    userId={this.props.userId}
                    followers={this.props.userInfo.followers}
                  />
                )}
              </div>
            </div>
            <div className="col col-md-6 mt-md-5 pt-md-4">
              {this.props.userInfo.about && (
                <>
                  <p>About:</p>
                  <p className="lead">{this.props.userInfo.about}</p>
                </>
              )}

              <hr />
              {this.props.userInfo.following.length > 0 && (
                <>
                  <h4>Following:</h4>
                  <div>
                    {this.props.userInfo.following.map((item, i) => (
                      <div key={i}>
                        <div className="row">
                          <AvatarName item={item} />
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {this.props.userInfo.followers.length > 0 && (
                <>
                  <h4>Followers:</h4>
                  <div>
                    {this.props.userInfo.followers.map((item, i) => (
                      <div key={i}>
                        <div className="row">
                          <AvatarName item={item} />
                        </div>
                      </div>
                    ))}
                  </div>{" "}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    userInfo: state.auth.userInfo,
    errors: state.error.errors,
    loading: state.utils.loading
  };
};

export default connect(
  mapStateToProps,
  { deleteUser, getUserById, clearErrors, getErrors, setLoading, clearLoading }
)(Profile);
