/**
 * Retrieves asynchronously the items from the source setting.
 *
 * @param {Object[]|Function} source List of source items or function returning source items asynchronously.
 * @param {Function} callback Callback called when the items are retrieved
 */
function getSourceItems(source, callback) {
  if (typeof source === 'function') {
    source.call(this, null, callback);
  } else if (Array.isArray(source)) {
    callback(source);
  } else {
    callback(null);
  }
}

export default getSourceItems;
