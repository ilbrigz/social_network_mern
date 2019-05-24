import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./components/core/Home";
import Signup from "./components/user/Signup";
import Signin from "./components/user/Signin";
import Profile from "./components/user/Profile";
import Users from "./components/user/Users";
import SinglePost from "./components/post/SinglePost";
import FindPeople from "./components/user/FindPeople";
import IsLoggedIn from "./components/auth/IsLoggedIn";
import EditProfile from "./components/user/EditProfile";
import IsAuthorized from "./components/auth/IsAuthorized";
import CreatePost from "./components/post/CreatePost";
import Menu from "./components/core/Menu";

export default () => {
  return (
    <React.Fragment>
      <Menu />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <IsLoggedIn path="/users" component={Users} />
        <IsLoggedIn path="/post/:postId" component={SinglePost} />
        <IsLoggedIn path="/findpeople" component={FindPeople} />
        <IsAuthorized path="/user/edit/:userId" component={EditProfile} />
        <Route path="/user/:userId" component={Profile} exact />
        <Route path="/newpost" component={CreatePost} />
      </Switch>
    </React.Fragment>
  );
};
