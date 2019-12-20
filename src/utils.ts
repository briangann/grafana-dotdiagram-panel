import _ from 'lodash';

function GetDecimalsForValue(value: any, panelDecimals: any): { decimals: any; scaledDecimals: any } {
  if (_.isNumber(panelDecimals)) {
    return { decimals: panelDecimals, scaledDecimals: null };
  }

  const delta = value / 2;
  let dec = -Math.floor(Math.log(delta) / Math.LN10);

  const magn = Math.pow(10, -dec);
  const norm = delta / magn; // norm is between 1.0 and 10.0
  let size = 10;

  if (norm < 1.5) {
    size = 1;
  } else if (norm < 3) {
    size = 2;
    // special case for 2.5, requires an extra decimal
    if (norm > 2.25) {
      size = 2.5;
      ++dec;
    }
  } else if (norm < 7.5) {
    size = 5;
  } else {
    size = 10;
  }

  size *= magn;

  // reduce starting decimals if not needed
  if (Math.floor(value) === value) {
    dec = 0;
  }

  const result = {
    decimals: 0,
    scaledDecimals: 0,
  };
  result.decimals = Math.max(0, dec);
  result.scaledDecimals = result.decimals - Math.floor(Math.log(size) / Math.LN10) + 2;
  return result;
}

/**
 *
 * Find the largest font size (in pixels) that allows the string to fit in the given width.
 *
 * @param {String} text The text to be rendered.
 * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold ?px verdana")
 *                      -- note the use of ? in place of the font size.
 * @param {width} the width in pixels the string must fit in
 * @param {minFontPx} the smallest acceptable font size in pixels
 * @param {maxFontPx} the largest acceptable font size in pixels
 *
 */
function getTextSizeForWidth(text: string, font: any, width: any, minFontPx: any, maxFontPx: any) {
  let s = font.replace('?', maxFontPx);
  let w = getTextWidth(text, s);
  if (w <= width) {
    return maxFontPx;
  }
  // pad width by 10px
  width = width - 20;
  // start from large to small, return 0 for no-fit
  for (let fontSize = maxFontPx; fontSize >= minFontPx; fontSize--) {
    s = font.replace('?', fontSize);
    w = getTextWidth(text, s);
    if (w < width) {
      return Math.ceil(fontSize);
    }
  }
  // 0 if no fit
  return 0;
}

/**
 * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
 *
 * @param {String} text The text to be rendered.
 * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
 *
 * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
 */
function getTextWidth(text: string, font: string): number {
  // re-use canvas object for better performance
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  // default width
  if (context) {
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
  }
  return 100;
}

// determine the width of a panel by the span and viewport
// the link element object can be used to get the width more reliably
function getPanelWidthFailsafe(panel: any, panelContainer: any, editModeInitiated: any) {
  let trueWidth = 0;
  if (typeof panel.gridPos !== 'undefined') {
    // 24 slots is fullscreen, get the viewport and divide to approximate the width
    const viewPortWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const pixelsPerSlot = viewPortWidth / 24;
    trueWidth = Math.round(panel.gridPos.w * pixelsPerSlot);
    return trueWidth;
  }
  // grafana5 - use this.panel.gridPos.w, this.panel.gridPos.h
  if (typeof panel.span === 'undefined') {
    // check if inside edit mode
    if (editModeInitiated) {
      // width is clientWidth of document
      trueWidth = Math.max(document.documentElement.clientWidth, window.innerWidth);
    } else {
      // get the width based on the scaled container (v5 needs this)
      trueWidth = panelContainer.offsetParent.clientWidth;
    }
  } else {
    // v4 and previous used fixed spans
    const viewPortWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    // get the pixels of a span
    const pixelsPerSpan = viewPortWidth / 12;
    // multiply num spans by pixelsPerSpan
    trueWidth = Math.round(panel.span * pixelsPerSpan);
  }
  return trueWidth;
}

function getPanelHeight(panel: any, height: number, containerHeight: number, row: any) {
  // panel can have a fixed height set via "General" tab in panel editor
  let tmpPanelHeight = panel.height;
  if (typeof tmpPanelHeight === 'undefined' || tmpPanelHeight === '') {
    // grafana also supplies the height, try to use that if the panel does not have a height
    tmpPanelHeight = String(height);
    // v4 and earlier define this height, detect span for pre-v5
    if (typeof panel.span !== 'undefined') {
      // if there is no header, adjust height to use all space available
      let panelTitleOffset = 20;
      if (panel.title !== '') {
        panelTitleOffset = 42;
      }
      tmpPanelHeight = String(containerHeight - panelTitleOffset); // offset for header
    }
    if (typeof tmpPanelHeight === 'undefined') {
      // height still cannot be determined, get it from the row instead
      tmpPanelHeight = row.height;
      if (typeof tmpPanelHeight === 'undefined') {
        // last resort - default to 250px (this should never happen)
        tmpPanelHeight = '250';
      }
    }
  }
  // replace px
  tmpPanelHeight = tmpPanelHeight.replace('px', '');
  // convert to numeric value
  const actualHeight = parseInt(tmpPanelHeight, 10);
  return actualHeight;
}

export { GetDecimalsForValue, getTextSizeForWidth, getTextWidth, getPanelWidthFailsafe, getPanelHeight };
