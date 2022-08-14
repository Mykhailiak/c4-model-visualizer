export default function validateParsedContent(input = {}) {
  if (!input.context) {
    throw new SyntaxError('Context is mandatory!');
  }

  return input;
}
