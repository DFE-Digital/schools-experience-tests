// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (env) => {
    cy.visit(Cypress.env(env).url, {
        onBeforeLoad: win => {
            win.sessionStorage.clear();
        },
        auth: {
            username: Cypress.env(env).username,
            password: Cypress.env(env).password
        }
    })
})

Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
    const domain = Cypress.env('local')

    if (domain === 'local') {
        url = 'https://localhost:3000'
    }

    if (domain === 'staging') {
        url = 'https://school-experience-staging.azurewebsites.net'
    }

    return originalFn(url, options)
})

Cypress.Commands.add('navigateToSchoolSearchPage', () => {
    cy.get('.govuk-header__container').should('be.visible')
    cy.get('.govuk-footer').should('be.visible')
    cy.get('.govuk-button').click()
    cy.get('.govuk-se-masthead').should('be.visible')
    cy.get('.govuk-button').click()
    cy.get('.govuk-fieldset__heading').should('contain', 'Find school experience')
})

Cypress.Commands.add('searchSchoolsByLocation', function () {
    if (Cypress.browser.name === 'chrome') {
        // use current location services
        cy.get('.school-search-form__coords-request')
        .click()
        .wait(3000)
        // check latitude/longitude post location services are populated
        cy.get('#latitude').should((el) => {
            expect(el.val()).to.not.be.empty;
        })
    } else {
        cy.get('#location')
            .click()
            .type(this.user[0].address.city)
    }
    cy.get('#distance').select('10')
    cy.get('input[type="submit"]').click()
})

Cypress.Commands.add('educationPhasesFiltering', () => {
    cy.get('#results').find('.govuk-heading-l')
        .first()
        .as('results')
    cy.get('@results').should('contain', 'Manchester Communication Academy')
    cy.get('#phases_3')
        .check()
        .wait(1000)
    cy.get('@results').should('contain', 'Manchester Communication Academy')
    cy.get('#phases_3')
        .uncheck()
        .wait(1000)
    cy.get('#phases_2')
        .check()
        .wait(1000)
    cy.get('@results').should('contain', 'Barlow Hall Primary School')
    cy.get('#phases_2')
        .uncheck()
        .wait(1000)
})

Cypress.Commands.add('subjectFiltering', () => {
    cy.get("#subjects_27")
        .check()
        .wait(1000)
    cy.get('@results').should('contain', 'Chorlton High School')        
    cy.get("#subjects_27")
        .uncheck()
        .wait(1000)
    cy.get('@results').should('contain', 'Manchester Communication Academy')

})

Cypress.Commands.add('checkResultsSorting', () => {
    cy.get('#_order_container')
        .find('#order')
        .as('order')
    cy.get('@order')
        .select('name')
        .wait(1000)
    cy.get('@results').should('contain', 'Altrincham Grammar School for Girls')
    cy.get('@order')
        .select('distance')
        .wait(1000)
    cy.get('@results').should('contain', 'Manchester Communication Academy')   
    // click to view school details     
    cy.get('#results')
        .find('.govuk-button')
        .first()
        .click()
        .wait(1000)
})

Cypress.Commands.add('checkSchoolProfilePage', () => {
    cy.get('.govuk-heading-l').should('contain', 'Manchester Communication Academy')
    cy.get('#candidate-school-profile').should('be.visible')
    cy.get('.govuk-button')
        .click()
        .wait(1000)
})

Cypress.Commands.add('placementPreferencePageErrors', function () {
    const placementErrorList = [
        'Enter your availability',
        'Enter what you want to get out of a placement'
    ]

    cy.get('input[type="submit"]')
        .click()
        .wait(1000)
    cy.get('#error-summary-title').should('be.visible')
        .and('contain', 'There is a problem')
    cy.get('ul.govuk-error-summary__list>li').each(($el, i) => {
        expect($el.get(0).innerText).to.contain(placementErrorList[i])
    })
})

Cypress.Commands.add('checkRequestExperiencePage', function () {
    cy.get('#placement-preference').should('be.visible')
    cy.get('.govuk-heading-l').should('contain', 'Request school experience')

    cy.get('#candidates_registrations_placement_preference_availability')
        .type(this.user[0].availability)
    cy.get('#candidates_registrations_placement_preference_objectives')
        .type(this.user[0].reason)
    cy.get('input[type="submit"]')
        .click()
        .wait(1000)
})


Cypress.Commands.add('contactDetailsError', function () {
    const contactErrorList = [
        'Enter your full name',
        'Enter your telephone number',
        'Enter your email address',
        'Enter your building',
        'Enter your postcode'
    ]

    cy.get('input[type="submit"]')
        .click()
        .wait(1000)
    cy.get('#error-summary-title').should('be.visible')
        .and('contain', 'There is a problem')
    cy.get('ul.govuk-error-summary__list>li').each(($el, i) => {
        expect($el.get(0).innerText).to.contain(contactErrorList[i])
    })
})

Cypress.Commands.add('fillContactDetails', function () {
    cy.get('#main-content').should('be.visible')
    cy.get('.govuk-heading-l').should('contain', 'Enter your contact details')
    cy.get('#candidates_registrations_contact_information_full_name')
        .type(this.user[0].name)
    cy.get('#candidates_registrations_contact_information_phone')
        .type(this.user[0].number)
    cy.get('#candidates_registrations_contact_information_email')
        .type(this.user[0].email)
    cy.get('#candidates_registrations_contact_information_building')
        .type(this.user[0].address.street)
    cy.get('#candidates_registrations_contact_information_town_or_city')
        .type(this.user[0].address.city)
    cy.get('#candidates_registrations_contact_information_county')
        .type(this.user[0].address.county)
    cy.get('#candidates_registrations_contact_information_postcode')
        .type(this.user[0].address.postcode)
    cy.get('input[type="submit"]')
        .click()
        .wait(1000)
})

Cypress.Commands.add('subjectsErrors', function () {
    // candidate subject page
    // assert against error when no subjects are chosen
    cy.get('#main-content').should('be.visible')
    cy.get('.govuk-heading-l').should('contain', 'We need some more details')

    const subjectErrorList = [
        'Select a degree stage',
        'Select a subject',
        'Select a teaching stage',
        'Select a subject'
    ]

    cy.get('input[type="submit"]')
        .click()
        .wait(1000)
    cy.get('#error-summary-title').should('be.visible')
        .and('contain', 'There is a problem')
    cy.get('ul.govuk-error-summary__list>li').each(($el, i) => {
        expect($el.get(0).innerText).to.contain(subjectErrorList[i])
    })
})

Cypress.Commands.add('chooseSubjects', function () {
    // choose subjects details
    cy.get('#candidates_registrations_subject_preference_degree_stage_final_year')
        .check()
    cy.get('#candidates_registrations_subject_preference_degree_subject')
        .select(this.user[0].subjects.studied)
    cy.get('#candidates_registrations_subject_preference_teaching_stage_im_very_sure_and_think_ill_apply')
        .check()
    cy.get('#candidates_registrations_subject_preference_subject_first_choice')
        .select(this.user[0].subjects.firstChoice)
    cy.get('#candidates_registrations_subject_preference_subject_second_choice')
        .select(this.user[0].subjects.secondChoice)
    cy.get('input[type="submit"]')
        .click()
        .wait(1000)
})

Cypress.Commands.add('dbsErrorCheck', () => {
    cy.get('.govuk-heading-l').should('contain', 'Background and security checks')

    // check error message when not selecting any DBS check options
    cy.get('input[type="submit"]')
        .click()
        .wait(1000)
    cy.get('ul.govuk-error-summary__list>li').should('contain', 'Select an option')
})

Cypress.Commands.add('dbsCheckContinue', () => {
    cy.get('#candidates_registrations_background_check_has_dbs_check_true').click()
    cy.get('input[type="submit"]')
        .click()
        .wait(1000)
})

Cypress.Commands.add('applicationReviewErrors', function () {
    // application review page
    const inputFieldsList = [
        this.user[0].name,
        this.user[0].fullAddress,
        this.user[0].number,
        this.user[0].email,
        'Manchester Communication Academy',
        this.user[0].availability,
        this.user[0].reason,
        'Final year',
        this.user[0].subjects.studied,
        'I’m very sure and think I’ll apply',
        this.user[0].subjects.firstChoice,
        this.user[0].subjects.secondChoice,
        'Yes'   
    ]
    // check all inpout fields
    cy.get('dd.govuk-summary-list__value').innerText
    cy.get('dd.govuk-summary-list__value').each(($el, i) => {
        expect($el.get(0).innerText).to.contain(inputFieldsList[i])
    })
})

Cypress.Commands.add('applicationReviewContinue', () => {
    cy.get('#candidates_registrations_privacy_policy_acceptance').check()   
    cy.get('input[type="submit"]')
        .click()
        .wait(1000)
    
})

Cypress.Commands.add('confirmEmailPage', function () {
    cy.get('.govuk-list--bullet')
        .eq(0)
        .should('contain', this.user[0].email)
    cy.get('input[type="submit"]').should('be.visible')
})