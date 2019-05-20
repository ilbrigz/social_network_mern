import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signOutUser } from "../../actions/authActions";
import { connect } from "react-redux";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return "active-tab";
  } else {
    return "";
  }
};
// TODO: change borderColor to default enheritance

class Menu extends React.Component {
  signOut = () => {
    this.props.signOutUser();
  };
  render() {
    const { history } = this.props;
    return (
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link className={`nav-link ${isActive(history, "/")}`} to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${isActive(history, "/users")}`}
            to="/users"
          >
            Users
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${isActive(history, "/findpeople")}`}
            to="/findpeople"
          >
            Find People
          </Link>
        </li>
        {!this.props.auth.userId && (
          <React.Fragment>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive(history, "/signup")}`}
                id="hello"
                to="/signup"
              >
                SignUp
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive(history, "/signin")}`}
                to="/signin"
              >
                SignIn
              </Link>
            </li>
          </React.Fragment>
        )}
        {this.props.auth.userId && (
          <React.Fragment>
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={this.signOut}>
                SignOut
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive(
                  history,
                  `/user/${this.props.auth.userId}`
                )}`}
                // TODO: conditionally add the isActive class

                to={`/user/${this.props.auth.userId}`}
              >
                {`${this.props.auth.userName}'s Profile`}
              </Link>
            </li>
          </React.Fragment>
        )}
      </ul>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  userInfo: state.auth.userInfo
});

export default connect(
  mapStateToProps,
  { signOutUser }
)(withRouter(Menu));
