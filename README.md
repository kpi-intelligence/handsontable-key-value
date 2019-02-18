# handsontable-key-value

![](https://img.shields.io/npm/v/handsontable-key-value.svg?style=flat)

Handsontable plugin allowing to have a key-value pair as a data type. It's built upon the builtin `autocomplete` feature with some small tweaks to make it work with such use-case.

## Installation

```bash
npm i handsontable-key-value
```

## Usage

### Register the plugin

In order to be compatible with both `handsontable` and `handsontable-pro` packages, the registration is not done automatically. You have to call the provided setup function yourself:

```js
import * as Handsontable from 'handsontable'
// import * as Handsontable from 'handsontable-pro'
import handsontableKeyValue from 'handsontable-key-value';

handsontableKeyValue(Handsontable);
```

### Usage

Use it as a column type and provide the required settings:

```js
const settings = {
  columns: [
    {
      type: 'key-value',
      filter: false, // Same parameter as in `autocomplete`
      data: 'status', // The field containing the key value in your data
      // List of source items
      source: [
        {
          id: 1,
          name: 'Ready',
        },
        {
          id: 2,
          name: 'Cancelled',
        },
        {
          id: 3,
          name: 'Done',
        },
      ],
      keyProperty: 'id', // The field containing the key value in your items
      valueProperty: 'name', // The field containing the display value in your items
    },
  ],
};
```

The `source` parameter also accepts a function for loading items asynchronously:

```js
const settings = {
  columns: [
    {
      type: 'key-value',
      filter: false,
      data: 'status',
      source: function(_query, process) {
        const r = [
          {
            id: 1,
            name: 'Ready',
          },
          {
            id: 2,
            name: 'Cancelled',
          },
          {
            id: 3,
            name: 'Done',
          },
        ];
        setTimeout(() => process(r), 1000); // Call the `process` callback with your items.
      },
      keyProperty: 'id',
      valueProperty: 'name',
    },
  ],
};
```

## Limitations

* The sort is done on the **underlying value**, not the displayed one (unless you provide a custom compare function).
* The `filters` plugin (Pro) will still display the underlying value in the filters dropdown list. This is something I'm looking into.
