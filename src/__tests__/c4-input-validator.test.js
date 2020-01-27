import validate from '../utils/c4-input-validator';

it('returns input if input passed validation', () => {
  const o1 = { context: {} };
  const o2 = { context: { key: 'prop' } };

  expect(validate(o1)).toEqual(o1);
  expect(validate(o2)).toEqual(o2);
});

it('throws an error if `context` does not exist', () => {
  expect(() => validate({})).toThrow(SyntaxError);
  expect(() => validate({ key: 'prop' })).toThrow(SyntaxError);
});
