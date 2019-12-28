import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
// import { MetricsPanelCtrl } from 'grafana/app/plugins/sdk';
import _ from 'lodash';
import DOTDiagram from './components/DOTDiagram';
import { SampleDiagram } from './SampleDiagrams';
import { PanelProps } from '@grafana/data';
import { DOTDiagramOptions } from './types';

interface Props extends PanelProps<DOTDiagramOptions> {}

export class DOTDiagramPanelCtrl extends PureComponent<Props> {
  static templateUrl = 'partials/template.html';
  static sampleDiagram = SampleDiagram.Diagram1;

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

  aWorker: any;
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

// export { DOTDiagramPanelCtrl, DOTDiagramPanelCtrl as MetricsPanelCtrl };
