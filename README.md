# handsontable-key-value

[![](https://img.shields.io/npm/v/handsontable-key-value.svg?style=flat)](https://www.npmjs.com/package/handsontable-key-value)

Handsontable plugin allowing to have a key-value pair as a data type. It's built upon the builtin `autocomplete` feature with some small tweaks to make it work with such use-case.

## Installation

```bash
npm i handsontable-key-value
```

## Usage

Use it as a column type and provide the required settings:

```js
import 'handsontable-key-value' // Import the module to register the extensions

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

### Filters

We also provide a custom implementation of the [Filters plugin](https://handsontable.com/docs/latest/demo-filtering.html) that works with key-value columns. Enable it in your settings:

```js
const settings = {
  // filters: true <-- Remember to disable the official filters plugin
  filtersKeyValue: true,
}
```

All the options provided by the official plugin are available.

## Limitations

* The sort is done on the **underlying value**, not the displayed one (unless you provide a custom compare function).
