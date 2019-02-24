import * as Sentry from "@sentry/browser";
//import Raven from "raven-js";
function init() {
  // Raven.config("https://a4e156684c9c45e7b18707b95edccccd@sentry.io/1400997", {
  //   release: "1-0-0",
  //   enviroment: "development-test"
  // }).install();

  Sentry.init({
    dsn: "https://a4e156684c9c45e7b18707b95edccccd@sentry.io/1400997",
    release: "1-0-0",
    enviroment: "development-test"
  });
}

function log(error) {
  // Raven.captureException(error);
  Sentry.captureException(error);
}

export default {
  init,
  log
};
