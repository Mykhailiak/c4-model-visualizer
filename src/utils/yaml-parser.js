const EMPTY_STRING = '';

/**
 * Basic validation of YAML value
 *
 * @param {string} input
 * @returns {boolean}
 */
export const validate = (input) => (
  [
    input,
    input.includes(':'),
  ].every(Boolean)
);

/**
 * Parse YAML into JSON
 *
 * @param {string} [input=EMPTY_STRING]
 * @returns {object}
 */
export const parse = (input = EMPTY_STRING) => {
  try {
    if (!validate(input)) {
      throw new Error('Invalid value');
    }

    const accumulator = {};
    const parts = input
      .replace(/^\s/, EMPTY_STRING)
      .replace(/\s$/, EMPTY_STRING)
      .replace(/^\s+$/gm, EMPTY_STRING)
      .split(/\n/)
      .filter(Boolean);

    /* eslint-disable no-restricted-syntax */
    for (const [index, row] of parts.entries()) {
      const [key, value] = row.split(':');
      const nestedItem = key.startsWith(' ');

      if (nestedItem) {
        continue; // eslint-disable-line no-continue
      }

      if (!value) {
        const childElements = parts.slice(index + 1);
        const initialChildsBarrier = childElements.findIndex((e) => /^\S/.test(e));
        const computedChildElementsBarrier = initialChildsBarrier === -1
          ? childElements.length
          : initialChildsBarrier;

        accumulator[key] = parse(
          childElements
            .slice(0, computedChildElementsBarrier)
            .join('\n')
            .replace(/^\s{2}/gm, EMPTY_STRING),
        );
      } else {
        accumulator[key] = value.slice(1);
      }
    }
    /* eslint-enable no-restricted-syntax */

    return accumulator;
  } catch (e) {
    throw new SyntaxError(e.message);
  }
};

/**
 * Async implementation of `parse` function
 *
 * @param {...any}
 * @returns {promise}
 */
export const parseAsync = (...args) => new Promise((resolve, reject) => {
  try {
    const data = parse(...args);

    resolve(data);
  } catch (e) {
    reject(e);
  }
});
