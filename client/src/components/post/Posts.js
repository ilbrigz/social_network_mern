import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { getAllPosts } from "../../actions/postActions";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
import DefaultPostPhoto from "../../images/post.jpg";

class Posts extends PureComponent {
  componentDidMount() {
    this.props.getAllPosts();
  }
  render() {
    console.log(this.props.posts);
    console.log("rendered", this.props.loading);
    if (this.props.loading || !this.props.posts) return <Spinner />;
    return (
      <div className="container">
        <h2 className="mt-5">Posts</h2>
        {
          <div className="row">
            {this.props.posts &&
              this.props.posts.map(post => (
                <div className="card mt-5 mx-3 col-md-3 pt-3" key={post._id}>
                  <img
                    src={`http://localhost:8080/post/i/${post._id}`}
                    alt={post.title}
                    style={{ width: "100%", objectFit: "cover" }}
                    onError={i => (i.target.src = `${DefaultPostPhoto}`)}
                    className="car-img-top"
                  />
                  <p />
                  <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="cart-text">{post.body}</p>
                  </div>
                  <Link
                    className="btn btn-primary btn-raised mb-3"
                    to={`/post/${post._id}`}
                  >
                    View Post
                  </Link>
                </div>
              ))}
          </div>
        }
      </div>
    );
  }
}
const mapStateToProps = state => ({
  errors: state.error.errors,
  loading: state.utils.loading,
  posts: state.post.posts
});

export default connect(
  mapStateToProps,
  { getAllPosts }
)(Posts);
