import React, { PureComponent } from 'react';
import { ColorPicker } from '@grafana/ui';
import { Select, Tooltip } from '@grafana/ui';
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
  onChangeLabelColor = (value: string) => {
    this.props.onOptionsChange({ ...this.props.options, labelColor: value });
  };

  render() {
    const { options } = this.props;
    return (
      <div>
        <div className="section gf-form-group">
          <h5 className="section-heading">Display Settings</h5>

          <div className="gf-form">
            <label className="gf-form-label width-11">Edge Color
                <Tooltip content={"Edge Color TT"}>
                <i className="fa fa-info-circle" />
              </Tooltip>
            </label>
          </div>
          <div className="gf-form">
            <label className="gf-form-label width-11">Font Size
                <Tooltip content={"Font Size TT"}>
                <i className="fa fa-info-circle" />
              </Tooltip>
            </label>
            <Select width={8} options={fontSizes} onChange={this.onFontSizeChanged} value={options.fontSize} />
          </div>
          <div className="gf-form">
            <label className="gf-form-label width-11">Label Color
              <Tooltip content={"Label Color TT"}>
                <i className="fa fa-info-circle" />
              </Tooltip>
            </label>
            <div className="labelcolor-input-color">
              {options.labelColor && (
                <div className="thresholds-row-input-inner-color-colorpicker">
                  <ColorPicker
                    color={options.labelColor}
                    onChange={this.onChangeLabelColor}
                    enableNamedColors={true}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
