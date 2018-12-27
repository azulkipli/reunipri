import React from "react";

// unistore
import { connect } from "unistore/react";
import { actions } from "../store";

class Favorite extends React.Component {
  
  render() {
    return (<div className="favorite"><h1 className="centerAlign">Favorite Resto</h1></div>);
  }
}

export default connect(
  "email,password",
  actions
)(Favorite);
