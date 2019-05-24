import React from "react";
import { connect } from "react-redux";
import { getAllPosts } from "../../actions/postActions";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
import DefaultPostPhoto from "../../images/post.jpg";

class Home extends React.Component {
  state = {
    user: "",
    email: ""
  };
  componentDidMount() {
    this.props.getAllPosts();
  }
  render() {
    return (
      <>
        <div className="jumbotron">
          <h2>Home</h2>
          <p />
          <p className="lead"> Welcome to React Frontend</p>
        </div>
        {this.props.loading || !this.props.posts ? (
          <Spinner />
        ) : (
          <div className="container">
            <h2 className="mt-5">Posts</h2>
            {
              <div className="row">
                {this.props.posts &&
                  this.props.posts.map(post => (
                    <div
                      className="card mt-5 mx-3 col-md-3 pt-3"
                      key={post._id}
                    >
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
                        <p className="cart-text">
                          {post.body.length > 50
                            ? post.body.substring(0, 50) + "..."
                            : post.body}
                        </p>
                        <p className="font-italic mark">
                          Posted by{" "}
                          <Link to={`/user/${post.postedBy._id}`}>
                            {" "}
                            {post.postedBy.name}
                          </Link>
                        </p>
                      </div>
                      <Link
                        className="btn btn-primary btn-raised mb-3"
                        to={`/post/${post._id}`}
                      >
                        Read more
                      </Link>
                    </div>
                  ))}
              </div>
            }
          </div>
        )}
      </>
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
)(Home);
