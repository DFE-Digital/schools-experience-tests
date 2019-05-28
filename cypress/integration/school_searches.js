// School Searches

beforeEach(function () {
    cy.fixture('users.json').as('user')
    cy.clearCookies();
    cy.clearLocalStorage();
})

describe('Check school searches functionality', function () {

    it('Search using location services', function () {
        cy.goToSearch()
        cy.searchSchoolsByLocation()

        // results filtering & sorting
        cy.educationPhasesFiltering()
        cy.subjectFiltering()
        cy.checkResultsSorting()
    })  

    it('Enter different country', function () {
        cy.goToSearch()
        cy.get('#location').type('Jamaica')  
        cy.get('#distance').select('25')
        cy.get('input[type="submit"]').click() 
        cy.get('.govuk-heading-l').should('contain', '0 results found')
        cy.get('')
    })

    it('Enter imcomplete Postcode', function () {

    })

    it('Find school using postcode within 10miles', function () {
        
    })

    it('Check school cannot be found if outside of mile radius', function () {
        
    })
})
