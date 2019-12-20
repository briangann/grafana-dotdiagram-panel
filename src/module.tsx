import { DOTDiagramPanelCtrl } from './ctrl';
import { loadPluginCss } from 'grafana/app/plugins/sdk';

loadPluginCss({
  dark: 'plugins/briangann-dotdiagram-panel/styles/dark.css',
  light: 'plugins/briangann-dotdiagram-panel/styles/light.css',
});

export { DOTDiagramPanelCtrl as PanelCtrl };
