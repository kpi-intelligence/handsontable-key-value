import Handsontable from 'handsontable';

import { getDisplayValue } from '../common';

const { getCaretPosition, getSelectionEndPosition, setCaretPosition } = Handsontable.dom;

class KeyValueEditor extends Handsontable.editors.AutocompleteEditor {

  prepare(row, col, prop, td, originalValue, cellProperties, ...args) {
    super.prepare(row, col, prop, td, originalValue, cellProperties, ...args);
    this.cellProperties.strict = true; // Force strict mode (key-value context)
  }

  getValue() {
    const selection = this.htEditor.getSelectedLast();
    if (selection) {
      return this.htEditor.getSourceDataAtRow(selection[0])[this.cellProperties.keyProperty];
    }
  }

  setValue(value) {
    if (this.state === 'STATE_EDITING') {
      const colIndex = this.instance.toPhysicalColumn(this.col);
      const columnSettings = this.instance.getSettings().columns[colIndex];

      getDisplayValue.call(
        this.cellProperties,
        columnSettings.source,
        columnSettings.keyProperty,
        columnSettings.valueProperty,
        value,
        (displayValue) => {
          super.setValue.apply(this, [displayValue || value]);
        },
      );
    }
  }

  queryChoices(query) {
    this.query = query;
    const { source } = this.cellProperties;

    if (typeof source === 'function') {
      source.call(this.cellProperties, query, (choices) => {
        this.rawChoices = choices;
        this.updateChoicesList(choices);
      });
    } else if (Array.isArray(source)) {
      this.rawChoices = source;
      this.updateChoicesList(source);
    } else {
      this.updateChoicesList([]);
    }
  }

  open(...args) {
    super.open(args);

    // Autocomplete actually creates a HOT-in-HOT instance, in which we load objects as data.
    // Update this HOT-in-HOT instance settings so that only the display value column is shown.
    const choicesListHot = this.htEditor.getInstance();
    choicesListHot.updateSettings({
      columns: [
        {
          data: this.cellProperties.valueProperty,
        },
      ],
    });
  }

  updateChoicesList(choicesList) {
    // Almost a copy-paste of the `updateChoicesList` of `AutocompleteEditor`.
    // We just changed some parts so that the relevance algorithm is applied on the display values.
    const pos = getCaretPosition(this.TEXTAREA);
    const endPos = getSelectionEndPosition(this.TEXTAREA);
    const sortByRelevanceSetting = this.cellProperties.sortByRelevance;
    const filterSetting = this.cellProperties.filter;
    const valuePropertySetting = this.cellProperties.valueProperty;
    let orderByRelevance = null;
    let highlightIndex = null;

    let choices = choicesList;

    if (sortByRelevanceSetting) {
      orderByRelevance = KeyValueEditor.sortByRelevance(
        this.stripValueIfNeeded(this.TEXTAREA.value),
        choicesList.map(choice => choice[valuePropertySetting]),
        this.cellProperties.filteringCaseSensitive,
      );
    }
    const orderByRelevanceLength = Array.isArray(orderByRelevance) ? orderByRelevance.length : 0;

    if (filterSetting === false) {
      if (orderByRelevanceLength) {
        // eslint-disable-next-line prefer-destructuring
        highlightIndex = orderByRelevance[0];
      }
    } else {
      const sorted = [];

      for (let i = 0, choicesCount = choices.length; i < choicesCount; i++) {
        if (sortByRelevanceSetting && orderByRelevanceLength <= i) {
          break;
        }
        if (orderByRelevanceLength) {
          sorted.push(choices[orderByRelevance[i]]);
        } else {
          sorted.push(choices[i]);
        }
      }

      highlightIndex = 0;
      choices = sorted;
    }

    this.strippedChoices = choices;
    this.htEditor.loadData(choices);

    this.updateDropdownHeight();

    this.flipDropdownIfNeeded();

    this.highlightBestMatchingChoice(highlightIndex);

    this.instance.listen(false);

    setCaretPosition(this.TEXTAREA, pos, (pos === endPos ? void 0 : endPos));
  }

}

Handsontable.editors.registerEditor('key-value', KeyValueEditor);

export default KeyValueEditor;
