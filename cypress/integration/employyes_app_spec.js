describe("The Employees App Home Page", () => {
  it('successfully loads', () => {

    // mock the response
    cy.intercept('POST', 'http://localhost:8010/api/v1/employees/search', { fixture: 'employees.json' }).as('getEmployees')

    //cy.wait('@getEmployees')
    cy.visit('/ema/employees')
    //cy.route()
    //cy.visit('/')
  })
})
