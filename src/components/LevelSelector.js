import React, { useState } from 'react';
import { TreeSelect } from 'antd';

export const levels = ['context', 'container', 'component', 'class'];
export const getSuitableLevelKey = (context = {}, level = 0) => {
  const key = levels[level];

  return Object.prototype.hasOwnProperty.call(context, key) && key;
};

const createDataMap = (data = {}, level = 0) => (
  Object.values(data[levels[level]] || [])
    .reduce((acc, element) => {
      const { name } = element;
      const nextLevel = level + 1;

      if (getSuitableLevelKey(element, nextLevel)) {
        acc.push({
          value: name,
          key: name,
          title: `${name} - ${levels[nextLevel]}`,
          children: createDataMap(element, nextLevel),
        });
      }

      return acc;
    }, [])
);
const computeLevelsList = (...args) => {
  const contextKey = 'Context';

  return [
    {
      value: contextKey,
      key: contextKey,
      title: contextKey,
      children: createDataMap(...args),
    },
  ];
};

export default function LevelSelector({ parsedYaml }) {
  const [value, setValue] = useState();
  const treeData = computeLevelsList(parsedYaml);
  const onChangeHandler = (v) => setValue(v);

  return (
    <TreeSelect
      value={value}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      treeData={treeData}
      placeholder="Select level"
      onChange={onChangeHandler}
      className="context-selection"
    />
  );
}
