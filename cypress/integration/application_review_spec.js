// Application review page

beforeEach(function () {
    cy.fixture('users.json').as('user')
    cy.clearCookies();
    cy.clearLocalStorage();
})

describe('application review page', function () {
    it('Checking details can be changed on review page', function () {
        cy.goToSearch()
        // cy.searchSchoolsByLocation()
        cy.searchPhase2Location()
        cy.clickFirstResult()
        cy.checkSchoolProfilePage()
        cy.fillPersonalDetails()
        cy.fillContactDetails()
        cy.chooseSubjects()
        cy.chooseTeachingPreference()
        cy.choosePlacementPreference()
        cy.dbsCheckContinue()

        // Check review page
        // cy.applicationReviewContinue()

        cy.reviewApplicationAnswers()
    })
})