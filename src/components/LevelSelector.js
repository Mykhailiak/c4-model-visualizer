import React, { useState } from 'react';
import { TreeSelect } from 'antd';

export const levels = ['context', 'container', 'component', 'class'];

const createDataMap = (data = {}, level = 0) => (
  Object.values(data[levels[level]] || [])
    .reduce((acc, element) => {
      const { name } = element;
      const nextLevel = level + 1;

      if (levels.some((l) => Object.prototype.hasOwnProperty.call(element, l))) {
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

export default function LevelSelector({ parsedYaml }) {
  const [value, setValue] = useState();
  const treeData = createDataMap(parsedYaml);
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
