import React, { Component } from 'react';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import { getSuitableLevelKey, levels } from './LevelSelector';

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
    selector: ':parent',
    style: {
      'background-color': '#fff',
      'background-opacity': 0.3,
      'text-valign': 'top',
      'text-halign': 'center',
      'border-style': 'dashed',
      'text-margin-y': -3,
    },
  },
  {
    selector: 'edge',
    style: {
      width: 4,
      label: 'data(name)',
      'font-size': 4,
      'text-background-color': '#fff',
      'text-background-padding': 3,
      'text-background-opacity': 0.8,
      'text-background-shape': 'round-rectangle',

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
    const { props } = this;

    this.layout = { name: 'dagre' };
    this.cy = cytoscape({
      style,
      maxZoom: 6,
      minZoom: 1,
      userZoomingEnabled: true,
      userPanningEnabled: true,
      boxSelectionEnabled: false,
      autounselectify: true,
      container: document.getElementById('cy'),
      elements: [],
      layout: this.layout,
    });

    this.cy.on('click', 'node', (e) => {
      const { selectionId, hasChild } = e.target.data();

      if (hasChild) {
        props.selectLevel(selectionId);
      }
    });
  }

  componentDidUpdate() {
    const { props, cy, layout } = this;
    const { context } = props.data;
    this.selectedPath = (props.selectedLevel || '').split(':');
    const elements = this.computeElements(context);

    cy.json({ elements });
    cy.ready(() => cy.layout(layout).run());
    this.fitViewport();
  }

  fitViewport() {
    const destination = this.selectedPath[this.selectedPath.length - 1];

    if (destination) {
      this.cy.fit(`#${destination}`);
    }
  }

  computeElements(context = {}, parent, level = 0, selectionPath = levels[0]) {
    const keys = Object.keys(context);

    return keys
      .reduce((acc, key) => {
        let groups = [];
        const { relations: { to: targetsSource } = {} } = context[key];
        const validEdge = targetsSource && Object.keys(targetsSource).some((t) => keys.includes(t));
        const node = context[key];
        const name = node.name || key;
        const selectionId = `${selectionPath}:${key}`;
        const nodeContextKey = getSuitableLevelKey(node, level + 1);
        const visibleNode = this.selectedPath.includes(key);

        if (nodeContextKey && visibleNode) {
          groups = this.computeElements(node[nodeContextKey], key, level + 1, selectionId);
        }

        return acc
          .concat({
            data: {
              name,
              parent,
              selectionId,
              hasChild: Boolean(nodeContextKey),
              id: key,
            },
          })
          .concat(
            validEdge ? Object.keys(targetsSource).map((target) => ({
              data: {
                target,
                id: `${key}_${target}`,
                source: key,
                name: targetsSource[target],
              },
            })) : [],
          )
          .concat(groups);
      }, []);
  }

  render() {
    return (
      <div id="cy" />
    );
  }
}
