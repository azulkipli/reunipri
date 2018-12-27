import React from "react";
import Loadable from "react-loadable";
import { Route, Redirect, Switch } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../store";

const Loading = () => <i className="pi pi-spin pi-spinner" style={{'fontSize': '2em'}}></i>;

const NoMatch = Loadable({
  loader: () => import(/* webpackChunkName: "nomatch"*/ "../pages/NoMatch"),
  loading: () => <Loading />
});

const Home = Loadable({
  loader: () => import(/* webpackChunkName: "home"*/ "../pages/Home"),
  loading: () => <Loading />
});

const SignIn = Loadable({
  loader: () => import(/* webpackChunkName: "signin"*/ "../pages/SignIn"),
  loading: () => <Loading />
});

const SignUp = Loadable({
  loader: () => import(/* webpackChunkName: "signup"*/ "../pages/SignUp"),
  loading: () => <Loading />
});

const Account = Loadable({
  loader: () => import(/* webpackChunkName: "account"*/ "../pages/Account"),
  loading: () => <Loading />
});
const Favorite = Loadable({
  loader: () => import(/* webpackChunkName: "favorite"*/ "../pages/Favorite"),
  loading: () => <Loading />
});

const PrivateRoute = ({ component: Component, ...args }) => {
  // console.log("args", args);
  const isLogin = args.isLogin;
  // console.log("args isLogin", isLogin);
  return (
    <Route
      {...args}
      render={props =>
        isLogin ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/signin", state: { from: props.location } }} />
        )
      }
    />
  );
};

const MainRoute = connect(
  "isLogin,email,password",
  actions
)(({ isLogin }) => {
  const c_store = JSON.parse(localStorage.getItem("unistorePersist")) || {};
  // console.log("c_store", c_store);
  let current_login = isLogin;
  if (c_store.hasOwnProperty("isLogin") && c_store.isLogin) current_login = c_store.isLogin;
  // console.log("current_login", current_login);
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <PrivateRoute isLogin={current_login} path="/account" component={Account} />
      <PrivateRoute isLogin={current_login} path="/favorite" component={Favorite} />
      <Route component={NoMatch} />
    </Switch>
  );
});

export default MainRoute;
