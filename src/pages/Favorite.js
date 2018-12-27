import React from "react";

// unistore
import { connect } from "unistore/react";
import { actions } from "../store";

class Favorite extends React.Component {
  
  render() {
    return (<h1>Favorite Resto</h1>);
  }
}

export default connect(
  "email,password",
  actions
)(Favorite);
