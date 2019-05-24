import React, { Component } from "react";
import Spinner from "../common/Spinner";
import { getPostById } from "../../actions/postActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import DefaultPostPhoto from "../../images/post.jpg";

class SinglePost extends Component {
  componentDidMount() {
    this.props.getPostById(this.props.match.params.postId);
  }
  // shouldComponentUpdate(nextProps) {
  //   if (this.props.match.params.userId !== nextProps.match.params.userId)
  //     return false;
  // }
  // beforeProfileDelete = () => {
  //   if (window.confirm("Are you sure you want to delete your account?")) {
  //     this.props.deleteUser(this.props.history, this.props.userId);
  //   }
  // };
  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.props.loading !== nextProps.loading;
  // }

  render() {
    if (this.props.loading || !this.props.postById) return <Spinner />;
    return (
      <div className="container">
        <h1 className="display-2 mt-3">{this.props.postById.title}</h1>
        <div className="card-body">
          <img
            src={`http://localhost:8080/post/i/${this.props.postById._id}`}
            alt={this.props.postById.title}
            style={{ height: "200%", width: "auto" }}
            onError={i => (i.target.src = `${DefaultPostPhoto}`)}
            className="car-img-top"
          />

          <p className="card-text">
            {this.props.postById.body.length > 110
              ? this.props.postById.body.substring(0, 100) + "..."
              : this.props.postById.body}
          </p>
          <p className="font-italic mark">
            <Link className="btn btn-raised btn-primary btn-sm" to={"/"}>
              Back to posts
            </Link>
          </p>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    errors: state.error.errors,
    loading: state.utils.loading,
    postById: state.post.postById
  };
};

export default connect(
  mapStateToProps,
  { getPostById }
)(SinglePost);
