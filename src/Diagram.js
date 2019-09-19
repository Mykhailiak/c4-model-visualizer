import React, { Component } from 'react';
import { select } from 'd3-selection';

export default class Diagram extends Component {
  componentDidMount() {
    var svg = select("#my_dataviz").append("svg").attr("width", 200).attr("height", 200)

    svg.append('circle')
      .attr('cx', 100)
      .attr('cy', 100)
      .attr('r', 50)
      .attr('stroke', 'black')
      .attr('fill', '#69a3b2');

  }

  render() {
    return (
      <div id="my_dataviz"></div>
    );
  }
}
