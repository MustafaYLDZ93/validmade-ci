const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://jsonplaceholder.typicode.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: false,
    video: false,
    screenshotOnRunFailure: false,
  },
  reporter: 'mocha-junit-reporter',
  reporterOptions: {
    mochaFile: 'reports/junit.xml',
    toConsole: false,
  },
});
