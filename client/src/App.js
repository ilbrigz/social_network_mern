import React, { Component } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import setDefaultHeader from "./utils/setDefaultHeader";
import store from "./store";
import { SET_USER } from "./actions/types";

import MainRouter from "./MainRouter";

// Check for token
if (localStorage.verificationId && typeof window !== "undefined") {
  // Set auth token header auth
  console.log(localStorage.verificationId);
  setDefaultHeader(localStorage.verificationId);
  // Decode token and get user info and exp
  // const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch({
    type: SET_USER,
    payload: { userId: localStorage.userId, userName: localStorage.userName }
  });
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    );
  }
}

export default App;
