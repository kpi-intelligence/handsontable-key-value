import Handsontable from 'handsontable';

import KeyValueComponent from './keyValueComponent';

class KeyValueFilters extends Handsontable.plugins.Filters {

  isEnabled() {
    /* eslint-disable no-unneeded-ternary */
    return this.hot.getSettings().filtersKeyValue ? true : false;
  }

  enablePlugin() {
    if (this.enabled) {
      return;
    }

    super.enablePlugin();

    const addConfirmationHooks = (component) => {
      component.addLocalHook('accept', () => this.onActionBarSubmit('accept'));
      component.addLocalHook('cancel', () => this.onActionBarSubmit('cancel'));
      component.addLocalHook('change', command => this.onComponentChange(component, command));

      return component;
    };

    this.components.set(
      'filter_by_value',
      addConfirmationHooks(new KeyValueComponent(this.hot, { id: 'filter_by_value', name: '' })),
    );
  }

  /**
   * Destroy method without trimRowsPlugin.disablePlugin().
   * Error due to the fact that we try to disable it while it's already destroyed.
   * Works in the original implementation probably by luck (filters getting destroyed before trimRows).
   */
  destroy() {
    if (this.enabled) {
      this.components.forEach((component) => {
        component.destroy();
      });

      this.conditionCollection.destroy();
      this.conditionUpdateObserver.destroy();
      this.hiddenRowsCache.clear();
    }

    // Base destroy
    if (this.eventManager) {
      this.eventManager.destroy();
    }
    this.clearHooks();

    Handsontable.helper.objectEach(this, (value, property) => {
      if (property !== 'hot' && property !== 't') {
        this[property] = null;
      }
    });
    delete this.t;
    delete this.hot;
  }

}

Handsontable.plugins.registerPlugin('filtersKeyValue', KeyValueFilters);

export default KeyValueFilters;
