import React from 'react';
// @ts-ignore
import viz from 'viz.js';
import * as d3 from 'd3';
import { select as d3_select } from 'd3-selection';
import { SampleDiagram } from "SampleDiagrams";

//import { CustomUID } from '../customuid';
export interface Props2 {
  chartContainer: any;
}

export class DOTDiagram extends React.Component<any, any, Props2> {
  state: {
    container: any;
    containerId: string;
    containerHeight: number;
    containerWidth: number;
    chart: any;
    worker: Worker;
    messageStyle: any;
  };
  svg: any;
  color: any;
  div: any;
  container: any;
  constructor(props: any) {
    super(props);
    console.log(props);
    const messageStyle = {
      color: "yellow",
    }
    this.state = {
      container: props.container,
      containerId: props.containerId,
      containerHeight: props.containerHeight,
      containerWidth: props.containerWidth,
      chart: null,
      worker: props.aWorker,
      messageStyle: messageStyle,
    }
    this.color = d3.scaleOrdinal(d3.schemeCategory10);
    this.RenderDiagram = this.RenderDiagram.bind(this);
    this.svg = null;
  }

  render() {
    console.log('entered render()');
    if (typeof this.state.chart === "undefined") {
      console.log("Chart UNDEFINED");
      return (
        <div style={this.state.messageStyle} id="dot-diagram-message">Wait for rendering to complete...</div>
      );
    }
    console.log("Chart is defined: " + this.state.chart);
    return <div ref={div => (this.div = d3_select(div))}>{this.state.chart}</div>;
  }

  async componentDidMount() {
    console.log('ComponentDidMount');

    let chartContainer = document.getElementById("chart-container")
    if (chartContainer) {
      console.log(chartContainer);
      if (chartContainer) {
        console.log(`width: ${chartContainer.clientWidth} height ${chartContainer.clientHeight}`);
        this.setState({
          container: chartContainer,
          containerHeight: chartContainer.clientHeight,
          containerWidth: chartContainer.clientWidth,
        });
        console.log("Waiting for D3...");
        return await this.RenderDiagram(chartContainer);
      }
    }
  }

  async componentDidUpdate(prevProps: any, prevState: any) {
    console.log('ComponentDidUpdate');
    // hide the "loading" message
    let messageDiv = document.getElementById("dot-diagram-message");
    if (messageDiv) {
      messageDiv.style.display = "none";
    }
  }

  async RenderDiagram(chartContainer: any) {
    // ========================================================================
    // set properties
    // ========================================================================
    const margin = { top: 10, right: 0, bottom: 10, left: 0 };
    const width = this.state.containerWidth - margin.left - margin.right;
    const height = this.state.containerHeight - margin.top - margin.bottom;
    // ========================================================================
    // Initialize
    // ========================================================================
    let vizworker = new viz({ worker: this.state.worker });
    console.log('renderD3: Width = ' + width + ' height = ' + height);
    const svgOpts = {
      width: width,
      height: height,
    };
    this.svg = await vizworker.renderSVGElement(SampleDiagram.Diagram1, svgOpts).then((element: any) => {
      console.log("renderD3: renderSVGElement");
      chartContainer.appendChild(element);
      return element;
    });
    // ========================================================================
    // finished
    // ========================================================================
    console.log('renderD3: waited');
    //console.log(this.svg);
  }

  getColor(name: string) {
    if (typeof name === 'undefined') {
      return '#2ca02c';
    }
    return this.color(name.replace(/ .*/, ''));
  }

  formatValue(d: number) {
    const f = d3.format(',.0f');
    return `${f(d)} TWh`;
  }

  genId() {
    return '0';
  }
}
