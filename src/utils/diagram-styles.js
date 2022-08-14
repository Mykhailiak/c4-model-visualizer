const basicGray = '#707070';
const background = '#f0f2f5';
const lineWidth = 0.2;

export default [
  {
    selector: 'node',
    style: {
      width: 70,
      color: '#fff',
      label: 'data(name)',
      shape: 'rectangle',
      'font-size': 7,
      'font-weight': 'bold',
      'text-max-width': 60,
      'text-valign': 'center',
      'background-color': '#438cd4',
      'text-wrap': 'ellipsis',
    },
  },
  {
    selector: ':parent',
    style: {
      color: basicGray,
      'font-size': 4.3,
      'border-width': lineWidth,
      'border-color': basicGray,
      'background-color': background,
      'background-opacity': 1,
      'text-valign': 'bottom',
      'text-halign': 'left',
      'border-style': 'dashed',
      'text-margin-y': -8,
      'text-margin-x': 40,
      'text-max-width': 55,
      'text-wrap': 'ellipsis',
    },
  },
  {
    selector: 'edge',
    style: {
      width: lineWidth,
      label: 'data(name)',
      'font-size': 4,
      'font-weight': 'bold',
      'text-background-color': background,
      'text-background-opacity': 1,
      color: basicGray,
      'target-arrow-shape': 'triangle',
      'arrow-scale': 0.4,
      'line-color': basicGray,
      'line-style': 'dashed',
      'line-dash-pattern': [4, 4],
      'line-cap': 'square',
      'target-arrow-color': basicGray,
      'curve-style': 'straight',
      'text-max-width': 80,
      'text-wrap': 'wrap',
    },
  },
  {
    selector: 'edge.circular-dep-edge',
    style: {
      'curve-style': 'unbundled-bezier',
    }
  }
];
