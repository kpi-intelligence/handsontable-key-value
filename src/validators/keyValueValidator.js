import { getSourceItem } from '../common';
/**
 * Key-value pair validator.
 *
 * @param {string} value The value to validate.
 * @param {Function} callback The callback to call with `true` if `value` is valid or `false` otherwise.
 */
function keyValueValidator(value, callback) {
  getSourceItem.call(
    this,
    this.source,
    this.keyProperty,
    value,
    item => (item ? callback(true) : callback(false)),
  );
}

export default keyValueValidator;
