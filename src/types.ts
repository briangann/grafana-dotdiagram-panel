import kbn from 'grafana/app/core/utils/kbn';
import { SelectableValue } from '@grafana/data';

export const fontSizes: Array<SelectableValue<string>> = [
  { value: '14', label: '14' },
  { value: '16', label: '16' },
  { value: '18', label: '18' },
];
export const edgeColorOptions: Array<SelectableValue<string>> = [
  { value: 'input', label: 'Input' },
  { value: 'output', label: 'Output' },
  { value: 'path', label: 'Selected Path' },
];

export const nodeAlignmentOptions: Array<SelectableValue<string>> = [
  { value: 'left', label: 'Left' },
  { value: 'right', label: 'Right' },
  { value: 'center', label: 'Center' },
  { value: 'justify', label: 'Justify' },
];

export const operatorOptions: Array<SelectableValue<string>> = [
  { value: 'avg', label: 'Average' },
  { value: 'count', label: 'Count' },
  { value: 'current', label: 'Current' },
  { value: 'delta', label: 'Delta' },
  { value: 'diff', label: 'Difference' },
  { value: 'first', label: 'First' },
  { value: 'logmin', label: 'Log Min' },
  { value: 'max', label: 'Max' },
  { value: 'min', label: 'Min' },
  { value: 'name', label: 'Name' },
  { value: 'last_time', label: 'Time of Last Point' },
  { value: 'time_step', label: 'Time Step' },
  { value: 'total', label: 'Total' },
];

export const unitFormats: Array<SelectableValue<string>> = kbn.getUnitFormats();
