import createStore from "unistore";
import devtools from "unistore/devtools";
// import persistStore from "unissist";
// import localStorageAdapter from "unissist/integrations/localStorageAdapter";
import { uniq } from "lodash";
import axios from "axios";
import { fakeListResto } from "./sampleData";

const initialState = {
  email: "",
  password: "",
  confirm_password: "",
  full_name: "",
  user_name: "",
  mobile_phone: "",
  isLogin: false,
  isLoginLoading: false,
  loginMessage: "",
  isMobile: true,
  listResto: [],
  listOpenTimes: []
};

// const adapter = localStorageAdapter();

export const store =
  process.env.NODE_ENV === "production"
    ? createStore(initialState)
    : devtools(createStore(initialState));

// persistStore(store, adapter);

const env = process.env;

export const actions = store => ({
  // Actions can just return a state update:
  setField: ({ email, password }, event) => {
    if (event.target.name === "email") return { email: event.target.value };
    if (event.target.name === "password") return { password: event.target.value };
  },

  async getResto(state) {
    return { listResto: fakeListResto };
    // await reqwest({
    //   url: env.REACT_APP_API_RESTO_LIST,
    //   method: "get",
    //   success: function(resp) {
    //     console.log("getResto response: ", resp);
    //     return { listResto: uniq(resp) };
    //   },
    //   error: function(err) {
    //     return { listResto: fakeListResto };
    //   }
    // });
  },

  async doLogout(state) {
    let result = await axios
      .get(env.REACT_APP_API_LOGIN)
      .then(resp => {
        // handle success
        // console.log("doLogin response", resp);
        return resp.data;
      })
      .catch(err => {
        // handle error
        console.log("doLogin error", err);
        if (!err.response) {
          return { status: 0 };
        } else {
          return { status: err.response.status };
        }
      });

    if (result.hasOwnProperty("app")) {
      // console.log("doLogin has app");
      return { isLogin: false, isLoginLoading: false };
    } else if (result.status === 0) {
      // console.log("doLogin has error 0");
      return { isLogin: true, isLoginLoading: false, loginMessage: "No connection to server" };
    } else if (result.status === 404) {
      // console.log("doLogin has error 404");
      return { isLogin: true, isLoginLoading: false, loginMessage: "Endpoint not found" };
    } else {
      return { isLogin: true, isLoginLoading: false };
    }
  },

  async doLogin(state) {
    store.setState({ isLoginLoading: true });
    let result = await axios
      .get(env.REACT_APP_API_LOGIN)
      .then(resp => {
        // handle success
        // console.log("doLogin response", resp);
        return resp.data;
      })
      .catch(err => {
        // handle error
        console.log("doLogin error", err);
        if (!err.response) {
          return { status: 0 };
        } else {
          return { status: err.response.status };
        }
      });

    setTimeout(() => {
      console.log("doLogin result", result);
    }, 2000);

    if (result.hasOwnProperty("app")) {
      // console.log("doLogin has app");
      return { isLogin: true, isLoginLoading: false };
    } else if (result.status === 0) {
      // console.log("doLogin has error 0");
      return { isLogin: false, isLoginLoading: false, loginMessage: "No connection to server" };
    } else if (result.status === 404) {
      // console.log("doLogin has error 404");
      return { isLogin: false, isLoginLoading: false, loginMessage: "Endpoint not found" };
    } else {
      return { isLogin: false, isLoginLoading: false };
    }
  }
});
