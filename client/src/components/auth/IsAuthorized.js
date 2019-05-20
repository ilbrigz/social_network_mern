import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const IsAuthorized = ({
  component: Component,
  userInfo,
  auth,

  ...rest
}) => {
  return (
    <Route
      auth={auth}
      {...rest}
      path="/user/:userId"
      render={props =>
        auth.userId &&
        userInfo &&
        userInfo._id === auth.userId &&
        auth.userId === props.match.params.userId ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: `/user/${props.match.params.userId}`,
              state: { from: props.location }
            }}
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

export default withRouter(connect(mapStateToProps)(IsAuthorized));
