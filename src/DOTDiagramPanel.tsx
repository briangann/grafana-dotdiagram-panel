import React, { PureComponent } from 'react';
import { PanelProps } from '@grafana/data';
import { DOTDiagramOptions } from './editorOptions';

interface Props extends PanelProps<DOTDiagramOptions> {}

export class DOTDiagramPanel extends PureComponent<Props> {
  render() {
    const { options, data, width, height } = this.props;

    return (
      <div
        style={{
          position: 'relative',
          width,
          height,
        }}
      >
        <div>
          <div>Count: {data.series.length}</div>
          <div>{options.fontSize.label}</div>
        </div>
      </div>
    );
  }
}
