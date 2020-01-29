import React from 'react';
import { shallow } from 'enzyme';
import { TreeSelect } from 'antd';
import LevelSelector, {
  getSuitableLevelKey,
  createDataMap,
} from '../components/LevelSelector';

it('returns needed key if it does exist in object', () => {
  expect(getSuitableLevelKey({ context: {} }, 0)).toEqual('context');
  expect(getSuitableLevelKey({ container: {} }, 1)).toEqual('container');
  expect(getSuitableLevelKey({ component: {} }, 2)).toEqual('component');
  expect(getSuitableLevelKey({ class: {} }, 3)).toEqual('class');
});

it('returns falsy value if there is no needed key on specified level', () => {
  expect(getSuitableLevelKey({ foo: {} }, 0)).toBeFalsy();
  expect(getSuitableLevelKey({ component: {} }, 1)).toBeFalsy();
  expect(getSuitableLevelKey({ container: {} }, 0)).toBeFalsy();
});

it('returns falsy value if context and/or level are/is not provided', () => {
  expect(getSuitableLevelKey()).toBeFalsy();
});

it('considers default value of the level as `0`', () => {
  expect(getSuitableLevelKey({ context: {} })).toEqual('context');
});

it('returns computed object which is used by `TreeSelect` component', () => {
  const parsedYaml = {
    context: {
      foo: {
        name: 'Foo',
        container: {
          foo1: {
            name: 'Foo1',
            component: {
              foo2: {
                name: 'Foo2',
              },
            },
          },
        },
      },
      bar: {
        name: 'Bar',
        container: {
          bar1: {
            name: 'Bar1',
            component: {
              bar2: {
                name: 'Bar2',
                class: {
                  bar3: {
                    name: 'Bar3',
                  },
                },
              },
            },
          },
        },
        relations: {
          to: {
            foo: 'Knows about foo',
          },
        },
      },
    },
  };
  const output = [{
    key: 'foo',
    value: 'foo',
    title: 'Foo - container',
    children: [{
      key: 'foo1',
      value: 'foo:foo1',
      title: 'Foo1 - component',
      children: [],
    }],
  },
  {
    key: 'bar',
    value: 'bar',
    title: 'Bar - container',
    children: [{
      key: 'bar1',
      value: 'bar:bar1',
      title: 'Bar1 - component',
      children: [{
        key: 'bar2',
        value: 'bar:bar1:bar2',
        title: 'Bar2 - class',
        children: [],
      }],
    }],
  }];

  expect(createDataMap(parsedYaml)).toEqual(output);
});

it('provides `TreeSelect` needed props', () => {
  const levelSelector = shallow(
    <LevelSelector
      parsedYaml={{ context: { foo: { name: 'John Doe' } } }}
      selectLevel={() => { }}
      value="context"
    />,
  );

  expect(levelSelector.find(TreeSelect).props()).toEqual({
    value: 'context',
    dropdownStyle: { maxHeight: 400, overflow: 'auto' },
    treeData: [{
      title: 'Context',
      key: 'context',
      value: 'context',
      children: [],
    }],
    placeholder: 'Select level',
    onChange: expect.any(Function),
    className: 'context-selection',
    treeDefaultExpandAll: true,
    transitionName: 'slide-up',
    choiceTransitionName: 'zoom',
  });
});

it('provides `TreeSelect` needed props (using nested elements)', () => {
  const parsedYaml = {
    context: {
      foo: {
        name: 'Foo',
        container: {
          foo1: {
            name: 'Foo1',
          },
        },
      },
      bar: {
        name: 'Bar',
        relations: {
          to: {
            foo: 'Knows about foo',
          },
        },
      },
    },
  };
  const value = 'context:foo';
  const levelSelector = shallow(
    <LevelSelector
      parsedYaml={parsedYaml}
      selectLevel={() => { }}
      value={value}
    />,
  );

  expect(levelSelector.find(TreeSelect).props()).toEqual({
    value,
    dropdownStyle: { maxHeight: 400, overflow: 'auto' },
    treeData:
      [{
        title: 'Context',
        key: 'context',
        value: 'context',
        children: [
          {
            title: 'Foo - container',
            key: 'foo',
            value: 'context:foo',
            children: [],
          },
        ],
      }],
    placeholder: 'Select level',
    onChange: expect.any(Function),
    className: 'context-selection',
    treeDefaultExpandAll: true,
    transitionName: 'slide-up',
    choiceTransitionName: 'zoom',
  });
});

it('returns an empty array if there is no data according to level and provided context', () => {
  expect(createDataMap({}, 0)).toEqual([]);
});
