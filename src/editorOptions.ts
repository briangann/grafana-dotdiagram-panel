import { SelectableValue } from '@grafana/data';
import { fontSizes } from './types';

export interface DOTDiagramOptions {
  fontSize: SelectableValue<string>;
  unitFormat: SelectableValue<string>;
}

export const DOTDiagramDefaults: DOTDiagramOptions = {
  fontSize: fontSizes[0],
  unitFormat: {
    "text": "short",
    "value": "short"
  },
};
