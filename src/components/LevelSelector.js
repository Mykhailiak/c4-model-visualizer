import React, { useState } from 'react';
import { TreeSelect } from 'antd';

export const levels = ['context', 'container', 'component', 'class'];
export const getSuitableLevelKey = (context = {}, level = 0) => {
  const key = levels[level];

  return Object.prototype.hasOwnProperty.call(context, key) && key;
};

const rootLevel = levels[0];
const createDataMap = (data = {}, level = 0, path = []) => (
  Object.entries(data[levels[level]] || {})
    .reduce((acc, [key, element]) => {
      const { name } = element;
      const nextLevel = level + 1;
      const currentPath = path.concat(key);

      if (getSuitableLevelKey(element, nextLevel)) {
        acc.push({
          key,
          value: currentPath.join(':'),
          title: `${name} - ${levels[nextLevel]}`,
          children: createDataMap(element, nextLevel, currentPath),
        });
      }

      return acc;
    }, [])
);
const computeLevelsList = (data, key) => {
  const title = 'Context';

  return [
    {
      title,
      key,
      value: key,
      children: createDataMap(data, 0, [key]),
    },
  ];
};

export default function LevelSelector({ parsedYaml, selectLevel }) {
  const [value, setValue] = useState(rootLevel);
  const treeData = computeLevelsList(parsedYaml, rootLevel);
  const onChangeHandler = (v) => {
    setValue(v);
    selectLevel(v);
  };

  return (
    <TreeSelect
      value={value}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      treeData={treeData}
      placeholder="Select level"
      onChange={onChangeHandler}
      treeDefaultExpandAll
      className="context-selection"
    />
  );
}
