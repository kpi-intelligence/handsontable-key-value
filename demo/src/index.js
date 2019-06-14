import 'handsontable/dist/handsontable.min.css';

import Handsontable from 'handsontable';
import 'handsontable-key-value';

const brands = [
  {
    id: 1,
    name: 'Ford',
  },
  {
    id: 2,
    name: 'Tesla',
  },
  {
    id: 3,
    name: 'Toyota',
  },
  {
    id: 4,
    name: 'Honda',
  },
];

const data = [
  {
    brand: 1,
    sales: 10,
    year: 2000,
  },
  {
    brand: 2,
    sales: 20,
    year: 2001,
  },
  {
    brand: 3,
    sales: 30,
    year: 2002,
  },
  {
    brand: 4,
    sales: 40,
    year: 2003,
  },
];

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('table');
  const hot = new Handsontable(container, {
    licenseKey: 'non-commercial-and-evaluation',
    data,
    rowHeaders: true,
    colHeaders: true,
    filtersKeyValue: true,
    dropdownMenu: [
      'filter_by_value',
      'filter_action_bar',
    ],
    columns: [
      {
        type: 'key-value',
        filter: false, // Same parameter as in `autocomplete`
        data: 'brand', // The field containing the key value in your data
        // List of source items
        source: brands,
        keyProperty: 'id', // The field containing the key value in your items
        valueProperty: 'name', // The field containing the display value in your items
      },
      {
        type: 'numeric',
        data: 'sales',
      },
      {
        type: 'numeric',
        data: 'year',
      },
    ],
  });
});
