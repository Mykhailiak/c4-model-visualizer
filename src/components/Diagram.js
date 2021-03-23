import React, { useEffect, useRef, memo } from 'react';
import DiagramVisualizer from './DiagramVisualizer';
import { getSuitableLevelKey, levels } from './LevelSelector';

const Diagram = ({ selectLevel, data, selectedLevel, onUpdateError }) => {
  const containerId = 'cy';
  const diagram = useRef(null);
  const createDiagramVisualizerInstance = () =>
    new DiagramVisualizer(levels, getSuitableLevelKey, {
      containerId,
      onClick: (e) => {
        const { selectionId, hasChild } = e.target.data();

        if (hasChild) {
          selectLevel(selectionId);
        }
      },
    });

  useEffect(() => {
    diagram.current = createDiagramVisualizerInstance();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const { context } = data;

    if (!selectedLevel) return;

    const selectedPath = (selectedLevel || '').split(':');
    const finalSelectedPath = selectedPath[selectedPath.length - 1];

    try {
      diagram.current.update(context, selectedPath, finalSelectedPath);
    } catch (e) {
      onUpdateError(e);
      diagram.current = createDiagramVisualizerInstance();
    }
    // eslint-disable-next-line
  }, [diagram, data, selectedLevel]);

  return <div id={containerId} />;
};

export default memo(Diagram);
