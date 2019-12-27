import { PanelPlugin } from '@grafana/data';
import { DOTDiagramOptions, DOTDiagramDefaults } from './editorOptions';
import { DOTDiagramEditor } from './DOTDiagramEditor';
import { DOTDiagramPanel } from './DOTDiagramPanel';

import { loadPluginCss } from 'grafana/app/plugins/sdk';

loadPluginCss({
  dark: 'plugins/briangann-dotdiagram-panel/styles/dark.css',
  light: 'plugins/briangann-dotdiagram-panel/styles/light.css',
});

export const plugin = new PanelPlugin<DOTDiagramOptions>(DOTDiagramPanel).setDefaults(DOTDiagramDefaults).setEditor(DOTDiagramEditor);
