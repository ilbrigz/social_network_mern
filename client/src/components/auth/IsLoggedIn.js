import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const IsLoggedIn = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      auth={auth}
      {...rest}
      render={props =>
        auth.userId ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/signin", state: { from: props.location } }}
          />
        )
      }
    />
  );
};
const mapStateToProps = state => ({
  auth: state.auth,
  userInfo: state.auth.userInfo
});

export default withRouter(connect(mapStateToProps)(IsLoggedIn));
