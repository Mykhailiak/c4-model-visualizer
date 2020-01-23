/**
 * Validation parsed JSON according to C4 rules
 *
 * @param {object} [input={}]
 * @returns {object}
 */
export default (input = {}) => {
  if (!input.context) {
    throw new SyntaxError('Context is mandatory!');
  }

  return input;
};
