import React from "react";

// unistore
import { connect } from "unistore/react";
import { actions } from "../store";

class SignUp extends React.Component {
  
  render() {
    return (<div className="signup"><h1 className="centerAlign">Signup</h1></div>);
  }
}

export default connect(
  "email,password",
  actions
)(SignUp);
