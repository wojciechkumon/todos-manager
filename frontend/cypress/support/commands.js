/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import { createRandomString } from '../utils/create-random-string.js';

Cypress.Commands.add('registerNewUser', () => {
  cy.visit('/register');

  const randomEmail = `${createRandomString(16)}@email.com`;
  const strongPassword = 'P@ssw0rd';

  cy.get('input:first').type(randomEmail);
  cy.get('input[type=password]').type(strongPassword);
  cy.get('button[type=submit]').click();

  return cy.wrap({ email: randomEmail, password: strongPassword });
});
