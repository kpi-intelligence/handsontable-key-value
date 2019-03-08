import Handsontable from 'handsontable';
import MultipleSelectUI from 'handsontable/es/plugins/filters/ui/multipleSelect'; // UGLY
import deburr from 'lodash.deburr';

class KeyValueMultipleSelect extends MultipleSelectUI {

  update() {
    if (!this.isBuilt()) {
      return;
    }

    // Don't know why in the official version we compute again the checked values,
    // as it's already done by ValueComponent. So, just load the items.
    this.itemsBox.loadData(this.items);
  }

  /**
   * Filter input on displayValue instead of value.
   */
  onInput(event) {
    // Use lodash.deburr for a more permissive search
    const cleanString = s => deburr(s.toLowerCase());
    const value = cleanString(event.target.value);
    let filteredItems;

    if (value === '') {
      filteredItems = [...this.items];
    } else {
      filteredItems = Handsontable.helper.arrayFilter(this.items, item => cleanString(`${item.visualValue}`).indexOf(value) >= 0);
    }
    this.itemsBox.loadData(filteredItems);
  }
}

export default KeyValueMultipleSelect;
