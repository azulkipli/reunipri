import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "./store";
import { hot } from "react-hot-loader";
import { Helmet } from "react-helmet";
// app environment configuration
import { appconf } from "./etc";
import logo from "./images/resist_logo.png";
// custom components
import MainRoute from "./routes/MainRoute";
// primereact
import { Button } from "primereact/button";
import { SlideMenu } from "primereact/slidemenu";

// const

class App extends Component {
  state = {
    windowHeight: window.innerHeight,
    count: 0,
    menuButton: true
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = e => {
    this.setState({ windowHeight: window.innerHeight });
  };

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  toggleButtonMenu = () => {
    this.setState({ menuButton: !this.state.menuButton });
  };

  render() {
    const { menuButton, windowHeight } = this.state;
    const { history } = this.props;
    const minHeight = windowHeight - 132;

    // const { isLogin, location } = this.props;
    // const minHeight = this.state.windowHeight - 85;
    // set home path & navigation back
    // const pathname = location.pathname;
    // const home = isLogin ? "/favorite" : "/";
    // const exclNavback = ["/", home];
    // const showNavback = !exclNavback.includes(pathname);

    const menu_items = [
      {
        label: "Favorite",
        icon: "pi pi-file",
        command: e => {
          history.push("/favorite");
          this.menu.toggle(e);
        }
      },
      {
        label: "Signin",
        icon: "pi pi-sign-in",
        command: e => {
          history.push("/signin");
          this.menu.toggle(e);
        }
      },
      {
        separator: true
      },
      {
        label: "Signup",
        icon: "pi pi-sign-out",
        command: e => {
          history.push("/signup");
          this.menu.toggle(e);
        }
      },
      {
        separator: true
      },
      {
        label: "Repo",
        icon: "pi pi-sign-out",
        command: e => {
          this.menu.toggle(e);
          window.open('https://github.com/azulkipli/reunipri', '_blank');
        }
      }
    ];

    // return components
    return (
      <div className="app">
        {/* set default HTML title & meta */}
        <Helmet>
          <title>
            {appconf("NAME")} | {appconf("SLOGAN")}
          </title>
          <meta name="description" content={appconf("DESCRIPTION")} />
          <meta name="keywords" content={appconf("KEYWORDS")} />
          <meta name="author" content={appconf("AUTHOR")} />
        </Helmet>
        <header className="alcenter">
          <div className="p-grid mxWidth480">
            <div className="p-col leftAlign pdTL10">
              <Button
                className="p-button-secondary"
                icon={menuButton ? "pi pi-bars" : "pi pi-times"}
                onClick={e => {
                  this.menu.toggle(e);
                }}
              />
              <SlideMenu ref={el => (this.menu = el)} model={menu_items} popup={true} />
            </div>
            <div className="p-col pdTL centerAlign">
              <Link to="/">
                <img height="48" src={logo} alt="logo" />
              </Link>
            </div>
            <div className="p-col rightAlign pdTR10">
              <Button
                className="p-button-secondary"
                icon="pi pi-question"
                onClick={() => history.push("/help")}
              />
            </div>
          </div>
        </header>

        <section style={{ minHeight: minHeight }}>
          <MainRoute />
        </section>

        <footer>
          <div className="centerAlign">
            &copy;&nbsp;
            <a href="https://github.com/azulkipli" target="_blank" rel="noopener noreferrer">
              azul
            </a>
          </div>
        </footer>
      </div>
    );
  }
}

export default connect(
  "isLogin,isMobile",
  actions
)(hot(module)(withRouter(App)));
