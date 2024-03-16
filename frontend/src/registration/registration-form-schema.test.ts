import {
  hasLowerCase,
  hasSpecialCharacter,
  hasUpperCase,
} from './registration-form-schema.ts';

describe('registration-form-schema', () => {
  describe('hasLowerCase', () => {
    it.each([
      [true, 'a'],
      [true, 'TEST%@ a ASD'],
      [false, ''],
      [false, 'A'],
      [false, 'TEST%@ ASD'],
    ])('should return %s for %s', (expected: boolean, input: string) => {
      expect(hasLowerCase(input)).toEqual(expected);
    });
  });

  describe('hasUpperCase', () => {
    it.each([
      [true, 'A'],
      [true, 'test%@ A asd'],
      [false, ''],
      [false, 'a'],
      [false, 'test%@ asd'],
    ])('should return %s for %s', (expected: boolean, input: string) => {
      expect(hasUpperCase(input)).toEqual(expected);
    });
  });

  describe('hasSpecialCharacter', () => {
    it.each([
      [true, '!'],
      [true, '@'],
      [true, '#'],
      [true, '$'],
      [true, '%'],
      [true, '^'],
      [true, '&'],
      [true, '*'],
      [true, '('],
      [true, ')'],
      [true, '-'],
      [true, '='],
      [true, '+'],
      [true, '`'],
      [true, '~'],
      [true, '<'],
      [true, '>'],
      [true, '/'],
      [true, '\\'],
      [true, ','],
      [true, '.'],
      [true, ';'],
      [true, ':'],
      [true, '"'],
      [true, "'"],
      [true, '|'],
      [true, '?'],
      [true, '/'],
      [true, '£'],
      [true, '§'],
      [true, ' '],
      [true, 'test%@ asd'],
      [false, ''],
      [false, 'noSpecialCharacter'],
    ])('should return %s for %s', (expected: boolean, input: string) => {
      expect(hasSpecialCharacter(input)).toEqual(expected);
    });
  });
});
