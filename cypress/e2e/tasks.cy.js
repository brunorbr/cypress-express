/// <reference types="cypress" />

describe('tasks', ()=> {
    
    it('should register a new task', ()=> {
        cy.request({
            url: 'http://localhost:3333/helper/tasks',
            method: 'DELETE',
            body: {name:'Botar na tomada se acabar a pilha'}
        }).then(response => {
            expect(response.status).to.eq(204)
        })
        cy.visit('http://localhost:8080')
        cy.get('input[placeholder="Add a new Task"]')
            .type("Botar na tomada se acabar a pilha")
        //button[contains(text(), "Create")]
        cy.contains('button', 'Create')
            .click()
        /*cy.get('main div p')
            .should('be.visible')
            .should('have.text', 'Botar na tomada se acabar a pilha')*/
        cy.contains('main div p', 'Botar na tomada se acabar a pilha')
            .should('be.visible')
    })

})