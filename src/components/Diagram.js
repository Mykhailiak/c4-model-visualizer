import React, { Component } from 'react';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';

const style = [
  {
    selector: 'node',
    style: {
      width: 70,
      label: 'data(name)',
      shape: 'round-rectangle',
      'font-size': 5,
      'text-max-width': 70,
      'text-valign': 'center',
      'background-color': '#b3c2d8',
      'text-wrap': 'ellipsis',
    },
  },
  {
    selector: 'edge',
    style: {
      width: 4,
      'target-arrow-shape': 'triangle',
      'line-color': '#cdd6e4',
      'target-arrow-color': '#cdd6e4',
      'curve-style': 'straight',
      'line-cap': 'square',
    },
  },
];

cytoscape.use(dagre);

export default class Diagram extends Component {
  componentDidMount() {
    this.layout = { name: 'dagre' };
    this.cy = cytoscape({
      style,
      userZoomingEnabled: false,
      userPanningEnabled: false,
      boxSelectionEnabled: false,
      autounselectify: true,
      container: document.getElementById('cy'),
      elements: [],
      layout: this.layout,
    });
  }

  componentDidUpdate() {
    const { props, cy, layout } = this;
    const { context } = props.data;
    const elements = this.computeElements(context);

    cy.json({ elements });
    cy.ready(() => cy.layout(layout).run());
  }

  /* eslint-disable class-methods-use-this */
  computeElements(context = {}) {
    const keys = Object.keys(context);

    return keys
      .reduce((acc, key) => {
        const { relations: { to: targetsSource } = {} } = context[key];
        const validEdge = targetsSource && Object.keys(targetsSource).some((t) => keys.includes(t));
        const name = context[key].name || key;

        return acc.concat({ data: { name, id: key } }).concat(
          validEdge ? Object.keys(targetsSource).map((target) => ({
            data: { id: `${key}_${target}`, source: key, target },
          })) : [],
        );
      }, []);
  }
  /* eslint-enable class-methods-use-this */

  render() {
    return (
      <div id="cy" />
    );
  }
}
