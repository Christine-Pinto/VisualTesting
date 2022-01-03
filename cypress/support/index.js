// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

import "@applitools/eyes-cypress/commands";

//Import faker.js libary to generate fake data (e.g. email or text)
cy.faker = require("faker");

import "cypress-real-events/support";
import "cypress-file-upload";

// MochawesomeReport
// Options for log collector
const options = {
  collectTypes: ["cons:log", "cons:info", "cons:warn", "cons:error"],
};

// Register the log collector
require("cypress-terminal-report/src/installLogsCollector")(options);

// Import addContext to get the screenshots attached to the HTML report
import addContext from "mochawesome/addContext";

// To turn off all uncaught exception handling --> as I'm using third-party websites as exmaples I want my cypress test to continue even if there are console errors
// https://docs.cypress.io/api/events/catalog-of-events#Uncaught-Exceptions
Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

Cypress.on("test:after:run", (test, runnable) => {
  if (test.state === "failed") {
    let item = runnable;
    const nameParts = [runnable.title];

    // Iterate through all parents and grab the titles
    while (item.parent) {
      nameParts.unshift(item.parent.title);
      item = item.parent;
    }

    const fullTestName = nameParts.filter(Boolean).join(" -- "); // this is how cypress joins the test title fragments

    const imageUrl = `screenshots/${Cypress.spec.name}/${fullTestName} (failed).png`;

    addContext({ test }, imageUrl);
  }
});
