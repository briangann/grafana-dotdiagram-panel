import React, { PureComponent } from 'react';
import _ from 'lodash';
import { Select } from '@grafana/ui';
//import { PanelEditorProps } from '@grafana/data';
import { PanelEditorProps, SelectableValue } from '@grafana/data';

import { DOTDiagramOptions, defaults, DOTDiagramState ,stateDefaults, fontSizes } from './types';

/*
export interface EditorState {
  fontSize: SelectableValue<string>;
}

const stateDefaults: EditorState = {
  fontSize: fontSizes[0],
};
*/

export class DOTDiagramEditor extends PureComponent<PanelEditorProps<DOTDiagramOptions>> {
  constructor(props: any) {
    super(props);
    this.state = _.defaultsDeep(this.props.options, defaults);
  }

  onFontSizeChanged = (value: SelectableValue<string>) => {
    /*
    this.setState({
      fontSize: value,
    });
    console.log("state = " + JSON.stringify(this.state));
    */
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
