import React, { Component } from 'react';
import DiagramVisualizer from 'c4-model-visualizer-core/diagram';
import { getSuitableLevelKey, levels } from './LevelSelector';

export default class Diagram extends Component {
  componentDidMount() {
    const { props } = this;
    this.diagram = new DiagramVisualizer(
      levels,
      getSuitableLevelKey,
      {
        containerId: 'cy',
        onClick: (e) => {
          const { selectionId, hasChild } = e.target.data();

          if (hasChild) {
            props.selectLevel(selectionId);
          }
        },
      },
    );
  }

  componentDidUpdate() {
    const { props } = this;
    const { context } = props.data;
    this.selectedPath = (props.selectedLevel || '').split(':');
    const elements = this.computeElements(context);

    this.diagram.update(elements);
    this.fitViewport();
  }

  fitViewport() {
    const destination = this.selectedPath[this.selectedPath.length - 1];

    this.diagram.fitViewport(destination);
  }

  computeElements(context = {}, parent, level = 0, selectionPath = levels[0]) {
    return this.diagram.computeElements(context, parent, level, this.selectedPath, selectionPath);
  }

  render() {
    return (
      <div id="cy" />
    );
  }
}
