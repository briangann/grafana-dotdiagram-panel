import React from 'react';
//import ReactDOM from 'react-dom';
import { withFauxDOM } from 'react-faux-dom';
// @ts-ignore
import viz from '../libs/viz211.js';
// @ts-ignore
import * as d3 from '../libs/d3.v5.min';
import { select as d3_select } from 'd3-selection';

import _ from 'lodash';
//import { CustomUID } from '../customuid';
export interface Props2 {
  chartContainer: any;
}

class DOTDiagram extends React.Component<any, any, Props2> {
  state: {
    containerHeight: number;
    containerWidth: number;
    chart: any;
  };
  svg: any;
  color: any;
  div: any;
  worker: Worker;
  constructor(props: any) {
    super(props);
    this.color = d3.scaleOrdinal(d3.schemeCategory10);
    console.log('making worker...');
    this.worker = this.props.aWorker;
    //this.worker = new Worker("public/plugins/briangann-dotdiagram-panel/libs/full.render.js");
    //this.worker = null;

    this.renderD3 = this.renderD3.bind(this);
    this.svg = null;
    this.state = {
      containerHeight: this.props.chartContainer.clientHeight,
      containerWidth: this.props.chartContainer.clientWidth,
      chart: null,
    };
  }

  render() {
    console.log('entered render()');

    /*
    console.log(this.props);
    if (typeof this.props.chart === "undefined") {
      console.log("Chart undefined");
      return (
        <div>Rendering...</div>
      );
    }
    console.log("Chart is defined");
    console.log(this.props.chart);
    console.log("that was chart");
    //return this.props.chart;
    */
    return <div ref={div => (this.div = d3_select(div))}>{this.props.chart}</div>;
  }

  async componentDidMount() {
    // empty it
    //let container = document.getElementById(this.props.chartContainerId);
    //if ($("#" + this.props.chartContainerId).length) {
    //  $("#" + this.props.chartContainerId).empty();
    //}
    return await this.renderD3();
  }

  async componentDidUpdate(prevProps: any, prevState: any) {
    console.log('ComponentDidUpdate');
    //let container = document.getElementById(this.props.chartContainerId);
    //ReactDOM.unmountComponentAtNode(container);

    //if (this.props.data === prevProps.data) {
    //  return;
    //}
    //let container = document.getElementById(this.props.chartContainerId);
    //this.state.containerHeight = container.clientHeight;
    //this.state.containerWidth = container.clientWidth;
    //if ($("#" + this.props.chartContainerId).length) {
    //  $("#" + this.props.chartContainerId).empty();
    //}
    //return;
    //return await this.renderD3();
  }

  async renderD3() {
    // ========================================================================
    // create faux dom with a div connected to div id="chart"
    // ========================================================================

    const margin = { top: 10, right: 0, bottom: 10, left: 0 };
    const width = this.state.containerWidth - margin.left - margin.right;
    const height = this.state.containerHeight - margin.top - margin.bottom;

    // ========================================================================
    // Initialize and append the svg canvas to faux-DOM
    // ========================================================================
    //let worker = new Worker("public/plugins/briangann-dotdiagram-panel/libs/full.render.js");
    //if (this.worker === null) {
    //  this.worker = new Worker("public/plugins/briangann-dotdiagram-panel/libs/full.render.js");
    // }
    const thisRef = this;
    //let workerRef = this.worker;
    //debugger;
    const zviz = new viz({ worker: this.worker });
    //console.log("calling unmount");
    //let container = document.getElementById(thisRef.props.chartContainerId);
    //ReactDOM.unmountComponentAtNode(container);
    console.log('Width = ' + width + ' height = ' + height);
    const myopts = {
      width: 50,
      height: 50,
    };
    await zviz.renderSVGElement(this.props.data, myopts).then((element: any) => {
      console.log(element);
      thisRef.svg = element;
      //if (thisRef.props.chart !== null) {
      //  console.log("props chart not null, emptying");
      //  let container = document.getElementById(thisRef.props.chartContainerId);
      //  ReactDOM.unmountComponentAtNode(container);
      // }

      if ($('#' + thisRef.props.chartContainerId).length) {
        console.log('emptying...');
        try {
          // this works but throws react errors/complaints about cleared outside of react
          const container = document.getElementById(thisRef.props.chartContainerId);
          if (container) {
            container.innerHTML = '';
          }
          //ReactDOM.unmountComponentAtNode(thisRef.props.chartContainerId);
          //$("#" + thisRef.props.chartContainerId).empty();
        } catch {
          console.log('empty failed');
        }
      }
      thisRef.props.chartContainer.appendChild(element);
      thisRef.state.chart = thisRef.props.chartContainer;
      //thisRef.props.chart.width = width;
      //thisRef.props.chart.height = height;
      return;
    });

    // ========================================================================
    // Render the faux-DOM to React elements
    // ========================================================================
    console.log('waited');
    console.log(this.svg);
    //let width = this.div.node().parentElement.clientWidth;
    //let height = this.div.node().parentElement.clientHeight;
    console.log('setting ViewBox');

    try {
      const mysvg = d3.select(this.props.chartContainer.childNodes[0]);
      mysvg.attr('width', width).attr('height', height);
      const firstPolygon = mysvg
        .select('g')
        .select('polygon')
        .remove();
      console.log(firstPolygon);
      // modify first node
      //debugger;
      /*
      let x = mysvg.select("g").select("g").select("ellipse"); // select("ellipse").attr("stroke", "00FF00");
      x.attr("stroke", "#00FF00");
      let y = mysvg.select("g").selectAll("g").nodes();
      mysvg.select("g").select("g").selectAll("ellipse").select(function( d, i, n ) {
        console.log("hi!");
        console.log(d);
        console.log(i);
        console.log(n);
        d3.select(n[i]).attr("stroke", "#FFFFFF");
      });
      */
      /*
      mysvg.select("g").selectAll("g").select(function( d, i, n ) {
        console.log("hi!");
        console.log(d);
        console.log(i);
        console.log(n);
        d3.select(n[i]).selectAll("ellipse").attr("stroke", "#00FF00");
        d3.select(n[i]).selectAll("text").attr("fill", "#FFFF00");
        d3.select(n[i]).selectAll("path").attr("stroke", "#FFFFFF");
        let randwidth = Math.floor((Math.random() * 8) + 1);
        d3.select(n[i]).selectAll("path").attr("stroke-width", `${randwidth}px`);
        d3.select(n[i]).selectAll("polygon").attr("stroke", "#FF0000");
        d3.select(n[i]).selectAll("polygon").attr("fill", "#FF0000");
        d3.select(n[i]).selectAll("polygon").attr("stroke-width", `${randwidth}px`);
      });
      */
      //console.log(y);
      //mysvg.select("g").selectAll("g").selectAll(function(thisRef, i) {
      //    console.log("meh");
      //    console.log(thisRef);
      //    console.log(i);
      //});
      //console.log(x);
    } catch {
      console.log('no div...');
    }
    /*
    let mysvg = d3.select(this.props.chartContainer);
    console.log(mysvg);
    width += 300;
    mysvg
      .attr("width", width)
      .attr("height", height);
    mysvg.attr("viewBox", `0 0 ${width * 3 / 4} ${height * 3 / 4}`);
    */
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

export default withFauxDOM(DOTDiagram);
