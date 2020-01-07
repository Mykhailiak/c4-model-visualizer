import React, { useState } from 'react';
import { TreeSelect } from 'antd';

export const levels = ['context', 'container', 'component', 'class'];

const createDataMap = (data = {}, level = 0) => (
  Object.values(data[levels[level]] || [])
    .reduce((acc, element) => {
      const { name } = element;

      acc.push({
        value: name,
        key: name,
        title: name,
        children: createDataMap(element, level + 1),
      });

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
      placeholder="Please select context"
      onChange={onChangeHandler}
      className="context-selection"
    />
  );
}
