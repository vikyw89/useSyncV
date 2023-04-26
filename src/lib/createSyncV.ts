import { update } from 'lodash-es';
import { emitChange, store } from './helper.js';

/**
 * A function that creates new data in the store synchronously using the specified selector and value.
 *
 * @param selector - The selector to use for creating new data in the store.
 * @param value - The value to be added to the store using the specified selector.
 */
export function createSyncV(selector: string, value: unknown) {
  const response = update(store, selector, (p) => {
    if (Array.isArray(p)) {
      return [...p, value];
    }
    return [value];
  });
  emitChange();
  return response;
}
