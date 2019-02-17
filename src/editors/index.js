import * as Handsontable from 'handsontable';

import KeyValueEditor from './keyValueEditor';

Handsontable.editors.registerEditor('key-value', KeyValueEditor);

export {
  KeyValueEditor,
};
