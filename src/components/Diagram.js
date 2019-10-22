import React, { Component } from 'react';
import cytoscape from 'cytoscape';

export default class Diagram extends Component {
  componentDidMount() {
    const cy = cytoscape({
      container: document.getElementById('cy'),
      elements: [
        {
          data: { id: 'a' },
        },
        {
          data: { id: 'b' },
        },
        {
          data: { id: 'c' },
        },
        {
          data: { id: 'd' },
        },
        {
          data: { id: 'ab', source: 'a', target: 'b' },
        },
        {
          data: { id: 'bc', source: 'b', target: 'c' },
        },
        {
          data: { id: 'cd', source: 'c', target: 'd' },
        },
      ],
      style: [
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
      ],
      layout: {
        rows: 1,
      },
    });
  }

  render() {
    return (
      <div id="cy"></div>
    );
  }
}
