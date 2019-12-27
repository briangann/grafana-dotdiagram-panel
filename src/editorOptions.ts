import { SelectableValue } from '@grafana/data';

import { fontSizes, edgeColorOptions, nodeAlignmentOptions, operatorOptions } from './types';

export interface DOTDiagramOptions {
  edgeColor: SelectableValue<string>;
  fontSize: SelectableValue<string>;
  labelColor: string;
  nodeAlignment: SelectableValue<string>;
  operator: SelectableValue<string>;
  unitFormat: SelectableValue<string>;
}

export const DOTDiagramDefaults: DOTDiagramOptions = {
  edgeColor: edgeColorOptions[0],
  fontSize: fontSizes[0],
  labelColor: 'white',
  nodeAlignment: nodeAlignmentOptions[0],
  operator: operatorOptions[0],
  unitFormat: {
    text: 'short',
    value: 'short',
  },
};
