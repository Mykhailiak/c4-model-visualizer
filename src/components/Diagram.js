import React, { Component } from 'react';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';

const style = [
  {
    selector: 'node',
    style: {
      'background-color': '#11479e',
      label: 'data(id)',
    },
  },
  {
    selector: 'edge',
    style: {
      width: 4,
      'target-arrow-shape': 'triangle',
      'line-color': '#9dbaea',
      'target-arrow-color': '#9dbaea',
      'curve-style': 'bezier',
    },
  },
];

cytoscape.use(dagre);

export default class Diagram extends Component {
  componentDidMount() {
    this.layout = { name: 'dagre' };
    this.cy = cytoscape({
      style,
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
    return Object.entries(context)
      .reduce((acc, [key, value]) => {
        const { relations: { to: targets } = {} } = value;

        return acc.concat({ data: { id: key } }).concat(
          targets ? Object.keys(targets).map((target) => ({
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
