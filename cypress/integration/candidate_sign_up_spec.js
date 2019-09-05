// Candidate sign up journey

beforeEach(function () {
    cy.fixture('users.json').as('user')
    cy.clearCookies();
    cy.clearLocalStorage();
    // cy.viewport('iphone-6+')
})

describe('Candidate sign up journey', function () {

    it('End to end candidate sign up journey', function () {
        // can be ran against 'local' or 'staging' env
        cy.login('staging')
        cy.navigateToSchoolSearchPage()
        // cy.searchSchoolsByLocation()
        cy.searchPhase2Location()

        // results filtering & sorting
        cy.educationPhasesFiltering()
        cy.subjectFiltering()
        cy.checkResultsSorting()
        cy.clickFirstResult()

        // school profile page
        cy.checkSchoolProfilePage()

        // check validation error messages when candidate
        // leaves availability/placement reason blank
        // -- LEAVE THE BELOW TWO STEPS OUT FOR NOW --
        // cy.placementPreferencePageErrors()
        // cy.checkRequestExperiencePage()

        // assert against error when no contacts details filled
        // fills personal details
        cy.personalDetailsError()
        cy.fillPersonalDetails()

        // fill contact details
        cy.contactDetailsError()
        cy.fillContactDetails()

        // assert against error when no subjects selected
        cy.subjectsErrors()
        cy.chooseSubjects()

        // assert against error when no subjects selected
        cy.teachingPreferenceErrors()
        cy.chooseTeachingPreference()

        // assert against error when no placement preference selected
        cy.placementPreferenceErrors()
        cy.choosePlacementPreference()

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



