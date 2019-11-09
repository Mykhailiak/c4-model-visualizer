import React, { Component } from 'react';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';

const style = [
  {
    selector: 'node',
    style: {
      'background-color': '#777',
      label: 'data(id)',
    }
  },
  {
    selector: 'edge',
    style: {
      width: 3,
      'line-color': '#ccc',
      'target-arrow-color': '#ccc',
      'target-arrow-shape': 'triangle',
    }
  }
];

cytoscape.use(dagre)

export default class Diagram extends Component {
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
    this.cy.json({ elements: this.props.data });
    this.cy.ready(() => this.cy.layout(this.layout).run());
  }

  render() {
    return (
      <div id='cy'></div>
    );
  }
}
