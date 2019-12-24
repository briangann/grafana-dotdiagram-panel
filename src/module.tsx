import { PanelPlugin } from '@grafana/data';
import { DOTDiagramOptions, defaults } from './types';
import { DOTDiagramEditor } from './DOTDiagramEditor';
import { DOTDiagramPanel } from './DOTDiagramPanel';

import { loadPluginCss } from 'grafana/app/plugins/sdk';

loadPluginCss({
  dark: 'plugins/briangann-dotdiagram-panel/styles/dark.css',
  light: 'plugins/briangann-dotdiagram-panel/styles/light.css',
});

export const plugin = new PanelPlugin<DOTDiagramOptions>(DOTDiagramPanel).setDefaults(defaults).setEditor(DOTDiagramEditor);
