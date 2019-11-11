import React from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import store from "./redux/store";
import ReactDOM from "react-dom";
import Router from "./router/router";
import "./server";
ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Router />
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
