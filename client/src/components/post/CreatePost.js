import React, { Component } from "react";
import { createPost } from "../../actions/postActions";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";

class CreatePost extends Component {
  state = {
    title: "",
    body: "",
    photo: "",
    currentDate: Date.now(),
    typed: false,
    error: {}
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ error: nextProps.errors });
    }
  }
  onSubmit = e => {
    e.preventDefault();
    const { title, body, photo } = this.state;
    if (!this.state.typed) {
      return this.props.history.push(`/`);
    }
    if (!title || !body || !photo) {
      alert("please fill in an input you want to change.");
      return;
    }
    const postObject = {
      photo,
      title,
      body,
      postedBy: this.props.userId
    };

    let formData = new FormData();
    for (var key in postObject) {
      formData.append(key, postObject[key]);
    }
    this.props.createPost(this.props.userId, formData);
  };

  onChange = e => {
    switch (e.target.name) {
      case "image":
        if (e.target.files[0] && e.target.files[0].size > 1100000) {
          alert("Image exceeds 1MB. Try a smaller image.");
          this.setState({ currentDate: Date.now() });
          return;
        } else if (!e.target.files[0]) {
          this.setState({ currentDate: Date.now() });
        }
        this.setState({
          photo: e.target.files[0],
          typed: true
        });
        break;
      default:
        this.setState({ [e.target.id]: e.target.value, typed: true });
    }
  };

  render() {
    const {
      error: { title: titleErr }
    } = this.state;
    if (this.props.loading) return <Spinner />;
    return (
      <div className="container">
        <p>{this.props.loading && "hi there"}</p>
        <h2 className="mt-5 mb-5">Create New Post</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name" className="text-muted">
              Title
            </label>
            <input
              id="title"
              onChange={this.onChange}
              type="text"
              className="form-control"
              value={this.state.title}
            />
            {titleErr && (
              <div className="alert alert-success mt-3" role="alert">
                {titleErr.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="name" className="text-muted">
              Body
            </label>
            <textarea
              type="text"
              id="body"
              onChange={this.onChange}
              placeholder="about me"
              value={this.state.body}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="name" className="text-muted">
              Profile Photo
            </label>
            <input
              type="file"
              name="image"
              onChange={this.onChange}
              key={this.state.currentDate}
              className="form-control"
              accept="image/gif,image/png,image/jpeg"
            />
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
  { createPost }
)(CreatePost);
