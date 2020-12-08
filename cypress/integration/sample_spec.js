describe('My First Test', () => {
  it('clicks the button "Add Project"', () => {
    cy.visit('http://localhost:4200/ema')

    cy.contains('Add Project').click()
    cy.contains('Save').click()
  })

  it('clicks the button "Employees"', () => {
    cy.contains('Employees').click()

    // Should be on a new URL which includes '/commands/actions'
    cy.url().should('include', '/employees')
    cy.get('#search-text').type('Ali').should('have.value', 'Ali')
    cy.get('#search-button').click()
    cy.get('table').get('tr').should('have.length',3)
/*    cy.get('table').then(table => {
      table.get('tr').should('have.length',3);
      table.get('tr')
    })*/
    cy.get('tbody > :nth-child(1) > :nth-child(2)').contains('Ali')
    cy.get('tr').eq(1).children().next().contains('Ali')
    cy.get('tr').find('td').contains('Ali')
    cy.get('td').eq(1).contains('Ali')
    cy.get('#empl-details-0').click()
    cy.get('#firstName').type('AliMohamed Ali Mohamed Alihhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh')
    cy.get('#firstName').clear()
  })
})
