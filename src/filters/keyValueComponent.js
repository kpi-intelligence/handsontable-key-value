import Handsontable from 'handsontable';
import * as C from 'handsontable/es/i18n/constants'; // UGLY
import ValueComponent from 'handsontable/es/plugins/filters/component/value'; // UGLY
import { unifyColumnValues, toEmptyString } from 'handsontable/es/plugins/filters/utils'; // UGLY

import { getSourceItems } from '../common';
import KeyValueMultipleSelect from './keyValueMultipleSelectUI';
import { intersectValues } from './utils';

class KeyValueComponent extends ValueComponent {

  constructor(hotInstance, options) {
    super(hotInstance, options);
    this.elements.pop();
    this.elements.push(new KeyValueMultipleSelect(this.hot));
    this.registerHooks();
  }

  getMultipleSelectElement() {
    return this.elements.filter(element => element instanceof KeyValueMultipleSelect)[0];
  }

  registerHooks() {
    if (this.getMultipleSelectElement()) {
      super.registerHooks();
    }
  }

  /**
   * Asynchronous version of the parent method.
   */
  reset() {
    const defaultBlankCellValue = this.hot.getTranslatedPhrase(C.FILTERS_VALUES_BLANK_CELLS);

    this._getColumnVisibleValues((visibleValues) => {
      const values = unifyColumnValues(visibleValues);
      const items = intersectValues(values, values, defaultBlankCellValue);

      this.getMultipleSelectElement().setItems(items);
      Handsontable.helper.arrayEach(this.elements, ui => ui.reset()); // UGLY Reset method of base component
      this.getMultipleSelectElement().setValue(values);
    });
  }

  /**
   * Asynchronous version of the parent method with handling of the special key-value case.
   */
  _getColumnVisibleValues(callback) {
    const lastSelectedColumn = this.hot.getPlugin('filtersKeyValue').getSelectedColumn();
    const visualIndex = lastSelectedColumn && lastSelectedColumn.visualIndex;
    const physicalIndex = lastSelectedColumn && lastSelectedColumn.physicalIndex;

    const columnSettings = this.hot.getSettings().columns[physicalIndex];

    // Get the values from the source items for key-value columns
    if (columnSettings.type === 'key-value') {

      // Mimic a cellProperties object so that renderers can work with a common interface.
      // Obviously, we can't set row/visualRow properties here, so the end developer should care about this.
      const cellProperties = {
        instance: this.hot,
        col: physicalIndex,
        visualcol: visualIndex,
        prop: columnSettings.data,
        row: null,
        visualRow: null,
      };

      getSourceItems.call(cellProperties, columnSettings.source, (items) => {
        // Prepare the items with key and value properties to be handled by intersectValues transparently
        const visibleValues = items.map(item => ({
          key: item[columnSettings.keyProperty],
          value: item[columnSettings.valueProperty],
        }));
        callback(visibleValues);
      });
    } else {
      const visibleValues = Handsontable.helper.arrayMap(
        this.hot.getDataAtCol(visualIndex),
        v => toEmptyString(v),
      );
      callback(visibleValues);
    }
  }

}

export default KeyValueComponent;
