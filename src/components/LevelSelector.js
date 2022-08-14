import React, { memo } from 'react';
import { TreeSelect } from 'antd';

export const levels = ['context', 'container', 'component', 'class'];
export const getSuitableLevelKey = (context = {}, level = 0) => {
  const key = levels[level];

  return Object.prototype.hasOwnProperty.call(context, key) && key;
};
export const rootLevel = levels[0];

export const createDataMap = (data = {}, level = 0, path = []) =>
  Object.entries(data[levels[level]] || {}).reduce((acc, [key, element]) => {
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
  }, []);
export const computeLevelsList = (data, key) => {
  const title = 'Context';

  return rootLevel in data
    ? [
        {
          title,
          key,
          value: key,
          children: createDataMap(data, 0, [key]),
        },
      ]
    : [];
};

function LevelSelector({ parsedYaml, selectLevel, value }) {
  const treeData = computeLevelsList(parsedYaml, rootLevel);

  return (
    <TreeSelect
      value={value}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      treeData={treeData}
      placeholder="Select level"
      onChange={selectLevel}
      className="context-selection"
      treeDefaultExpandAll
    />
  );
}

export default memo(LevelSelector);
