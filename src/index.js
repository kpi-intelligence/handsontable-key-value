import * as Handsontable from 'handsontable';

import { KeyValueEditor } from './editors';
import { keyValueRenderer } from './renderers';

Handsontable.cellTypes.registerCellType('key-value', {
  editor: KeyValueEditor,
  renderer: keyValueRenderer,
});
