const EMPTY_STRING = '';

/**
 * Parse YAML into JSON
 *
 * @param {string} [input=EMPTY_STRING]
 * @returns {object}
 */
export const parse = (input = EMPTY_STRING) => {
  const accumulator = {};
  const parts = input
    .replace(/^\s/, EMPTY_STRING)
    .replace(/\s$/, EMPTY_STRING)
    .split(/\n/)

  for (const [index, row] of parts.entries()) {
    const [key, value] = row.split(':');
    const nestedItem = key.startsWith(' ');

    if (nestedItem) {
      continue;
    }

    if (!value) {
      const childElements = parts.slice(index + 1);
      const initialChildsBarrier = childElements.findIndex(e => /^\S/.test(e));
      const computedChildElementsBarrier = initialChildsBarrier === -1 ? childElements.length : initialChildsBarrier;

      accumulator[key] = parse(
        childElements
          .slice(0, computedChildElementsBarrier)
          .join('\n')
          .replace(/^\s{2}/gm, EMPTY_STRING),
      )
    } else {
      accumulator[key] = value.slice(1);
    }
  }

  return accumulator;
};
