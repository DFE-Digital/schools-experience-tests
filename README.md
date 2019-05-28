# Malvern-Cypress-Framework
Front End automation collection using Cypress.io. This will be used for live journey checks and a regression pack for when deploying to staging.

## Concepts Included

* Common web page interaction methods
* Common api interaction methods

**Pre-Requisites**
- To run locally ensure you have NPM installed.

Windows + Mac:
- Pull down the repo
- Run ```NPM install```

# Running Cypress.io locally

Before running cypress either through the GUI or at cmd line, ensure you are pointing at the correct environment. The base URL is set in the cypress.json file. Please ensure it is left pointing at staging before committing any changes. 

**Running through the GUI**

```npm run cy:open``` 

This will open up the cypress editor, click on the .js test file to run the test in a browser. The browser can remain open so that as soon as you update the tests in an editor, upon saving, the tests will re-run automatically.


**Running from the CLI**

```npm run cy:run```

This will run the tests through the cmd line and generate output in the console accordingly. 


## Reporting

These tests will be ran on a scheduled job and log out the results to the cypress dashboard here: https://dashboard.cypress.io

This dashboard requires login credentials from your github account, but to view the DfE Organisation inside the dashboard you would need to be given access. Speak to Mak Choudhury to be added.

