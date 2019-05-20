import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getUserById } from "../../actions/userActions.js";
import { setFetching } from "../../actions/utilsActions";

class FollowProfileButton extends Component {
  onFollow = () => {
    if (this.props.fetching) return null;
    this.props.setFetching();
    axios
      .put("/user/follow", {
        followId: this.props.match.params.userId,
        userId: this.props.userId
      })
      .then(res => {
        this.props.getUserById(this.props.match.params.userId);
      })
      .catch(err => {
        console.log(err);
      });
  };

  onUnFollow = () => {
    if (this.props.fetching) return null;
    this.props.setFetching();
    axios
      .put("/user/unfollow", {
        unfollowId: this.props.match.params.userId,
        userId: this.props.userId
      })
      .then(res => {
        this.props.getUserById(this.props.match.params.userId, true);
      })
      .catch(err => {
        console.log(err);
      });
  };
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.fetching !== true;
  }

  render() {
    return (
      <div className="d-inline-block">
        {this.props.userInfo.followers.find(
          follower => follower._id === this.props.userId
        ) ? (
          <button
            className="btn btn-success btn-raised mt5"
            onClick={this.onUnFollow}
          >
            Unfollow
          </button>
        ) : (
          <button
            className="btn btn-success btn-raised mt5"
            onClick={this.onFollow}
          >
            Follow
          </button>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    userInfo: state.auth.userInfo,
    fetching: state.utils.fetching
  };
};

export default connect(
  mapStateToProps,
  { getUserById, setFetching }
)(withRouter(FollowProfileButton));
