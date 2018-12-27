import React from "react";

// unistore
import { connect } from "unistore/react";
import { actions } from "../store";

class SignIn extends React.Component {
  
  render() {
    return (<div className="signin"><h1 className="centerAlign">Signin</h1></div>);
  }
}

export default connect(
  "email,password",
  actions
)(SignIn);
