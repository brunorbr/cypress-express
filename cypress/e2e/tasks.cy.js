/// <reference types="cypress" />

describe('tasks', ()=> {

    let testData;


    before(() => {
        cy.fixture('tasks')
        .then(tasks => {
            testData = tasks
        })
    })

    context('register', () => {
    
        it('should register a new task', ()=> {
            const creationTaskName = "Dançar pra mim"
            cy.removeTaskByName(creationTaskName)
            cy.createTask(creationTaskName)
            cy.contains('main div p', creationTaskName)
                .should('be.visible')
        })

        it('should not allow duplicated tasks', ()=> {
            const duplicatedTask = testData.duplicate
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
            const taskToBeFinished = testData.finish
            cy.removeTaskByName(taskToBeFinished.name)
            cy.addTaskByAPI(taskToBeFinished)
            cy.visit('/')
            cy.performTaskAction(taskToBeFinished, 'update')
            cy.contains('p', taskToBeFinished.name)
                .should('have.css', 'text-decoration-line', 'line-through')
        })
    })

    context('delete', () => {
        it('should delete a task', () => {
            const taskToDelete = testData.delete
            cy.removeTaskByName(taskToDelete.name)
            cy.addTaskByAPI(taskToDelete)
            cy.visit('/')
            cy.performTaskAction(taskToDelete, 'delete')
            cy.contains('p', taskToDelete.name)
                .should('not.exist')
        })
    })    
})