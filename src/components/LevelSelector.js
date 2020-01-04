import React, { useState } from 'react';
import { TreeSelect } from 'antd';

const levelsKey = ['context', 'container', 'component', 'class'];

const createDataMap = (data = {}, level = 0) => {
  const out = [];

  Object.values(data[levelsKey[level]] || []).forEach((v) => {
    const key = Math.random();

    out.push({
      key,
      title: v.name,
      value: key,
      children: createDataMap(v, level + 1),
    });
  });

  return out;
};

export default function LevelSelector({ parsedYaml }) {
  const [value, setValue] = useState();
  const treeData = createDataMap(parsedYaml);

  return (
    <TreeSelect
      value={value}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      treeData={treeData}
      placeholder="Please select context"
      treeDefaultExpandAll
      onChange={setValue}
      className="context-selection"
    />
  );
}
