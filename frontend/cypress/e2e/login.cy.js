/// <reference types="cypress" />
import { createRandomString } from '../utils/create-random-string.js';

context('Login', () => {
  it('should show error on invalid email/password', () => {
    cy.visit('/');

    const randomEmail = `${createRandomString(16)}@email.com`;
    cy.get('input:first').type(randomEmail);
    cy.get('input[type=password]').type('wrong-password');
    cy.get('button[type=submit]').click();

    cy.contains('Invalid email or password');
  });

  it('should successfully login', () => {
    cy.registerNewUser().then(({ email, password }) => {
      cy.visit('/');

      cy.get('input:first').type(email);
      cy.get('input[type=password]').type(password);
      cy.get('button[type=submit]').click();

      cy.get('nav').contains(`Hi, ${email}`);
    });
  });
});
