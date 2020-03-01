import React, { useEffect, useRef, memo } from 'react';
import DiagramVisualizer from 'c4-model-visualizer-core/diagram';
import { getSuitableLevelKey, levels } from './LevelSelector';

const Diagram = ({
  selectLevel,
  data,
  selectedLevel,
}) => {
  const containerId = 'cy';
  const diagram = useRef(null);

  useEffect(() => {
    diagram.current = new DiagramVisualizer(
      levels,
      getSuitableLevelKey,
      {
        containerId,
        onClick: (e) => {
          const { selectionId, hasChild } = e.target.data();

          if (hasChild) {
            selectLevel(selectionId);
          }
        },
      },
    );
  }, [selectLevel]);

  useEffect(() => {
    const { context } = data;
    const selectedPath = (selectedLevel || '').split(':');
    const finalSelectedPath = selectedPath[selectedPath.length - 1];

    diagram.current.update(context, selectedPath, finalSelectedPath);
  }, [diagram, data, selectedLevel]);

  return (
    <div id={containerId} />
  );
};

export default memo(Diagram);
