import React from "react";
// unistore
import { connect } from "unistore/react";
import { actions } from "../store";
// import LazyLoad from "react-lazyload";

class Account extends React.Component {
  render() {

    return (
      <h1>Account</h1>
    );
  }
}

export default connect(
  "isLogin",
  actions
)(Account);
