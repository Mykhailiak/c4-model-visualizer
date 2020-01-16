export default (input = {}) => {
  if (!input.context) {
    throw new SyntaxError('Context is mandatory!');
  }

  return input;
};
