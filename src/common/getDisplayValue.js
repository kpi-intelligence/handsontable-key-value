import getSourceItem from './getSourceItem';

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
  getSourceItem.call(this, source, keyProperty, keyValue, (item) => {
    callback(item ? item[valueProperty] : null);
  });
}

export default getDisplayValue;
