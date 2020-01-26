import {
  parse,
  validate,
  parseAsync,
} from '../utils/yaml-parser';

it('returns false if `input` does not exist or does not have `:` char', () => {
  expect(validate('')).toBeFalsy();
  expect(validate('text')).toBeFalsy();
  expect(validate('key: value')).toBeTruthy();
});

it('throws an error if input does not pass validation', () => {
  expect(() => parse('')).toThrow(SyntaxError);
  expect(() => parse('text')).toThrow(SyntaxError);
});

it('converts one-level YAML input to parsed JSON', () => {
  const input = 'name: Alex';

  expect(parse(input)).toEqual({ name: 'Alex' });
});

it('converts complex YAML into to parsed JSON', () => {
  const input = `
context:
  order-support-system:
    name: Mail Order Support System
    description: Automates processing of imaged mail orders
    relations:
      to:
        order-processing-system: posts Orders
  order-processing-system:
    name: Order processing
    caption: External
    description: Existing Order processing system
    container:
      database:
        name: DB
        description: Main DB
  `;
  const result = {
    context: {
      'order-support-system': {
        name: 'Mail Order Support System',
        description: 'Automates processing of imaged mail orders',
        relations: {
          to: {
            'order-processing-system': 'posts Orders',
          },
        },
      },
      'order-processing-system': {
        name: 'Order processing',
        caption: 'External',
        description: 'Existing Order processing system',
        container: {
          database: {
            name: 'DB',
            description: 'Main DB',
          },
        },
      },
    },
  };

  expect(parse(input)).toStrictEqual(result);
});

it('resolves input by async maner', () => {
  const input = 'name: Alex';

  return expect(parseAsync(input)).resolves.toStrictEqual({ name: 'Alex' });
});

it('rejects input by async maner', () => {
  const input = 'text';

  return expect(parseAsync(input)).rejects.toThrow(SyntaxError);
});
