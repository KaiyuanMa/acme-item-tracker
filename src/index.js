import React from "react";
import { createRoot } from "react-dom/client";
import store from "./state/store";
import { Provider } from "react-redux";
import App from "./app";

const root = createRoot(document.querySelector("#app"));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
