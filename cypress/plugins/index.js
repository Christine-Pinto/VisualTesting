// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const CDP = require("chrome-remote-interface");
let port;

const path = require("path");

module.exports = (on, config) => {
  // Options for the output plugin (cypress-terminal-report)
  const options = {
    printLogsToConsole: "onFail",
    outputRoot: config.projectRoot + "/",
    // Used to trim the base path of specs and reduce nesting in the
    // generated output directory.
    specRoot: path.relative(config.fileServerFolder, config.integrationFolder),
    outputTarget: {
      "cypress-logs|json": "json",
    },
  };

  // Register the output plugin (cypress-terminal-report)
  require("cypress-terminal-report/src/installLogsPrinter")(on, options);

  // Solution to address issues related to tests hanging in the CI
  on("before:browser:launch", (browser = {}, launchOptions) => {
    if (browser.family === "chromium" && browser.name !== "electron") {
      launchOptions.args.push("--disable-dev-shm-usage");
    }
    const arg = launchOptions.args.find((x) =>
      x.includes("--remote-debugging-port")
    );
    if (arg) {
      port = arg.split("=")[1];
    } else {
      port = 40000 + Math.round(Math.random() * 25000);
      launchOptions.args.push(`--remote-debugging-port=${port}`);
    }
    return launchOptions;
  });
  on("task", {
    log(message) {
      console.log(message);
      return null;
    },
  });
};

// Import applitools eyes
require("@applitools/eyes-cypress")(module);
