import React, { PureComponent } from 'react';

//import ReactDOM from 'react-dom';
import { PanelProps } from '@grafana/data';
import { DOTDiagramOptions } from './editorOptions';
import { DOTDiagram } from './components/DOTDiagram';

// @ts-ignore
//import * as vizjsrender from 'viz.js/full.render';
// @ts-ignore
//import viz from './libs/viz211.js';
//import * as viz from 'viz.js/full.render';


interface Props extends PanelProps<DOTDiagramOptions> { }

export class DOTDiagramPanel extends PureComponent<Props> {
  aWorker: any;
  myRef: any;
  containerId: any;
  container: any;
  constructor(props: any) {
    super(props);
    // TODO: find a cleaner way to create this worker
    this.aWorker = new Worker("public/plugins/briangann-dotdiagram-panel/libs/full.render.js");
    this.myRef = React.createRef();
  }
  render() {
    const { options, data, width, height } = this.props;
    const fs = '12';
    console.log("panel width: " + width + " height: " + height);
    console.log("options: " + options);
    const styleinfo = {
      width: width,
      height: height,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
    return (
      <div
        style={{
          position: 'relative',
          width,
          height,
        }}
      >
        <div id="chart-container" style={styleinfo}>
          <DOTDiagram
            parent={this.myRef}
            data={data}
            fontSize={fs}
            chartContainer={document.getElementById("chart-container")}
            chartContainerId={"chart-container"}
            aWorker={this.aWorker}
            containerWidth={width}
            containerHeight={height}
          />
        </div>
      </div>
    );
  }
}
