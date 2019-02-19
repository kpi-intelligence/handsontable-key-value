import * as Handsontable from 'handsontable';

import { getDisplayValue } from '../common';

/**
 * Key-value pair renderer.
 *
 * @param {Object} instance Currently processed Handsontable instance.
 * @param {HTMLElement} td Currently rendered cell TD element.
 * @param {Number} row Row index.
 * @param {Number} col Column index.
 * @param {String|Number} prop Column index or property name.
 * @param {String} value Cell contents.
 * @param {Object} cellProperties Currently processed cell properties object, containing the cell's metadata.
 */
function keyValueRenderer(instance, td, row, col, prop, value, cellProperties) {
  const columnSettings = instance.getSettings().columns[col];

  getDisplayValue.call(
    cellProperties,
    columnSettings.source,
    columnSettings.keyProperty,
    columnSettings.valueProperty,
    value,
    (displayValue) => {
      Handsontable.renderers.getRenderer('dropdown').apply(
        this,
        [instance, td, row, col, prop, displayValue || value, cellProperties],
      );
    },
  );

}

export default keyValueRenderer;
