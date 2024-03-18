/// <reference types="cypress" />
context('Dashboard', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const createTodoItem = (text) => {
    cy.get('textarea:required').type(text);
    cy.get('button[type=submit]').click();
    cy.contains('Todo item successfully created');
  };

  const assertOneTodoItem = todoContent => {
    const todoItems = cy.get('.todo-item');
    todoItems.should('have.length', 1);
    todoItems.within(() => {
      cy.contains(todoContent);
    });
  };

  it('should successfully logout', () => {
    cy.registerNewUser().then(({ email }) => {
      cy.get('nav').contains(`Hi, ${email}`);

      cy.contains('Logout').click();

      cy.location('pathname').should('eq', '/login');

      // check if going back to the home page redirects to login
      cy.visit('/');
      cy.location('pathname').should('eq', '/login');
    });
  });

  it('should create a todo item', () => {
    cy.registerNewUser().then(() => {
      createTodoItem('New todo');
      assertOneTodoItem('New todo');
    });
  });

  it('should create a todo item, refresh the page and still have it', () => {
    cy.registerNewUser().then(() => {
      createTodoItem('New todo');
      cy.reload();
      assertOneTodoItem('New todo');
    });
  });

  it('should remove a todo item', () => {
    cy.registerNewUser().then(() => {
      createTodoItem('New todo');
      cy.get('.todo-item').within(() => {
        cy.get('[data-testid="delete-icon"]').click();
      });
      cy.contains('Todo item successfully deleted!');
      cy.get('.todo-item').should('not.exist');
    });
  });

  it('should load all todo items (pagination)', () => {
    cy.registerNewUser().then(() => {
      const todosCount = 15;
      for (let i = 1; i <= todosCount; i++) {
        createTodoItem(`New todo ${i}`);
      }

      cy.reload();

      cy.scrollTo('bottom');
      cy.get('.todo-item').should('have.length', todosCount);
    });
  });
});
