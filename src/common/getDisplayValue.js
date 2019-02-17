/**
 * Returns the display value corresponding to a key from a list of items.
 *
 * @param {Object[]} items List of source items.
 * @param {String} keyProperty Name of the key property on a source item.
 * @param {String} valueProperty Name of the value property on a source item.
 * @param {String} keyValue Key of the source item we want to retrieve the display value.
 *
 * @returns {String|null} The display value or `null` if not found.
 */
function _getDisplayValue(items, keyProperty, valueProperty, keyValue) {
  const sourceItem = items.find((item) => {
    const key = item[keyProperty];
    // If the item key is a number, cast the keyValue to a number
    const castedKeyValue = typeof key === 'number' ? Number(keyValue) : keyValue;
    return key === castedKeyValue;
  });

  return sourceItem ? sourceItem[valueProperty] : null;
}

/**
 * Retrieves asynchronously the display value corresponding to a key from the source items.
 *
 * @param {Object[]|Function} source List of source items or function returning source items asynchronously.
 * @param {String} keyProperty Name of the key property on a source item.
 * @param {String} valueProperty Name of the value property on a source item.
 * @param {String} keyValue Key of the source item we want to retrieve the display value.
 * @param {Function} callback Callback called when the value lookup is done.
 */
function getDisplayValue(source, keyProperty, valueProperty, keyValue, callback) {
  if (typeof source === 'function') {
    source(null, (items) => {
      callback(_getDisplayValue(items, keyProperty, valueProperty, keyValue));
    });
  } else if (Array.isArray(source)) {
    callback(_getDisplayValue(source, keyProperty, valueProperty, keyValue));
  } else {
    callback(null);
  }
}

export default getDisplayValue;
