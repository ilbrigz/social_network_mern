import React, { Component } from "react";
import { getUserById, updateUser } from "../../actions/userActions.js";
import { connect } from "react-redux";
import DefaultProfile from "../../images/avatar.jpg";

import Spinner from "../common/Spinner";

class EditProfile extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    error: {},
    image: "",
    imageToDelete: "",
    typed: false,
    about: "",
    currentDate: Date.now()
  };
  componentDidMount() {
    if (!this.props.userInfo) {
      this.props.getUserById(this.props.match.params.userId);
    } else {
      const { name, email, about } = this.props.userInfo;
      this.setState({ name, email, about });
    }
  }

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
          image: e.target.files[0],
          imageToDelete: this.props.userInfo.image,
          typed: true
        });
        break;
      default:
        this.setState({ [e.target.id]: e.target.value, typed: true });
    }
  };

  onSubmit = e => {
    e.preventDefault();
    const { name, email, password, image, about } = this.state;
    if (!this.state.typed) {
      return this.props.history.push(`/user/${this.props.userId}`);
    }
    if (!name && !email && !password && !image && !about) {
      alert("please fill in an input you want to change.");
      return;
    }
    const user = {
      name,
      email,
      ...(password && { password }),
      ...(image && { image }),
      ...(about && { about })
    };

    console.log(user);
    let formData = new FormData();
    for (var key in user) {
      formData.append(key, user[key]);
    }
    formData.append("imageToDelete", this.state.imageToDelete);
    this.props.updateUser(formData, this.props.userId, this.props.history);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.userInfo && this.props.userInfo !== nextProps.userInfo) {
      const { name, email } = nextProps.userInfo;
      this.setState({ name, email });
    }
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
        <div className="mt-3 col-md-4">
          <img
            src={
              this.props.userInfo.image
                ? `http://localhost:8080/uploads/${this.props.userInfo.image}`
                : DefaultProfile
            }
            alt="profile"
            className="car-img-top"
            style={{ width: "100%", objectFit: "cover" }}
          />
        </div>
        <h2 className="mt-5 mb-5">Edit Profile</h2>
        <form onSubmit={this.onSubmit}>
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
          <div className="form-group">
            <label htmlFor="name" className="text-muted">
              About
            </label>
            <textarea
              type="text"
              id="about"
              onChange={this.onChange}
              placeholder="about me"
              value={this.state.about}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-raised btn-primary">
            Update
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.error.errors,
  loading: state.utils.loading,
  userId: state.auth.userId,
  userInfo: state.auth.userInfo
});

export default connect(
  mapStateToProps,
  { updateUser, getUserById }
)(EditProfile);
