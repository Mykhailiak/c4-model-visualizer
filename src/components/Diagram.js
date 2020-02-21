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
    const selectedPath = (props.selectedLevel || '').split(':');
    const selectedLevel = selectedPath[selectedPath.length - 1];

    this.diagram.update(context, selectedPath, selectedLevel);
  }

  render() {
    return (
      <div id="cy" />
    );
  }
}
