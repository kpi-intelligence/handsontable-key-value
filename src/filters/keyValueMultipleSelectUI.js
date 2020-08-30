import Handsontable from 'handsontable';
import MultipleSelectUI from 'handsontable/es/plugins/filters/ui/multipleSelect'; // UGLY
import deburr from 'lodash.deburr';

class KeyValueMultipleSelect extends MultipleSelectUI {

  update() {
    if (!this.isBuilt()) {
      return;
    }

    // If the filter has been set programmatically, we need to retrive which item(s) should be checked
    const lastSelectedColumn = this.hot.getPlugin('filtersKeyValue').getSelectedColumn();
    if (this.items.length) {
      const { conditions } = this.hot.getPlugin('filtersKeyValue').conditionCollection;
      if (conditions.conjunction) {
        const toCheck = conditions.conjunction[lastSelectedColumn.visualIndex];
        if (toCheck) {
          toCheck.forEach((filter) => {
            if (filter.name === 'by_value') {
              this.items.forEach((item) => {
                item.checked = filter.args.flat().includes(item.value);
              });
            }
            /** @todo Handle other cases than 'by_value' ? */
          });
        }
      }
      /** @todo Is it needed for disjuntion case ? */
    }
    // else it's already done by ValueComponent. So, just load the items.
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
