/// <reference types="cypress" />

describe('tasks', ()=> {
    
    it('should register a new task', ()=> {
        const creationTaskName = "Te amar de janeiro a janeiro"
        cy.request({
            url: 'http://localhost:3333/helper/tasks',
            method: 'DELETE',
            body: {name:creationTaskName}
        }).then(response => {
            expect(response.status).to.eq(204)
        })
        cy.visit('http://localhost:8080')
        cy.get('input[placeholder="Add a new Task"]')
            .type(creationTaskName)
        //button[contains(text(), "Create")]
        cy.contains('button', 'Create')
            .click()
        /*cy.get('main div p')
            .should('be.visible')
            .should('have.text', 'Botar na tomada se acabar a pilha')*/
        cy.contains('main div p', creationTaskName)
            .should('be.visible')
    })

    it('should not allow duplicated tasks', ()=> {
        const duplicatedTask = {
            name: 'Tentar te encontrar tanto pra dizer meu amor tudo bem',
            is_done: false
        }
        cy.request({
            url: 'http://localhost:3333/helper/tasks',
            method: 'DELETE',
            body: {name: duplicatedTask.name}
        }).then(response => {
            expect(response.status).to.eq(204)
        })
        cy.request({
            url: 'http://localhost:3333/tasks',
            method: 'POST',
            body: duplicatedTask
        }).then(response => {
            expect(response.status).to.eq(201)
        })
        cy.visit('http://localhost:8080')
        cy.get('input[placeholder="Add a new Task"]')
            .type(duplicatedTask.name)
        cy.contains('button', 'Create')
            .click()
        cy.get('.swal2-html-container')
            .should('be.visible')
            .should('have.text', "Task already exists!")
    })

})