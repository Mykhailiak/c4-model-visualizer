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
  constructor(props) {
    super(props)

    this.state = {};
  }

  componentDidMount() {
    this.cy = cytoscape({
      style,
      container: document.getElementById('cy'),
      elements: {
        nodes: [
          { data: { id: 'n0' } },
          { data: { id: 'n1' } },
          { data: { id: 'n2' } },
          { data: { id: 'n3' } },
          { data: { id: 'n4' } },
          { data: { id: 'n5' } },
          { data: { id: 'n6' } },
          { data: { id: 'n7' } },
          { data: { id: 'n8' } },
          { data: { id: 'n9' } },
          { data: { id: 'n10' } },
          { data: { id: 'n11' } },
          { data: { id: 'n12' } },
          { data: { id: 'n13' } },
          { data: { id: 'n14' } },
          { data: { id: 'n15' } },
          { data: { id: 'n16' } }
        ],
        edges: [
          { data: { source: 'n0', target: 'n1' } },
          { data: { source: 'n1', target: 'n2' } },
          { data: { source: 'n1', target: 'n3' } },
          { data: { source: 'n4', target: 'n5' } },
          { data: { source: 'n4', target: 'n6' } },
          { data: { source: 'n6', target: 'n7' } },
          { data: { source: 'n6', target: 'n8' } },
          { data: { source: 'n8', target: 'n9' } },
          { data: { source: 'n8', target: 'n10' } },
          { data: { source: 'n11', target: 'n12' } },
          { data: { source: 'n12', target: 'n13' } },
          { data: { source: 'n13', target: 'n14' } },
          { data: { source: 'n13', target: 'n15' } },
        ]
      },
      layout: {
        name: 'dagre'
      },
    });
  }

  componentDidUpdate() {
    this.cy = cytoscape({
      style,
      container: document.getElementById('cy'),
      elements: this.props.data,
      layout: {
        name: 'dagre',
      },
    })
  }

  render() {
    return (
      <div id='cy'></div>
    );
  }
}
