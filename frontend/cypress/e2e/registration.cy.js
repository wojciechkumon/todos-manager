/// <reference types="cypress" />
import { createRandomString } from '../utils/create-random-string.js';

context('Registration', () => {
  it('should successfully register', () => {
    cy.registerNewUser().then(({ email }) => {
      cy.get('nav').contains(`Hi, ${email}`);
    });
  });

  it('should fail registration on weak password', () => {
    cy.visit('/register');

    const randomEmail = `${createRandomString(16)}@email.com`;
    const weakPassword = 'Password123';

    cy.get('input:first').type(randomEmail);
    cy.get('input[type=password]').type(weakPassword);
    cy.get('button[type=submit]').click();

    cy.contains('Password must contain at least one special character');
  });
});
