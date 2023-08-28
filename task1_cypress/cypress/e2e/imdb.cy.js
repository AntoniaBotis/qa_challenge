describe('IMDB Test', () => {

    beforeEach(() => {

        const baseUrl = Cypress.config('baseUrl');
        cy.visit(baseUrl);

        Cypress.on('uncaught:exception', () => {
            // Returning false prevents Cypress from failing the test
            return false;
        });
    });

    it('1st - Nicolas Cage Search', () => {
        cy.get('input[placeholder="Search IMDb"]')
            .type('Nicolas Cage')
            .type('{enter}');


        cy.url().should('include', 'find');
        cy.url().should('include', 'Nicolas');
        cy.url().should('include', 'Cage');

        cy.contains('div', 'Nicolas Cage')
            .contains('div', 'Actor')
            .click();

        cy.get('h1').should('contain', 'Nicolas Cage')

        cy.contains('li', 'Upcoming')
            .click();

        cy.contains('div', 'Upcoming')
            .nextAll()
            .find('*[class="ipc-metadata-list-summary-item__c"]:contains("Completed"):first')
            .find('li:has(a)')
            .first()
            .click({
                force: true
            });

    });

    it('2nd - Top Box Office 2nd Rating', () => {
        cy.get('label[id="imdbHeader-navDrawerOpen"]')
            .click();

        cy.contains('span', 'Movies')
            .click();

        cy.contains('span', 'Top Box Office')
            .click();

        cy.get('h1')
            .should('contain', 'Top Box Office')

        cy.get('ul')
            .nextAll()
            .find('button:contains("Rate")')
            .eq(1)
            .click()
            .wait(3000);

        cy.get('button[class*="ipc-rating-prompt__rate-button"')
            .should('have.attr', 'disabled');

        cy.get('button[aria-label="Rate 5"')
            .click({
                force: true
            });

        cy.get('div[class="ipc-rating-display__rating"]')
            .should('contain', '5');

        cy.get('button[class*="ipc-rating-prompt__rate-button"')
            .should('not.have.attr', 'disabled');

        cy.get('button[class*="ipc-rating-prompt__rate-button"')
            .click();

    });

    it('3rd - Breaking Bad Danny Trejo Photos', () => {
        cy.get('label[id="imdbHeader-navDrawerOpen"]')
            .click();

        cy.contains('span', 'TV Shows')
            .click();

        cy.contains('span', 'Top 250 TV Shows')
            .click();

        cy.get('h1')
            .should('contain', 'Top 250 TV Shows')

        cy.contains('a', 'Breaking Bad')
            .click();

        cy.get('h1')
            .should('contain', 'Breaking Bad')

        cy.contains('h3', 'Photos')
            .click()
            .wait(3000);

        cy.url().should('include', 'mediaviewer');

        cy.get('a[data-testid="mv-gallery-button"]')
            .click()
            .wait(3000);

        cy.contains('a', 'Danny Trejo')
            .click();

        cy.get('span[id="current_filter"]').should('contain', 'Danny Trejo')

    })

})