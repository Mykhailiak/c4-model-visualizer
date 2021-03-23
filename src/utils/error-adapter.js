/* eslint-disable import/prefer-default-export */
const rules = [
  {
    pattern: /Can not create edge `\w+` with nonexistant target `(\w+)`/,
    handler(input) {
      return `"${this.pattern.exec(input)[1]}" identifier does not exist`;
    },
  },
];

export const messageBuilder = (input) => {
  const rule = rules.find((r) => r.pattern.test(input));

  if (!rule) {
    return 'Unknown error';
  }

  return rule.handler(input);
};
