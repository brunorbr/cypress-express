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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('removeTaskByName', (taskname) => {
    cy.request({
        url: 'http://localhost:3333/helper/tasks',
        method: 'DELETE',
        body: {name: taskname}
    }).then(response => {
        expect(response.status).to.eq(204)
    })
})

Cypress.Commands.add('addTaskByAPI', (task) => {
    cy.request({
        url: 'http://localhost:3333/tasks',
        method: 'POST',
        body: task
    }).then(response => {
        expect(response.status).to.eq(201)
    })
})

Cypress.Commands.add('createTask', (taskName = '') => {
    cy.visit('http://localhost:8080')
    cy.get('input[placeholder="Add a new Task"]').as('inputTask')
    if(taskName !== ''){
        cy.get('@inputTask')
            .type(taskName)
    }
    cy.contains('button', 'Create')
        .click()
})

Cypress.Commands.add('isRequired', (targetMessage) => {
    cy.get('@inputTask')
    .invoke('prop', 'validationMessage')
    .should((text) => {
        expect(
            targetMessage
        ).to.eq(text)
    })  
})

Cypress.Commands.add('performTaskAction', (task, action) => {
    var button;
    if(action === 'delete'){
        button = 'button[class*="ItemDelete"]';
    } else if (action === 'update'){
        button = 'button[class*="ItemToggle"]';
    }
    cy.contains('p', task.name)
        .parent()
        .find(button)
        .click()
})