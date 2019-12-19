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
  computeElements(context = {}) {
    return Object.entries(context)
      .reduce((acc, [key, value]) => {
        const { relations: { to: targets } = {} } = value;

        return acc.concat({ data: { id: key } }).concat(
          targets ? acc.concat(Object.keys(targets).map(target => ({
            data: { id: `${key}_${target}`, source: key, target }
          }))) : []
        )
      }, []);
  }

  componentDidMount() {
    this.layout = { name: 'grid' };
    this.cy = cytoscape({
      style,
      container: document.getElementById('cy'),
      elements: [
        { data: { id: 'a' } },
        { data: { id: 'b' } },
      ],
      layout: this.layout,
    });
  }

  componentDidUpdate() {
    const { context } = this.props.data;
    const elements = this.computeElements(context);
    debugger;
    // Needs the investigation in why the list contains duplicates

    this.cy.json({ elements });
    this.cy.ready(() => this.cy.layout(this.layout).run());
  }

  render() {
    return (
      <div id='cy'></div>
    );
  }
}
