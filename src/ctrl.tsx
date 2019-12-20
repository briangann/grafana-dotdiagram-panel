import React from 'react';
import ReactDOM from 'react-dom';
import { MetricsPanelCtrl } from 'grafana/app/plugins/sdk';
import kbn from 'grafana/app/core/utils/kbn';
import _ from 'lodash';
import DOTDiagram from './components/DOTDiagram';

class DOTDiagramPanelCtrl extends MetricsPanelCtrl {
  static templateUrl = 'partials/template.html';
  sampleDiagram = `digraph {
    rankdir = LR;
    node [fontcolor=white,color=green,shape=doublecircle]; LR_0 LR_3 LR_4 LR_8;
    node [fontcolor=orange,color=yellow,shape = circle];
    edge [arrowhead=vee,color=white,fontcolor=white];
    LR_0 -> LR_2 [ arrowhead=dot, color=red, fontcolor=red,label="SS(B)" ];
    LR_0 -> LR_1 [ label = "SS(S)" ];
    LR_1 -> LR_3 [ label = "S($end)" ];
    LR_2 -> LR_6 [ label = "SS(b)" ];
    LR_2 -> LR_5 [ label = "SS(a)" ];
    LR_2 -> LR_4 [ label = "S(A)" ];
    LR_5 -> LR_7 [ label = "S(b)" ];
    LR_5 -> LR_5 [ label = "S(a)" ];
    LR_6 -> LR_6 [ label = "S(b)" ];
    LR_6 -> LR_5 [ label = "S(a)" ];
    LR_7 -> LR_8 [ label = "S(b)" ];
    LR_7 -> LR_5 [ label = "S(a)" ];
    LR_8 -> LR_6 [ label = "S(b)" ];
    LR_8 -> LR_5 [ label = "S(a)" ];
  }`;
  sampleDiagram2 = `digraph G {
    subgraph cluster_0 {
      style=filled;
      color="#FFFFFF";
      node [style=filled,color=green];
      edge [style=filled,color=blue];
      a0 -> a1 -> a2 -> a3;
      label = "process #1";
    }
    subgraph cluster_1 {
      node [style=filled];
      b0 -> b1 -> b2 -> b3;
      label = "process #2";
      color=blue
    }
    start -> a0;
    start -> b0;
    a1 -> b3;
    b2 -> a3;
    a3 -> a0;
    a3 -> end;
    b3 -> end;

    start [shape=Mdiamond];
    end [shape=Msquare];
  }`;

  panelDefaults = {
    diagram: {
      globalUnitFormat: 'short',
      globalDecimals: 2,
      globalOperatorName: 'avg',
      edgeColor: 'input',
      fontSize: 12,
      labelColor: '#FFFFFF',
      nodeAlignment: 'left',
      nodePadding: 8,
      nodeWidth: 15,
      useRemoteURL: false,
      remoteURL: '',
      dotContent: '',
    },
  };

  containerId: string;

  edgeColorOptions = [
    { value: 'input', text: 'Input' },
    { value: 'output', text: 'Output' },
    { value: 'path', text: 'Selected Path' },
  ];

  nodeAlignmentOptions = [
    { value: 'left', text: 'Left' },
    { value: 'right', text: 'Right' },
    { value: 'center', text: 'Center' },
    { value: 'justify', text: 'Justify' },
  ];

  fontSizes = [
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    22,
    24,
    26,
    28,
    30,
    32,
    34,
    36,
    38,
    40,
    42,
    44,
    46,
    48,
    50,
    52,
    54,
    56,
    58,
    60,
    62,
    64,
    66,
    68,
    70,
  ];

  unitFormats = kbn.getUnitFormats();

  operatorOptions = [
    { value: 'avg', text: 'Average' },
    { value: 'count', text: 'Count' },
    { value: 'current', text: 'Current' },
    { value: 'delta', text: 'Delta' },
    { value: 'diff', text: 'Difference' },
    { value: 'first', text: 'First' },
    { value: 'logmin', text: 'Log Min' },
    { value: 'max', text: 'Max' },
    { value: 'min', text: 'Min' },
    { value: 'name', text: 'Name' },
    { value: 'last_time', text: 'Time of Last Point' },
    { value: 'time_step', text: 'Time Step' },
    { value: 'total', text: 'Total' },
  ];

  aWorker: any;
  /** @ngInject */
  constructor($scope: any, $injector: any) {
    super($scope, $injector);
    // merge existing settings with our defaults
    _.defaults(this.panel, this.panelDefaults);
    // share the renderer otherwise multiple get created and not destroyed
    this.aWorker = new Worker('public/plugins/briangann-dotdiagram-panel/libs/full211.render.js');

    this.containerId = 'container_d3_svg_' + this.panel.id;
    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
    this.events.on('data-received', this.onDataReceived.bind(this));
  }

  onInitEditMode() {
    // determine the path to this plugin base on the name found in panel.type
    const thisPanelPath = 'public/plugins/' + this.panel.type + '/';
    // add the relative path to the partial
    const optionsPath = thisPanelPath + 'partials/editor.options.html';
    this.addEditorTab('Options', optionsPath, 2);
    const diagramPath = thisPanelPath + 'partials/editor.diagram.html';
    this.addEditorTab('Diagram', diagramPath, 3);
  }

  onDataReceived(dataList: any) {
    this.render();
  }

  setGlobalUnitFormat(subItem: any) {
    this.panel.diagram.globalUnitFormat = subItem.value;
  }

  validateNodeWidth() {
    if (this.panel.diagram.nodeWidth <= 0) {
      this.panel.diagram.nodeWidth = 15;
    }
    this.refresh();
  }
  validateNodePadding() {
    if (this.panel.diagram.nodePadding <= 0) {
      this.panel.diagram.nodePadding = 8;
    }
    this.refresh();
  }

  link(scope: any, elem: any, attrs: any, ctrl: any) {
    if (!scope) {
      return;
    }
    if (!attrs) {
      return;
    }
    const panelByClass = elem.find('.grafana-dotdiagram-panel');
    panelByClass.append('<div style="width: 100%; height: 100%;" id="' + ctrl.containerId + '"></div>');
    const container = panelByClass[0].childNodes[0];

    function render() {
      container.style.width = container.parentNode.clientWidth;
      container.style.height = container.parentNode.clientHeight;
      let data = ctrl.panel.diagram.dotContent;
      if (ctrl.panel.diagram.dotContent.length === 0) {
        ctrl.panel.diagram.dotContent = ctrl.sampleDiagram;
        data = ctrl.sampleDiagram;
      }
      // this creates the chart inside the container
      const chartContainer = document.getElementById(ctrl.containerId);
      //ReactDOM.unmountComponentAtNode(container);
      ReactDOM.render(
        <DOTDiagram
          data={data}
          fontSize={ctrl.panel.diagram.fontSize}
          chartContainer={chartContainer}
          chartContainerId={ctrl.containerId}
          aWorker={ctrl.aWorker}
          containerWidth={container.style.width}
          containerHeight={container.style.height}
        />,
        document.getElementById(ctrl.containerId)
      );
    }

    this.events.on('render', () => {
      const container = document.getElementById(ctrl.containerId);
      if (container) {
        ReactDOM.unmountComponentAtNode(container);
      }
      render();
      ctrl.renderingCompleted();
    });
  }
}

export { DOTDiagramPanelCtrl, DOTDiagramPanelCtrl as MetricsPanelCtrl };
