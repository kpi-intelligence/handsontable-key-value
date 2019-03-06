import * as Handsontable from 'handsontable';

import { KeyValueEditor } from './editors';
import { keyValueRenderer } from './renderers';
import { keyValueValidator } from './validators';

Handsontable.editors.registerEditor('key-value', KeyValueEditor);
Handsontable.renderers.registerRenderer('key-value', keyValueRenderer);
Handsontable.validators.registerValidator('key-value', keyValueValidator);

Handsontable.cellTypes.registerCellType('key-value', {
  editor: KeyValueEditor,
  renderer: keyValueRenderer,
  validator: keyValueValidator,
  allowInvalid: false,
});

export default {
  KeyValueEditor,
  keyValueRenderer,
  keyValueValidator,
};
