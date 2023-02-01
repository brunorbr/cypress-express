/// <reference types="cypress" />

describe('tasks', ()=> {

    context('register', () => {
    
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

    context('update', () => {
        it('should finish a task', () => {
            const taskToBeFinished = 
            {
                name:'Encher a cara e falar mal das mesmas pessoas', 
                is_done: false
            }
            cy.removeTaskByName(taskToBeFinished.name)
            cy.addTaskByAPI(taskToBeFinished)
            cy.visit('http://localhost:8080')
            cy.performTaskAction(taskToBeFinished, 'update')
            cy.contains('p', taskToBeFinished.name)
                .should('have.css', 'text-decoration-line', 'line-through')
        })
    })

    context('delete', () => {
        it('should delete a task', () => {
            const taskToDelete = 
            {
                name:'Ser essa sobre o nosso amor e sobre o dia em que ce foi embora', 
                is_done: false
            }
            cy.removeTaskByName(taskToDelete.name)
            cy.addTaskByAPI(taskToDelete)
            cy.visit('http://localhost:8080')
            cy.performTaskAction(taskToDelete, 'delete')
            cy.contains('p', taskToDelete.name)
                .should('not.exist')
        })
    })    
})