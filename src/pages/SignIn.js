import React, { Component } from "react";

// unistore
import { connect } from "unistore/react";
import { actions } from "../store";

import { Button } from "primereact/button";
import { Growl } from "primereact/growl";

class SignIn extends Component {
  state = {
    isLoading: false
  };
  signIn = async () => {
    const { doLogin, history } = this.props;
    await doLogin().then(() => {
      if (this.props.isLogin) {
          history.push("/");          
      } else {
        this.growl.show({ severity: "warn", summary: "Signin", detail: this.props.loginMessage });
      }
    });
  };
  render() {
    let { isLoginLoading } = this.props;
    console.log('isLoginLoading', isLoginLoading);
    return (
      <div className="signin">
        <Growl ref={el => (this.growl = el)}  />
        <h1 className="centerAlign">Signin</h1>
        <div className="centerAlign">
          <Button
            className="p-button-secondary"
            icon={isLoginLoading ? "pi pi-spin pi-spinner" : "pi pi-sign-in"}
            label="Signin"
            onClick={this.signIn}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  "email,password,isLogin,isLoginLoading,loginMessage",
  actions
)(SignIn);
