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
    })

    it('Enter imcomplete Postcode', function () {
        cy.goToSearch()
        cy.enterPostcode('SK8')
        cy.get('#distance').select('10')
        cy.get('input[type="submit"]').click()
        cy.get('.govuk-heading-l').should('contain', '0 results found')
    })

    it('Find school using postcode within 5 miles', function () {
        cy.goToSearch()
        cy.enterPostcode('M1 2WD')
        cy.get('#distance').select('5')
        cy.get('input[type="submit"]').click()
        cy.get('.govuk-heading-l')
            .eq(1)
            .should('contain', 'Manchester Communication Academy')
        cy.get('.govuk-heading-l')
            .eq(6)
            .should('not.contain', 'Stanley Road Primary School')
    })

    it('Make sure same school 10 miles cannot be found if only 5 miles searched', function () {
        cy.goToSearch()
        cy.enterPostcode('M1 2WD')
        cy.get('#distance').select('10')
        cy.get('input[type="submit"]').click()
        cy.get('.govuk-heading-l')
            .eq(6)
            .should('contain', 'Stanley Road Primary School')
    })

    it('Check school cannot be found if outside of mile radius', function () {
        
    })
})
