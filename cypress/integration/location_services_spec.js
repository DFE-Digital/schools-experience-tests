// Location servivces

beforeEach(function () {
    cy.fixture('users.json').as('user')
    cy.clearCookies();
    cy.clearLocalStorage();
})

describe('Check location services', function () {

    it('Enter imcomplete Postcode', function () {
        cy.visit('/candidates/school_searches/new', {
            auth: {
                username: "schoolStaging",
                password: "experienceStaging"
            }
        })
        cy.wait(2000)
        cy.searchSchoolsByLocation()
    })  

    it('Enter different country')
})





