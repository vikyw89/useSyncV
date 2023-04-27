import { unset } from 'lodash-es';
import { emitChange, store } from './helper.js';
/**
 * A function that deletes data from the store synchronously using the specified selector.
 *
 * @param  selector - The selector to use for deleting data from the store.
 *
 */
export function deleteSyncV(selector) {
  const response = unset(store, selector);
  emitChange();
  return response;
}
