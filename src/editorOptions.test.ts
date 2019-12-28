import { DOTDiagramDefaults } from './editorOptions';

describe('editorOptions test', () => {
  it('edge color value should be input', () => {
    expect(DOTDiagramDefaults.edgeColor.value).toBe('input');
  });
  it('edge color label should be input', () => {
    expect(DOTDiagramDefaults.edgeColor.label).toBe('Input');
  });
});
