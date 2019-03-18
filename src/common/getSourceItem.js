import getSourceItems from './getSourceItems';

/**
 * Returns the item corresponding to a key from a list of items.
 *
 * @param {Object[]} items List of source items.
 * @param {String} keyProperty Name of the key property on a source item.
 * @param {String} keyValue Key of the source item we want to retrieve the display value.
 *
 * @returns {String|null} The display value or `null` if not found.
 */
function _getSourceItem(items, keyProperty, keyValue) {
  const sourceItem = items.find((item) => {
    const key = item[keyProperty];

    let castedKeyValue = keyValue;

    // HoT will sometimes cast the value to string,
    // so we have to cast it to original type for comparison
    if (typeof castedKeyValue !== typeof key) {
      if (typeof key === 'number') {
        castedKeyValue = Number(keyValue);
      } else if (typeof key === 'boolean') {
        castedKeyValue = keyValue === 'true';
      }
    }

    return key === castedKeyValue;
  });

  return sourceItem;
}

/**
 * Retrieves asynchronously the item corresponding to a key from the source items.
 *
 * @param {Object[]|Function} source List of source items or function returning source items asynchronously.
 * @param {String} keyProperty Name of the key property on a source item.
 * @param {String} keyValue Key of the source item we want to retrieve the display value.
 * @param {Function} callback Callback called when the item lookup is done.
 */
function getSourceItem(source, keyProperty, keyValue, callback) {
  getSourceItems.call(this, source, (items) => {
    if (items) {
      callback(_getSourceItem(items, keyProperty, keyValue));
    } else {
      callback(null);
    }
  });
}

export default getSourceItem;
