//import { v4 as uuidv4 } from "uuid";
// ID is an identifier to integrate the multiple test runs into one batch in applitools
var ID = parseInt(53959673685 + Date.now());

module.exports = {
  apiKey: "Your Key",
  // batch name is the user visible name displayed in the list of batches in the Test Manager (not unique)
  batchName: "Visual Local test - " + ID,
  ignoreDisplacements: true,
  appName: "Visual Tests",
  isDisabled: true,
  testConcurrency: 50,
  // Set this to true to see logs of the Eyes-Cypress plugin. Logs are written to the same output of the Cypress process.
  showLogs: false,
  stitchLevel: "CSS",
  browser: [{ width: 1366, height: 768, name: "chrome" }],
};
