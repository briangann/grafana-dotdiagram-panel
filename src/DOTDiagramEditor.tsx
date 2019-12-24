import React, { PureComponent } from 'react';
import { Select } from '@grafana/ui';
import { PanelEditorProps } from '@grafana/data';
import { SelectableValue } from '@grafana/data';

import { fontSizes } from './types';
import { DOTDiagramOptions } from './editorOptions';


export class DOTDiagramEditor extends PureComponent<PanelEditorProps<DOTDiagramOptions>> {
  constructor(props: any) {
    super(props);
  }

  onFontSizeChanged = (value: SelectableValue<string>) => {
    this.props.onOptionsChange({ ...this.props.options, fontSize: value });
  };

  render() {
    const { options } = this.props;
    return (
      <div className="section gf-form-group">
        <h5 className="section-heading">Display</h5>
        <Select width={8} options={fontSizes} onChange={this.onFontSizeChanged} value={options.fontSize} />
      </div>
    );
  }
}
