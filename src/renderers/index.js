import * as Handsontable from 'handsontable';

import keyValueRenderer from './keyValueRenderer';

Handsontable.renderers.registerRenderer('key-value', keyValueRenderer);

export {
  keyValueRenderer,
};
