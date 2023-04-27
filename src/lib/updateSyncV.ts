import { set, update } from 'lodash-es';
import { emitChange, store } from './helper.js';

/**
 * A function that updates data in the store synchronously using the specified selector and updates.
 *
 * @param  selector - The selector to use for updating data in the store.
 * @param  updates - The updates to be applied to the data in the store using the specified selector.
 * If updates is a function, it will receive the previous value of the data and must return the new value.
 */
export function updateSyncV<T extends (arg: unknown) => T>(
  selector: string,
  updates?: T
): T {
  if (typeof updates === 'function') {
    const response = update(store, selector, (p) => updates(p));
    emitChange();
    return response;
  } else {
    const response = set(store, selector, updates) as T;
    emitChange();
    return response
  }
}
