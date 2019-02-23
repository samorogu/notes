import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import Raven from "raven.js";
import "./index.css";

Raven.config("https://a4e156684c9c45e7b18707b95edccccd@sentry.io/1400997", {
  release: "1-0-0",
  enviroment: "development-test"
}).install();

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
