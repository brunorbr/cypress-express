/// <reference types="cypress" />

describe('tasks', ()=> {
    
    it('should register a new task', ()=> {
        const creationTaskName = "Te amar de janeiro a janeiro"
        cy.removeTaskByName(creationTaskName)
        cy.createTask(creationTaskName)
        cy.contains('main div p', creationTaskName)
            .should('be.visible')
    })

    it('should not allow duplicated tasks', ()=> {
        const duplicatedTask = {
            name: 'Tentar te encontrar tanto pra dizer meu amor tudo bem',
            is_done: false
        }
        cy.removeTaskByName(duplicatedTask.name)
        cy.addTaskByAPI(duplicatedTask)
        cy.createTask(duplicatedTask.name)
        cy.get('.swal2-html-container')
            .should('be.visible')
            .should('have.text', "Task already exists!")
    })
    
    it('should display error message for empty field', () => {
        cy.createTask()
        cy.isRequired('This is a required field')
    })

})