// Candidate sign up journey

beforeEach(function () {
    cy.fixture('users.json').as('user')
    cy.clearCookies();
    cy.clearLocalStorage();
})

describe('Candidate sign up journey', function () {

    it('End to end candidate sign up journey', function () {
        // can be ran against 'local' or 'staging' env
        cy.login('staging')
        cy.navigateToSchoolSearchPage()
        cy.searchSchoolsByLocation()

        // results filtering & sorting
        cy.educationPhasesFiltering()
        cy.subjectFiltering()
        cy.checkResultsSorting()

        // school prpfile page
        cy.checkSchoolProfilePage()

        // check validation error messages when candidate
        // leaves avaiability/placement reason blank
        cy.placementPreferencePageErrors()
        cy.checkRequestExperiencePage()

        // assert against error when no contacts details filled
        cy.contactDetailsError()
        cy.fillContactDetails()

        // assert against error when no subjects selected
        cy.subjectsErrors()
        cy.chooseSubjects()

        // assert against error when no DBS check selected
        cy.dbsErrorCheck()
        cy.dbsCheckContinue()

        // application review page
        cy.applicationReviewErrors()
        cy.applicationReviewContinue()

        // confirmation fo email page
        cy.confirmEmailPage()
    })  
})



