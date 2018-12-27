import React from "react";

// unistore
import { connect } from "unistore/react";
import { actions } from "../store";

class Home extends React.Component {
  
  render() {
    return (<div className="home"><h1 className="centerAlign">Home Resto</h1></div>);
  }
}

export default connect(
  "email,password",
  actions
)(Home);
