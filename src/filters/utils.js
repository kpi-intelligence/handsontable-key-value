import Handsontable from 'handsontable';
import { createArrayAssertion, toVisualValue } from 'handsontable/es/plugins/filters/utils'; // UGLY

/**
 * createArrayAssertion version handling key-value case.
 */
export function createArrayAssertionKeyValue(initialData) {
  const dataset = initialData;

  // Standard case
  if (!Handsontable.helper.isObject(dataset[0])) {
    return createArrayAssertion(initialData);
  }

  return function(item) {
    const itemIndex = dataset.findIndex(datasetItem => datasetItem.key === item.key);
    return itemIndex > -1;
  };
}

/**
 * intersectValues version handling key-value case.
 */
export function intersectValues(base, selected, defaultEmptyValue, callback) {
  const result = [];
  const same = base === selected;
  let selectedItemsAssertion;

  if (!same) {
    selectedItemsAssertion = createArrayAssertionKeyValue(selected);
  }

  Handsontable.helper.arrayEach(base, (baseItem) => {
    let value;
    let visualValue;
    // An object item comes from key-value
    if (Handsontable.helper.isObject(baseItem)) {
      value = baseItem.key;
      visualValue = baseItem.value;
    } else {
      value = baseItem;
    }

    let checked = false;

    if (same || selectedItemsAssertion(baseItem)) {
      checked = true;
    }

    const item = { checked, value, visualValue: visualValue || toVisualValue(value, defaultEmptyValue) };

    if (callback) {
      callback(item);
    }

    result.push(item);
  });

  return result;
}
