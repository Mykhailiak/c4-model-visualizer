import React, { Component } from 'react';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';

const style = [
  {
    selector: 'node',
    style: {
      'background-color': '#11479e',
      label: 'data(id)',
    }
  },
  {
    selector: 'edge',
    style: {
      width: 4,
      'target-arrow-shape': 'triangle',
      'line-color': '#9dbaea',
      'target-arrow-color': '#9dbaea',
      'curve-style': 'bezier'
    }
  }
];

cytoscape.use(dagre)

export default class Diagram extends Component {
  computeElements(context = {}) {
    return Object.entries(context)
      .reduce((acc, [key, value]) => {
        const { relations: { to: targets } = {} } = value;

        return acc.concat({ data: { id: key } }).concat(
          targets ? Object.keys(targets).map(target => ({
            data: { id: `${key}_${target}`, source: key, target }
          })) : []
        )
      }, []);
  }

  componentDidMount() {
    this.layout = { name: 'grid' };
    this.cy = cytoscape({
      style,
      container: document.getElementById('cy'),
      elements: [],
      layout: this.layout,
    });
  }

  componentDidUpdate() {
    const { context } = this.props.data;
    const elements = this.computeElements(context);

    this.cy.json({ elements });
    this.cy.ready(() => this.cy.layout(this.layout).run());
  }

  render() {
    return (
      <div id='cy'></div>
    );
  }
}
