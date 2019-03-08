import Handsontable from 'handsontable';

import { KeyValueEditor } from './editors';
import { KeyValueFilters } from './filters';
import { keyValueRenderer } from './renderers';
import { keyValueValidator } from './validators';

Handsontable.cellTypes.registerCellType('key-value', {
  editor: KeyValueEditor,
  renderer: keyValueRenderer,
  validator: keyValueValidator,
  allowInvalid: false,
});

export default {
  KeyValueEditor,
  KeyValueFilters,
  keyValueRenderer,
  keyValueValidator,
};
